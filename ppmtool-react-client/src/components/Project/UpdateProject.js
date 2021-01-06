import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import { getProjectByIdentifier, createProject } from "../../actions/projectActions";

class UpdateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getProjectByIdentifier(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {

        if (Object.keys(nextProps.errors).length > 0) {
            this.setState({ errors: nextProps.errors });
            return;
        }

        const { id, projectName, projectIdentifier, description, start_date, end_date } = nextProps.project;

        this.setState({
            id: id,
            projectName: projectName,
            projectIdentifier: projectIdentifier,
            description: description,
            start_date: start_date ? start_date : "",
            end_date: end_date ? end_date : ""
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let updateProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }

        this.props.createProject(updateProject, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", { "is-invalid": errors.projectName })} placeholder="Project Name" name="projectName" value={this.state.projectName} onChange={this.onChange} />
                                    {errors.projectName && (<div className="invalid-feedback">{errors.projectName}</div>)}
                                </div>
                                <div className="form-group">
                                    <input type="text" className={classnames("form-control form-control-lg", { "is-invalid": errors.projectIdentifier })} placeholder="Unique Project ID" name="projectIdentifier" value={this.state.projectIdentifier} onChange={this.onChange} disabled/>
                                    {errors.projectIdentifier && (<div className="invalid-feedback">{errors.projectIdentifier}</div>)}
                                </div>
                                <div className="form-group">
                                    <textarea className={classnames("form-control form-control-lg", { "is-invalid": errors.description })} placeholder="Project Description" name="description" value={this.state.description} onChange={this.onChange} />
                                    {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="start_date" value={this.state.start_date} onChange={this.onChange} />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="end_date" value={this.state.end_date} onChange={this.onChange} />
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProject.propTypes = {
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectByIdentifier: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
});

export default connect(mapStateToProps, { getProjectByIdentifier, createProject })(withRouter(UpdateProject));
