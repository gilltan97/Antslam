import React from 'react';
import {
  Nav, Navbar, NavItem, NavLink, NavbarBrand,
} from 'reactstrap';

const style = {
  navbar: {
    backgroundColor: '#f8f8f8',
    border: '1px solid #e7e7e7',
    fontSize: '.875rem',
    fontFamily: '"Avenir Next","Lucida Grande"',
    padding: '0',
  },

  nav: {
    colour: '#515151',
    marginRight: '7.5px',
    marginBottom: '0',
  },

  colors: {
    strong: {
      color: '#7f7f7f',
    },

    normal: {
      color: 'black',
    },
  },
};


function Header() {
  return (
    <div className="mb-3">
      <Navbar style={style.navbar} expand="md">
        <div className="container">
          <NavbarBrand className="mr-auto" href="/">
            <div style={style.colors.normal}>
              <strong style={style.colors.strong}>ANT</strong>
              <strong>SLAM</strong>
            </div>
          </NavbarBrand>
          <Nav style={style.nav}>
            <NavItem>
              <NavLink href="/patients">Patients</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/clinicians">Clinicians</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/form-responses">Responses</NavLink>
            </NavItem>
            <NavItem className="mr-3">
              <NavLink style={style.logout} href="/"><div style={style.colors.strong}>Logout</div></NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
