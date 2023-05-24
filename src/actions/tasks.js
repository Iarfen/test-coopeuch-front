import {
  CREATE_TASK,
  RETRIEVE_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
} from "./types";

import TasksService from "../services/tasks.service";

export const createTask = (description, created_at, current) => async (dispatch) => {
  try {
    const res = await TasksService.create({ description, created_at, current });

    dispatch({
      type: CREATE_TASK,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTasks = () => async (dispatch) => {
  try {
    const res = await TasksService.getAll();

    dispatch({
      type: RETRIEVE_TASKS,
      payload: res.data,
    });
  } catch (err) {
  }
};

export const updateTask = (id, data) => async (dispatch) => {
  try {
    const res = await TasksService.update(id, data);

    dispatch({
      type: UPDATE_TASK,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await TasksService.delete(id);

    dispatch({
      type: DELETE_TASK,
      payload: { id },
    });
  } catch (err) {
  }
};
