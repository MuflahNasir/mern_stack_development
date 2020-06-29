import React, { useState, Fragment } from "react"
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
import RegisterModel from "../Auth/RegisterModel"
import LoginModel from "../Auth/LoginModel"
import Logout from "../Auth/Logout"
import { connect } from "react-redux"

const NavBar = (props) => {
    const { isAuthenticated, user } = props
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
                    {!isAuthenticated ? (
                            <Fragment className="authentication">
                            <NavItem className="register-btn">
                                <RegisterModel />
                            </NavItem>
                            <NavItem>
                                <LoginModel />
                            </NavItem>
                        </Fragment>
                    ): (
                        <Fragment>
                            <NavItem>
                                <NavLink className="nav-text ml-3 text-white">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    &nbsp;<strong>{user ? `${user.name}`: ""}</strong>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <Logout />
                            </NavItem>
                        </Fragment>
                    )}
                </Nav>
                </Collapse>
            </Container>
      </Navbar>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(NavBar)