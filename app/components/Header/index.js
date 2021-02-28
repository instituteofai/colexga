/**
 *
 * Header
 *
 */

import React from 'react';
// import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import Img from './Img';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavBar from './NavBar';
import Logo from './logo.png';
import Button from '../Button';

function Header({ user }) {
  return (
    <NavBar>
      <div>
        <Img src={Logo} alt="Colexga logo" />
      </div>
      <div>
        <HeaderLink to="/">Home</HeaderLink>
      </div>
      <div>
        <HeaderLink to="/practice">Practice</HeaderLink>
      </div>
      <div>
        <HeaderLink to="/about">About</HeaderLink>
      </div>
      {!user && (
        <div>
          <Button onClick={() => window.open('/api/auth/google', '_self')}>
            Login with Google
          </Button>
        </div>
      )}
      {user && (
        <div>
          <Button onClick={() => window.open('/api/auth/logout', '_self')}>
            Logout
          </Button>
        </div>
      )}
      {user &&
        (user.email === 'chandankumar99341@gmail.com' ||
          user.email === 'mashru.ravi@gmail.com') && (
        <div>
          <HeaderLink to="/admin">Admin Dashboard</HeaderLink>
        </div>
      )}
    </NavBar>
  );
}

Header.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default Header;
