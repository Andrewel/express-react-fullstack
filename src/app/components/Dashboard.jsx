/**
 * The dashboard is a simple React component that contains several lists of tasks,
 * one for each group that belongs to the user.
 */

import { connect } from 'react-redux';
import React from 'react';
import { ConnectedTaskList } from './TaskList';
import { ConnectedDepositList } from './DepositList';

const Dashboard = ({ groups }) => (
  <div className='row'>
    {groups.map((group) =>
      group.name !== 'Депозиты' ? (
        <ConnectedTaskList key={group.id} {...group} className='col' />
      ) : null
    )}
    {groups.map((group) =>
      group.name === 'Депозиты' ? (
        <ConnectedDepositList key={group.id} {...group} className='col' />
      ) : null
    )}
  </div>
);

const mapStateToProps = ({ groups }) => ({ groups });

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
