import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { getProjectTask, updateProjectTask } from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateProjectTask extends Component {

    constructor(props) {
        super(props);

        const { id, pt_id } = this.props.match.params;

        this.state = {
            id: "",
            summary: "",
            projectSequence: pt_id,
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            createAt: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // const { id, pt_id } = this.props.match.params;
        this.props.getProjectTask(this.state.projectIdentifier, this.state.projectSequence);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        const {
            id,
            summary,
            projectSequence,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            createAt,
        } = nextProps.project_task;

        this.setState({
            id,
            summary,
            projectSequence,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            createAt,
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let updateProjectTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
        }

        const { pt_id } = this.props.match.params;

        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updateProjectTask, this.props.history);
    }

    render() {
        const { id } = this.props.match.params;
        const { errors } = this.props;
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${id}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" value={this.state.summary} onChange={this.onChange} className={classnames("form-control form-control-lg", { "is-invalid": errors.summary })} name="summary" placeholder="Project Task summary" />
                                    {errors.summary && (<div className="invalid-feedback">{errors.summary}</div>)}
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" value={this.state.acceptanceCriteria} onChange={this.onChange} placeholder="Acceptance Criteria" name="acceptanceCriteria"></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" value={this.state.dueDate} onChange={this.onChange} name="dueDate" />
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="priority" value={this.state.priority} onChange={this.onChange}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.onChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
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

UpdateProjectTask.propTypes = {
    updateProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object
}

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(UpdateProjectTask);
