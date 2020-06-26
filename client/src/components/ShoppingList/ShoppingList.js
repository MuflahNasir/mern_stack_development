import React, { useEffect, useState } from "react"
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Spinner,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from "reactstrap"

import {
    CSSTransition,
    TransitionGroup
} from "react-transition-group"

import "./ShoppingList.css"
import { connect } from "react-redux"
import { getItem, deleteItem, addItem, updateItem } from "../../actions/itemAction"
import ItemModel from "./ItemModel"

const ShoppingList = (props) => {

    const {
        getItem,
        Items
    } = props

    const [modal, setModal] = useState(false);
    const [name, setName] = useState("")
    const [id, setId] = useState()

    const toggle = () => setModal(!modal);

    const changeName = (e) => {
        setName(e.target.value)
    }

    useEffect(() => {
        getItem()
    },[getItem])

    const onDeleteItem = (id) => {
        props.deleteItem(id)
    }

    const onEditItem = data => {
        setName(data.name)
        setId(data._id)
        toggle()
    }

    const onUpdate = () => {
        props.updateItem(id, name)
        toggle()
    }

    return(
        <Container>
            <ItemModel/>
            {Items.loading ? (
                <Spinner color="primary" type="grow"/>
            ): (
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {props.Items.items.map((item) => (
                            <CSSTransition key={item._id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                    color="danger"
                                    className="remove-btn"
                                    size="sm"
                                    onClick= {() => onDeleteItem(item._id)}
                                    ><span role="img" aria-label="delete">&#10008;</span></Button>
                                    {item.name}
                                    <Button
                                    color="info"
                                    className="edit-button"
                                    size="sm"
                                    onClick= {() => onEditItem(item)}
                                    ><span role="img" aria-label="edit">&#9998;</span></Button>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            )}

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add new item to your shopping list</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={name} onChange={changeName}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={onUpdate}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    Items: state.item
})

export default connect(mapStateToProps, { getItem, deleteItem, addItem, updateItem })(ShoppingList)