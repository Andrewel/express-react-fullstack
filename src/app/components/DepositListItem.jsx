import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

export const DepositListItem = ({ id, name, commentCount, isComplete }) => (
  <Link to={`/deposit/${id}`}>
    <div className='card p-2 mt-2'>
      <span>
        {name} {isComplete ? `✓` : null}
      </span>
    </div>
  </Link>
);

export const ConnectedDepositListItem = connect((state, ownProps) => {
  return {
    ...state.deposits.find((deposit) => deposit.id === ownProps.id),
    commentCount: state.comments.filter(
      (comment) => comment.deposit === ownProps.id
    ).length,
  };
})(DepositListItem);
