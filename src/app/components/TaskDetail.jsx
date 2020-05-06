/**
 * The task detail component route is a more sophisticated form that has many different fields.
 * The component automatically calls the REST API [via a mutation] to update the server on every change.
 */
import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { history } from '../store/history';

import { ConnectedUsernameDisplay } from './UsernameDisplay';
import {
  setTaskCompletion,
  addTaskComment,
  setTaskGroup,
  setTaskName,
  setTaskBirthdate,
  setTaskAddress,
  setTaskPhone,
  setTaskEmail,
  setTaskIncome,
  setTaskCity,
  setTaskOld,
  setTaskGender,
  deleteTask,
} from '../store/mutations';

const TaskDetail = ({
  id,
  comments,
  task,
  deposits,
  isOwner,
  isComplete,
  isOld,
  sessionID,
  groups,

  setTaskCompletion,
  addTaskComment,
  setTaskGroup,
  setTaskName,
  setTaskBirthdate,
  setTaskAddress,
  setTaskPhone,
  setTaskEmail,
  setTaskIncome,
  setTaskCity,
  setTaskGender,
  setTaskOld,
  deleteTask,
}) => {
  const cities = [
    { id: 1, name: 'Minsk' },
    { id: 2, name: 'Grodno' },
    { id: 3, name: 'Brest' },
    { id: 4, name: 'Borisov' },
    { id: 5, name: 'Molodechno' },
  ];
  const onSubmitClient = (e) => {
    e.preventDefault();
    history.push('/dashboard');
  };
  return (
    <div className='card p-3 col-6'>
      {isOwner ? (
        <div>
          <form onSubmit={(e) => onSubmitClient(e)}>
            <input
              type='text'
              value={task.name}
              onChange={setTaskName}
              placeholder='ФИО'
              className='form-control form-control-lg mb-2'
              required
            />
            <input
              type='text'
              value={task.birthdate}
              onChange={setTaskBirthdate}
              placeholder='Дата рождения'
              className='form-control form-control-lg mb-2'
              pattern='^\d{1,2}\.\d{1,2}\.\d{4}$'
              required
            />
            <input
              type='text'
              value={task.address}
              onChange={setTaskAddress}
              placeholder='Адрес'
              className='form-control form-control-lg mb-2'
              required
            />
            <input
              type='tel'
              value={task.phone}
              onChange={setTaskPhone}
              placeholder='Номер телефона'
              className='form-control form-control-lg mb-2'
              pattern='^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$'
              required
            />
            <input
              type='email'
              value={task.email}
              onChange={setTaskEmail}
              placeholder='Email'
              className='form-control form-control-lg mb-2'
              required
            />
            <input
              type='number'
              value={task.income}
              onChange={setTaskIncome}
              placeholder='Доход'
              className='form-control form-control-lg mb-2'
              required
            />
            <select
              onChange={setTaskCity}
              className='form-control mb-2'
              value={task.city}
            >
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <div className='d-flex justify-content-center align-items-center'>
              <p className='m-2'>Ваш пол:</p>
              <input
                type='radio'
                id='male'
                name='gender'
                value='male'
                className='ml-1'
                defaultChecked={task.gender === 'male' ? true : false}
                onChange={(e) =>
                  e.target.checked ? setTaskGender('male') : null
                }
              />
              <label htmlFor='male' className='m-2'>
                Муж
              </label>
              <input
                type='radio'
                id='female'
                name='gender'
                value='female'
                className='ml-1'
                defaultChecked={task.gender === 'female' ? true : false}
                onChange={(e) =>
                  e.target.checked ? setTaskGender('female') : null
                }
              />
              <label htmlFor='female' className='m-2'>
                Жен
              </label>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor='female' className='m-2'>
                У вас есть льготы ?:
              </label>
              <input
                type='checkbox'
                id='old'
                name='old'
                value='female'
                className='ml-1'
                defaultChecked={isOld}
                onChange={() => setTaskOld(id, !isOld)}
              />
            </div>
            <div className='d-flex justify-content-between'>
              <div>
                <button type='submit' className='btn btn-primary'>
                  Изменить
                </button>
              </div>
              <div>
                <button
                  className='btn btn-primary'
                  onClick={() => deleteTask(id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <h3>
          {task.name} {isComplete ? `✓` : null}
        </h3>
      )}
      {/* <form className='d-flex flex-column justify-content-center align-items-center'>
        <span className='mr-4'>Change Group</span>
        <select onChange={setTaskGroup} className='form-control'>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </form> */}
      <div className='mt-2'>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ConnectedUsernameDisplay id={comment.owner} /> : {comment.content}
          </div>
        ))}
      </div>

      <form
        className='d-flex justify-content-center align-items-center'
        onSubmit={(e) => addTaskComment(id, sessionID, e)}
      >
        <input
          type='text'
          name='commentContents'
          autoComplete='off'
          placeholder='Добавить комментарий'
          className='form-control'
        />
        <button type='submit' className='btn'>
          Добавить
        </button>
      </form>
      <div className='mt-2'>
        {deposits.map((deposit) => (
          <div key={deposit.id}>
            {deposit.name} : сумма {deposit.income} ({deposit.startdate} - {deposit.enddate})
          </div>
        ))}
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let deposits = state.deposits.filter((deposit) => deposit.city === task.name);
  let comments = state.comments.filter((comment) => comment.task === id);
  let isOwner = state.session.id === task.owner;
  let groups = state.groups;

  return {
    id,
    task,
    deposits,
    comments,
    isOwner,
    sessionID: state.session.id,
    isComplete: task.isComplete,
    isOld: task.isOld,
    groups,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  let id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(setTaskName(id, e.target.value));
    },
    setTaskBirthdate(e) {
      dispatch(setTaskBirthdate(id, e.target.value));
    },
    setTaskAddress(e) {
      dispatch(setTaskAddress(id, e.target.value));
    },
    setTaskPhone(e) {
      dispatch(setTaskPhone(id, e.target.value));
    },
    setTaskEmail(e) {
      dispatch(setTaskEmail(id, e.target.value));
    },
    setTaskIncome(e) {
      dispatch(setTaskIncome(id, parseInt(e.target.value)));
    },
    setTaskCity(e) {
      dispatch(setTaskCity(id, e.target.value));
    },
    setTaskGender(gender) {
      dispatch(setTaskGender(id, gender));
    },
    setTaskOld(id, isOld) {
      dispatch(setTaskOld(id, isOld));
    },
    addTaskComment(taskID, ownerID, e) {
      let input = e.target[`commentContents`];
      let commentID = uuid();
      let content = input.value;
      e.preventDefault();
      if (content !== ``) {
        input.value = ``;
        dispatch(addTaskComment(commentID, taskID, ownerID, content));
      }
    },
    deleteTask(id) {
      dispatch(deleteTask(id));
    },
  };
}

export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
