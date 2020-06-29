import React, { useState, useEffect, useCallback } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from "react-redux"
import { login } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"

const LoginModel = (props) => {

    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [color, setColor] = useState("")
    const [msg, setMsg] = useState(null)

    const toggle = useCallback(() => {
        //Clear all errors and fields
        props.clearErrors()
        setEmail("")
        setPassword("")
        setModal(!modal)
    }, [modal, props])

    const onLogin = () => {
        const user = {
            email,
            password
        }
        props.login(user)
        setMsg("User Login successfully")
        setColor("primary")
    }

    useEffect(() => {
        const { error, isAuthenticated } = props
        if (error === props.error) {
            if (error.id === 'LOGIN_FAIL') {
                setMsg(error.msg.msg)
                setColor("danger")
            } else {
                setMsg(null)
            }
        }
        if (modal) {
            if (isAuthenticated) {
                toggle()
            }
        }
    }, [props, modal, toggle])

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div>
            <NavLink className="text-white" href="#" onClick={toggle}>
                <i class="fa fa-sign-in" aria-hidden="true"></i>
                &nbsp;Login</NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} className="text-center">Login Yourself&nbsp;<span role="img" aria-label="add">&#128071;</span></ModalHeader>
                <ModalBody>
                    {msg ? <Alert color={color}>{msg}</Alert> : null}
                    <Form>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email:</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="email" value={email} onChange={changeEmail} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password:</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="password" value={password} onChange={changePassword} />
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onLogin}>Login</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModel)