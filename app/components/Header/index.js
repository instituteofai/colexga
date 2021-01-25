/**
 *
 * Header
 *
 */

import React from 'react';
// import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import Img from './Img';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import NavBar from './NavBar';
import Logo from './logo.png';

function Header() {
  return (
    <NavBar>
      <div>
        <Img src={Logo} alt="Colexga logo" />
      </div>
      <div>
        <HeaderLink to="/">Home</HeaderLink>
        {/* <Link to="/">
          <Button type="link">Home</Button>
        </Link> */}
      </div>
      <div>
        <HeaderLink to="/practice">Practice</HeaderLink>
      </div>
      <div>
        <HeaderLink to="/register">Register</HeaderLink>
      </div>
      <div>
        <HeaderLink to="/about">About</HeaderLink>
      </div>
    </NavBar>
  );
}

Header.propTypes = {};

export default Header;
