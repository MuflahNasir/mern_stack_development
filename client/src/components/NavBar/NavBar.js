import React, { useState } from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return(
        <Navbar color="dark" light expand="md">
        <NavbarBrand href="/" className="text-white">MERN Shopping List</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="text-white" href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-white" href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
}

export default NavBar