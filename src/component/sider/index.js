import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from "reactstrap";


class Index extends Component {
    state = {
        openModal: false,
    }
    openCloseModal = () => {
        this.setState({
            openModal:!this.state.openModal
        })
    }
    submitUsers=(event)=>{
        event.preventDefault()
        let firstName = event.target[0].value
        let lastName = event.target[1].value
        let phone = event.target[2].value
        this.props.addUsers(firstName,lastName,phone)
        this.openCloseModal()
    }
    userClicked=(user)=>{
        this.props.userClicked(user)
    }
    render() {
        const {users, selectedUser}=this.props
        return (
            <div>
                <button className={'btn btn-dark btn-block mt-2 w-100'} onClick={this.openCloseModal}>Add user</button>
                <hr/>

                <ul className={'list-group'}>
                    {
                        users.map((item,index)=>
                             <li className={`list-group-item lis ${selectedUser.id===item.id ? `lises`: ' '}`} onClick={()=>this.userClicked(item)}>{item.firstName+'  '+item.lastName}</li>
                        )
                    }
                </ul>
                <Modal isOpen={this.state.openModal} toggle={this.openCloseModal}>
                    <div className="text-center p-2"><h2>Enter users' information</h2></div>
                    <hr/>
                    <ModalBody>
                        <form onSubmit={this.submitUsers} id={'Ass'}>
                            First Name<input type="text" className={'form-control'}/>
                            Last Name<input type="text" className={'form-control'}/>
                            Phone<input type="text" className={'form-control'}/>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className={'btn btn-success'}  form={'Ass'}>Save</Button>
                        <Button className={'btn btn-danger'} onClick={this.openCloseModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Index;