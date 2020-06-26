import React, { useState } from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return(
        <Navbar color="primary" light expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/" className="text-white"><span role="img" aria-label="emojie">&#10024;</span>&nbsp;MERN Shopping List</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NavLink className="text-white" href="https://github.com/MuflahNasir/mern_stack_development">
                    <i class="fa fa-github"></i>
                    &nbsp;GitHub</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Container>
      </Navbar>
    )
}

export default NavBar