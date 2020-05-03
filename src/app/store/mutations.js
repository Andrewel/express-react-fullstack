export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const SET_TASK_BIRTHDATE = `SET_TASK_BIRTHDATE`;
export const SET_TASK_ADDRESS = `SET_TASK_ADDRESS`;
export const SET_TASK_PHONE = `SET_TASK_PHONE`;
export const SET_TASK_EMAIL = `SET_TASK_EMAIL`;
export const SET_TASK_INCOME = `SET_TASK_INCOME`;
export const SET_TASK_CITY = `SET_TASK_CITY`;
export const SET_TASK_OLD = `SET_TASK_OLD`;
export const SET_TASK_GENDER = `SET_TASK_GENDER`;
export const ADD_TASK_COMMENT = `ADD_TASK_COMMENT`;
export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const DELETE_TASK = `DELETE_TASK`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;

export const setTaskCompletion = (id, isComplete = true) => ({
  type: SET_TASK_COMPLETE,
  taskID: id,
  isComplete,
});

export const addTaskComment = (commentID, taskID, ownerID, content) => ({
  type: ADD_TASK_COMMENT,
  id: commentID,
  task: taskID,
  owner: ownerID,
  content,
});

export const requestTaskCreation = (groupID) => ({
  type: REQUEST_TASK_CREATION,
  groupID,
});

export const createTask = (taskID, groupID, ownerID) => ({
  type: CREATE_TASK,
  taskID,
  groupID,
  ownerID,
});

export const deleteTask = (taskID) => ({
  type: DELETE_TASK,
  taskID,
});

export const setTaskGroup = (taskID, groupID) => ({
  type: SET_TASK_GROUP,
  taskID,
  groupID,
});

export const setTaskName = (taskID, name) => ({
  type: SET_TASK_NAME,
  taskID,
  name,
});

export const setTaskBirthdate = (taskID, birthdate) => ({
  type: SET_TASK_BIRTHDATE,
  taskID,
  birthdate,
});

export const setTaskAddress = (taskID, address) => ({
  type: SET_TASK_ADDRESS,
  taskID,
  address,
});

export const setTaskPhone = (taskID, phone) => ({
  type: SET_TASK_PHONE,
  taskID,
  phone,
});

export const setTaskEmail = (taskID, email) => ({
  type: SET_TASK_EMAIL,
  taskID,
  email,
});

export const setTaskIncome = (taskID, income) => ({
  type: SET_TASK_INCOME,
  taskID,
  income,
});

export const setTaskCity = (taskID, city) => ({
  type: SET_TASK_CITY,
  taskID,
  city,
});

export const setTaskOld = (taskID, isOld = false) => ({
  type: SET_TASK_OLD,
  taskID,
  isOld,
});

export const setTaskGender = (taskID, gender) => ({
  type: SET_TASK_GENDER,
  taskID,
  gender,
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password,
});

export const processAuthenticateUser = (
  status = AUTHENTICATING,
  session = null
) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status,
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state,
});

export const requestCreateUserAccount = (username, password) => ({
  type: REQUEST_USER_ACCOUNT_CREATION,
  username,
  password,
});
