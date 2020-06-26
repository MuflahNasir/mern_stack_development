import React, { useState } from "react"
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';
import { connect } from "react-redux"
import { addItem } from "../../actions/itemAction"
import "./ShoppingList.css"

const ItemModel = (props) => {

    const [modal, setModal] = useState(false);
    const [name, setName] = useState("")

    const toggle = () => setModal(!modal);

    const onAddItem = () => {
        const newItem = {
            name: name
        }
        props.addItem(newItem)
        setModal(!modal);
    }

    const changeName = (e) => {
        setName(e.target.value)
    }

    return(
        <div>
            <Button color="warning" onClick={toggle} className="button-margin">
                <span role="img" aria-label="add">&#10009;</span>
                &nbsp;Add Item</Button>
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
                <Button color="primary" onClick={onAddItem}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default connect(null, {addItem})(ItemModel)