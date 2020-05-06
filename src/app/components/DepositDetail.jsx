/**
 * The deposit detail component route is a more sophisticated form that has many different fields.
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
  setDepositCompletion,
  addDepositComment,
  setDepositGroup,
  setDepositName,
  setDepositStartDate,
  setDepositEndDate,
  setDepositAddress,
  setDepositPhone,
  setDepositEmail,
  setDepositIncome,
  setDepositCity,
  setDepositOld,
  setDepositGender,
  deleteDeposit,
} from '../store/mutations';

const DepositDetail = ({
  id,
  comments,
  tasks,
  deposit,
  isOwner,
  isComplete,
  isOld,
  sessionID,
  groups,

  setDepositCompletion,
  addDepositComment,
  setDepositGroup,
  setDepositName,
  setDepositStartDate,
  setDepositEndDate,
  setDepositAddress,
  setDepositPhone,
  setDepositEmail,
  setDepositIncome,
  setDepositCity,
  setDepositGender,
  setDepositOld,
  deleteDeposit,
}) => {
  const cities = [
    { id: 1, name: 'Minsk' },
    { id: 2, name: 'Grodno' },
    { id: 3, name: 'Brest' },
    { id: 4, name: 'Borisov' },
    { id: 5, name: 'Molodechno' },
  ];

  const depositTypes = [
    { id: 1, name: 'Электронный депозит', percent: 9 },
    { id: 2, name: '5 звезд', percent: 11 },
    { id: 3, name: 'Горячие деньги', percent: 14 },
  ];

  const calculateDepositIncome = () => {
    alert(depositTypes[0].percent);
  };
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
              value={deposit.name}
              onChange={setDepositName}
              placeholder='Номер договора'
              className='form-control form-control-lg mb-2'
              required
            />
            <input
              type='text'
              value={deposit.startdate}
              onChange={setDepositStartDate}
              placeholder='Дата начала'
              className='form-control form-control-lg mb-2'
              pattern='^\d{1,2}\.\d{1,2}\.\d{4}$'
              required
            />
            <input
              type='text'
              value={deposit.enddate}
              onChange={setDepositEndDate}
              placeholder='Дата окончания'
              className='form-control form-control-lg mb-2'
              pattern='^\d{1,2}\.\d{1,2}\.\d{4}$'
              required
            />
            <select
              onChange={setDepositCity}
              className='form-control mb-2'
              value={deposit.city}
            >
              {depositTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name} ({type.percent}%)
                </option>
              ))}
            </select>
            {/* <input
              type='text'
              value={deposit.address}
              onChange={setDepositAddress}
              placeholder='Депозит'
              className='form-control form-control-lg mb-2'
              required
            /> */}
            {/*             <input
              type='text'
              value={deposit.phone}
              onChange={setDepositPhone}
              placeholder='Phone'
              className='form-control form-control-lg mb-2'
              required
            />
            <input
              type='text'
              value={deposit.email}
              onChange={setDepositEmail}
              placeholder='Email'
              className='form-control form-control-lg mb-2'
              required
            /> */}
            <input
              type='number'
              value={deposit.income}
              onChange={setDepositIncome}
              placeholder='Сумма депозита'
              className='form-control form-control-lg mb-2'
              required
            />
            <select
              onChange={setDepositCity}
              className='form-control mb-2'
              value={deposit.city}
            >
              {tasks.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <div className='d-flex justify-content-center align-items-center'>
              <p className='m-2'>Валюта:</p>
              <input
                type='radio'
                id='male'
                name='gender'
                value='male'
                className='ml-1'
                defaultChecked={deposit.gender === 'male' ? true : false}
                onChange={(e) =>
                  e.target.checked ? setDepositGender('male') : null
                }
              />
              <label htmlFor='male' className='m-2'>
                USD
              </label>
              <input
                type='radio'
                id='female'
                name='gender'
                value='female'
                className='ml-1'
                defaultChecked={deposit.gender === 'female' ? true : false}
                onChange={(e) =>
                  e.target.checked ? setDepositGender('female') : null
                }
              />
              <label htmlFor='female' className='m-2'>
                BYN
              </label>
            </div>
            {/* <div className='d-flex justify-content-center align-items-center'>
              <label htmlFor='female' className='m-2'>
                Are you pensioner ?:
              </label>
              <input
                type='checkbox'
                id='old'
                name='old'
                value='female'
                className='ml-1'
                defaultChecked={isOld}
                onChange={() => setDepositOld(id, !isOld)}
              />
            </div> */}
            <div className='mt-3'>
              {isOwner ? (
                <div className='d-flex justify-content-center align-items-center'>
                  <div>
                    <button
                      type='button'
                      className='btn btn-primary ml-2'
                      onClick={() => setDepositCompletion(id, !isComplete)}
                    >
                      {isComplete ? `Закрыть` : `Открыть`}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <ConnectedUsernameDisplay id={deposit.owner} /> is the owner
                  of this deposit.
                </div>
              )}
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
                  onClick={() => deleteDeposit(id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <h3>
          {deposit.name} {isComplete ? `✓` : null}
        </h3>
      )}
      {/* <form className='d-flex flex-column justify-content-center align-items-center'>
        <span className='mr-4'>Change Group</span>
        <select onChange={setDepositGroup} className='form-control'>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </form>
      <div className='mt-2'>
        {comments.map((comment) => (
          <div key={comment.id}>
            <ConnectedUsernameDisplay id={comment.owner} /> : {comment.content}
          </div>
        ))}
      </div> */}

      {/* <form
        className='d-flex justify-content-center align-items-center'
        onSubmit={(e) => addDepositComment(id, sessionID, e)}
      >
        <input
          type='text'
          name='commentContents'
          autoComplete='off'
          placeholder='Добавить a comment'
          className='form-control'
        />
        <button type='submit' className='btn'>
          Submit
        </button>
      </form> */}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  let id = ownProps.match.params.id;
  let deposit = state.deposits.find((deposit) => deposit.id === id);
  let tasks = state.tasks;
  let comments = state.comments.filter((comment) => comment.deposit === id);
  let isOwner = state.session.id === deposit.owner;
  let groups = state.groups;

  return {
    id,
    deposit,
    tasks,
    comments,
    isOwner,
    sessionID: state.session.id,
    isComplete: deposit.isComplete,
    isOld: deposit.isOld,
    groups,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  let id = ownProps.match.params.id;
  return {
    setDepositCompletion(id, isComplete) {
      dispatch(setDepositCompletion(id, isComplete));
    },
    setDepositGroup(e) {
      dispatch(setDepositGroup(id, e.target.value));
    },
    setDepositName(e) {
      dispatch(setDepositName(id, e.target.value));
    },
    setDepositStartDate(e) {
      dispatch(setDepositStartDate(id, e.target.value));
    },
    setDepositEndDate(e) {
      dispatch(setDepositEndDate(id, e.target.value));
    },
    setDepositAddress(e) {
      dispatch(setDepositAddress(id, e.target.value));
    },
    setDepositPhone(e) {
      dispatch(setDepositPhone(id, e.target.value));
    },
    setDepositEmail(e) {
      dispatch(setDepositEmail(id, e.target.value));
    },
    setDepositIncome(e) {
      dispatch(setDepositIncome(id, parseInt(e.target.value)));
    },
    setDepositCity(e) {
      dispatch(setDepositCity(id, e.target.value));
    },
    setDepositGender(gender) {
      dispatch(setDepositGender(id, gender));
    },
    setDepositOld(id, isOld) {
      dispatch(setDepositOld(id, isOld));
    },
    /* addDepositComment(depositID, ownerID, e) {
      let input = e.target[`commentContents`];
      let commentID = uuid();
      let content = input.value;
      e.preventDefault();
      if (content !== ``) {
        input.value = ``;
        dispatch(addDepositComment(commentID, depositID, ownerID, content));
      }
    }, */
    deleteDeposit(id) {
      dispatch(deleteDeposit(id));
    },
  };
}

export const ConnectedDepositDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositDetail);
