import { connect } from 'react-redux';
import React from 'react';
import { requestDepositCreation } from '../store/mutations';
import { ConnectedDepositListItem } from './DepositListItem';

export const DepositList = ({ deposits, name, createNewDeposit, id }) => (
  <div className='card p-2 m-2'>
    <h2>{name}</h2>
    <div>
      {deposits.map((deposit) => (
        <ConnectedDepositListItem {...deposit} key={deposit.id} />
      ))}
    </div>
    <div>
      <button
        className='btn btn-primary btn-block mt-2'
        onClick={() => createNewDeposit(id)}
      >
        Добавить Новый Депозит
      </button>
    </div>
  </div>
);

const mapStateToProps = (state, { name, id }) => {
  return {
    name: name,
    deposits: state.deposits.filter((deposit) => deposit.group === id),
    id,
  };
};

const mapDispatchToProps = (dispatch, { id }) => ({
  createNewDeposit() {
    dispatch(requestDepositCreation(id));
  },
});

export const ConnectedDepositList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositList);
