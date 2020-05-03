/**
 * The navigation component is present on all non-login pages,
 * and contains a link back to the dashboard, and the user's name.
 */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

import { ConnectedUsernameDisplay } from './UsernameDisplay';
import * as mutations from '../store/mutations';

const imgURL = 'https://www.automechta.by/theme/images/priorbank.png';

const onExitButton = () => {
  window.location.reload();
};

const Navigation = ({ id, authenticated }) => (
  <div className='header d-flex justify-content-between'>
    <Link to='/dashboard'>
      <img style={{ width: '300px' }} src={imgURL} />
    </Link>
    {authenticated ? (
      <div className='d-flex m-3'>
        <h4>
          Welcome, <ConnectedUsernameDisplay id={id} />.
        </h4>
        <button onClick={onExitButton} className='ml-2'>Выйти</button>
      </div>
    ) : null}
  </div>
);

const mapStateToProps = ({ session }) => ({
  id: session.id,
  authenticated: session.authenticated == mutations.AUTHENTICATED,
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);
