import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Backlog from './Backlog';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog, deleteProjectTask } from "../../actions/backlogActions";

class ProjectBoard extends Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onDeleteProjectTask(id, pt_id) {
        this.props.deleteProjectTask(id, pt_id);
    }

    render() {
        const { id } = this.props.match.params;
        const { project_tasks } = this.props.backlog;
        const { errors } = this.props;

        let BoardContent;

        const boardAlgorithm = (errors, project_tasks) => {
            if (project_tasks.length < 1) {
                if (errors.projectNotFound) {
                    return (
                        <div className="alert alert-danger text-center">
                            {errors.projectNotFound}
                        </div>
                    );
                } else {
                    return (
                        <div className="alert alert-danger text-center">
                            No Project Task on this board
                        </div>
                    );
                }
            } else {
                return <Backlog project_tasks={project_tasks} onDeletePT={this.onDeleteProjectTask.bind(this)}/>;
            }
        }

        BoardContent = boardAlgorithm(errors, project_tasks);

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {BoardContent}
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    deleteProjectTask: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(mapStateToProps, { getBacklog, deleteProjectTask })(ProjectBoard);
