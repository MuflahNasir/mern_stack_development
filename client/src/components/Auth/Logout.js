import React, { Fragment } from "react"
import { NavLink } from "reactstrap"
import { logout } from "../../actions/authActions"
import { connect } from "react-redux"

const Logout = (props) => {

    const onLogout = () => {
        props.logout()
    }

    return(
        <Fragment>
            <NavLink href="#" onClick={onLogout} className="text-white">
                <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout
            </NavLink>
        </Fragment>
    )
}

export default connect(null, { logout })(Logout)