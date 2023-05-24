import React, { Component } from "react";
import { connect } from "react-redux";
import { createTask } from "../actions/tasks";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCurrent = this.onChangeCurrent.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      description: "",
      created_at: "",
      current: false,
      submitted: false
    };
  }

  onChangeDescription(e) {
    this.setState((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  }

  onChangeCurrent(e) {
      this.setState((prevState) => ({
        ...prevState,
        current: e.target.value,
      }));
    }

  saveTask() {
    const { description, created_at, current } = this.state;

    this.props
      .createTask(description, created_at, current)
      .then((data) => {
        this.setState({
          id: data.id,
          description: data.description,
          created_at: data.created_at,
          current: data.current,
          submitted: true
        });
      })
      .catch((e) => {
      });
  }

  newTask() {
    this.setState({
      id: null,
      description: "",
      created_at: "",
      current: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>¡Tarea creada exitosamente!</h4>
                  <button className="btn btn-success" onClick={this.newTask}>
                    Crear otra
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      required
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="current">Estado</label>
                    <input
                      type="checkbox"
                      className="form-control"
                      id="current"
                      required
                      value="true"
                      onChange={this.onChangeCurrent}
                      name="current"
                    />
                    <span>Activa</span>
                  </div>

                  <button onClick={this.saveTask} className="btn btn-success">
                    Crear tarea
                  </button>
                </div>
              )}
            </div>
    );
  }
}

export default connect(null, { createTask })(AddTask);
