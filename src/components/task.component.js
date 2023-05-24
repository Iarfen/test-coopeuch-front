import React, { Component } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask, deleteTask } from "../actions/tasks";
import TasksService from "../services/tasks.service";

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        description: "",
        created_at: "",
        current: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTask(this.props.params.id);
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        description: description,
      },
    }));
  }

  getTask(id) {
    TasksService.get(id)
      .then((response) => {
        this.setState({
          currentTask: response.data,
        });
      })
      .catch((e) => {
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentTask.id,
      description: this.state.currentTask.description,
      created_at: this.state.currentTask.created_at,
      current: status
    };

    this.props
      .updateTask(this.state.currentTask.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentTask: {
            ...prevState.currentTask,
            current: status,
          },
        }));
        this.setState({ message: "¡El estado fue actualizado exitosamente!" });
      })
      .catch((e) => {
      });
  }

  updateContent() {
    this.props
      .updateTask(this.state.currentTask.id, this.state.currentTask)
      .then((response) => {
        this.setState({ message: "¡La tarea fue actualizada exitosamente!" });
      })
      .catch((e) => {
      });
  }

  removeTask() {
    this.props
      .deleteTask(this.state.currentTask.id)
      .then(() => {
        this.props.history.push("/tasks");
      })
      .catch((e) => {
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
          <div>
            {currentTask ? (
              <div className="edit-form">
                <h4>Tarea</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentTask.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <strong>Estado:</strong>
                    </label>
                    {currentTask.current ? "Activa" : "Inactiva"}
                  </div>
                </form>

                {currentTask.current ? (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updateStatus(false)}
                  >
                    Desactivar
                  </button>
                ) : (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updateStatus(true)}
                  >
                    Activar
                  </button>
                )}

                <button
                  className="badge badge-danger mr-2"
                  onClick={this.removeTask}
                >
                  Borrar
                </button>

                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateContent}
                >
                  Actualizar
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Por favor haz click en una tarea...</p>
              </div>
            )}
          </div>
        );
  }
}

export const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default connect(null, { updateTask, deleteTask })(withRouter(Task));
