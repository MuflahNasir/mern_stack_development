import React, { useEffect } from "react"
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap"

import {
    CSSTransition,
    TransitionGroup
} from "react-transition-group"

import * as uuid from "uuid"
import "./ShoppingList.css"
import { connect } from "react-redux"
import { getItem, deleteItem, addItem } from "../../actions/itemAction"

const ShoppingList = (props) => {

    const {
        getItem
    } = props

    useEffect(() => {
        getItem()
    },[getItem])

    return(
        <Container> 
            <Button
            color="success"
            className="button-margin"
            onClick={() => {
                const name = prompt("Enter Item Name")
                if(name) {
                    const newItem = {
                        id: uuid.v4(),
                        name: name
                    }
                    props.addItem(newItem)
                }
            }}
            >Add Items</Button>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {props.Items.items.map((item) => (
                        <CSSTransition key={item.id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button
                                color="danger"
                                className="remove-btn"
                                size="sm"
                                onClick= {() => {
                                    props.deleteItem(item.id)
                                }}
                                >&times;</Button>
                                {item.name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    Items: state.item
})

export default connect(mapStateToProps, { getItem, deleteItem, addItem })(ShoppingList)