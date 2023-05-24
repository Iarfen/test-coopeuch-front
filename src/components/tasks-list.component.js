import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveTasks } from "../actions/tasks";
import { Link } from "react-router-dom";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);

    this.state = {
      currentTask: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.props.retrieveTasks();
  }

  refreshData() {
    this.setState({
      currentTask: null,
      currentIndex: -1,
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index,
    });
  }

  render() {
    const { currentTask, currentIndex } = this.state;
    const { tasks } = this.props;

    return (
          <div className="list row">
            <div className="col-md-6">
              <h4>Lista de tareas</h4>
              <ul className="list-group">
                {tasks &&
                  tasks.map((task, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveTask(task, index)}
                      key={index}
                    >
                      {task.description}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentTask ? (
                <div>
                  <h4>Tarea</h4>
                  <div>
                    <label>
                      <strong>Descripción:</strong>
                    </label>{" "}
                    {currentTask.description}
                  </div>
                  <div>
                    <label>
                      <strong>Estado:</strong>
                    </label>{" "}
                    {currentTask.current ? "Activa" : "Inactiva"}
                  </div>

                  <Link
                    to={"/tasks/" + currentTask.id}
                    className="badge badge-warning"
                  >
                    Editar
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Por favor haz click en una tarea...</p>
                </div>
              )}
            </div>
          </div>
        );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps, { retrieveTasks,  })(TasksList);
