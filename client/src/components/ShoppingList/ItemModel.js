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

const ItemModel = (props) => {

    const { isAuthenticated } = props

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
            {isAuthenticated ? 
                (<Button color="warning" onClick={toggle} className="button-margin">
                    <span role="img" aria-label="add">&#10009;</span>
                    &nbsp;Add Item
                </Button>): (
                    <h2 className="text-center mb-3">Please Login to Manage Items</h2>
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
                <Button color="primary" onClick={onAddItem}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addItem})(ItemModel)