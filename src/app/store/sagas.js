import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';

import { history } from './history';
import * as mutations from './mutations';
const url =
  process.env.NODE_ENV === 'production' ? `` : `http://localhost:7777`;

/* TASK */
export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = yield select((state) => state.session.id);
    const taskID = uuid();
    let mutation = mutations.createTask(taskID, groupID, ownerID);
    const { res } = yield axios.post(url + `/task/new`, {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: 'Новый Клиент',
        birthdate: '11.11.2011',
        address: 'ул. Пушкина, д. 28',
        phone: '+375293383878',
        email: 'bank@gmail.com',
        income: 0,
        city: 'Minsk',
        isOld: false,
        gender: 'male',
      },
    });
    yield put(mutation);
  }
}

export function* taskDeletionSaga() {
  while (true) {
    const { taskID } = yield take(mutations.DELETE_TASK);
    console.log(taskID);
    axios.post(url + `/task/delete`, { taskID });
    history.push('/dashboard');
  }
}

export function* commentCreationSaga() {
  while (true) {
    const comment = yield take(mutations.ADD_TASK_COMMENT);
    axios.post(url + `/comment/new`, { comment });
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_BIRTHDATE,
      mutations.SET_TASK_ADDRESS,
      mutations.SET_TASK_PHONE,
      mutations.SET_TASK_EMAIL,
      mutations.SET_TASK_INCOME,
      mutations.SET_TASK_CITY,
      mutations.SET_TASK_OLD,
      mutations.SET_TASK_COMPLETE,
      mutations.SET_TASK_GENDER,
    ]);
    axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        birthdate: task.birthdate,
        address: task.address,
        phone: task.phone,
        email: task.email,
        income: task.income,
        city: task.city,
        isOld: task.isOld,
        isComplete: task.isComplete,
        gender: task.gender,
      },
    });
  }
}

/* DEPOSITS */
export function* depositCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_DEPOSIT_CREATION);
    const ownerID = yield select((state) => state.session.id);
    const depositID = uuid();
    let mutation = mutations.createDeposit(depositID, groupID, ownerID);
    const { res } = yield axios.post(url + `/deposit/new`, {
      deposit: {
        id: depositID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: 'Новый Депозит',
        startdate: '11.11.2011',
        enddate: '11.11.2012',
        address: 'ул. Пушкина, д. 28',
        phone: '+375293383878',
        email: 'bank@gmail.com',
        income: 0,
        city: '',
        isOld: false,
        gender: 'male',
      },
    });
    yield put(mutation);
  }
}

export function* depositDeletionSaga() {
  while (true) {
    const { depositID } = yield take(mutations.DELETE_DEPOSIT);
    console.log(depositID);
    axios.post(url + `/deposit/delete`, { depositID });
    history.push('/dashboard');
  }
}

/* export function* commentCreationSaga() {
  while (true) {
    const comment = yield take(mutations.ADD_DEPOSIT_COMMENT);
    axios.post(url + `/comment/new`, { comment });
  }
} */

export function* depositModificationSaga() {
  while (true) {
    const deposit = yield take([
      mutations.SET_DEPOSIT_GROUP,
      mutations.SET_DEPOSIT_NAME,
      mutations.SET_DEPOSIT_STARTDATE,
      mutations.SET_DEPOSIT_ADDRESS,
      mutations.SET_DEPOSIT_PHONE,
      mutations.SET_DEPOSIT_EMAIL,
      mutations.SET_DEPOSIT_INCOME,
      mutations.SET_DEPOSIT_CITY,
      mutations.SET_DEPOSIT_OLD,
      mutations.SET_DEPOSIT_COMPLETE,
      mutations.SET_DEPOSIT_GENDER,
    ]);
    axios.post(url + `/deposit/update`, {
      deposit: {
        id: deposit.depositID,
        group: deposit.groupID,
        name: deposit.name,
        startdate: deposit.startdate,
        address: deposit.address,
        phone: deposit.phone,
        email: deposit.email,
        income: deposit.income,
        city: deposit.city,
        isOld: deposit.isOld,
        isComplete: deposit.isComplete,
        gender: deposit.gender,
      },
    });
  }
}

/* AUTH USER */
export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password,
      });
      yield put(mutations.setState(data.state));
      yield put(
        mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
          id: 'U1', // todo... get ID from response
          token: data.token,
        })
      );
      history.push(`/dashboard`);
    } catch (e) {
      /* catch block handles failed login */
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

export function* userAccountCreationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_USER_ACCOUNT_CREATION
    );
    try {
      const { data } = yield axios.post(url + `/user/create`, {
        username,
        password,
      });
      console.log(data);

      yield put(
        mutations.setState({ ...data.state, session: { id: data.userID } })
      );
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

      history.push('/dashboard');
    } catch (e) {
      console.error('Error', e);
      yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
    }
  }
}
