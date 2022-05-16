import React, {Component} from 'react';

class Index extends Component {
    state = {
        inputValue: '',
        inputValue2: ''
    }
    changeSendMessages = ({target: {value}}) => {
        this.setState({
            inputValue: value
        })
    }
    changeSendMessages2 = ({target: {value}}) => {
        this.setState({
            inputValue2: value
        })
    }
    sendMessage = () => {
        let from = 1
        let to = this.props.selectedUser.id
        let text = this.state.inputValue
        this.props.sendMessage(from,to,text)
        this.setState({
            inputValue:''
        })
    }
    sendMessage2 = () => {
        let from = this.props.selectedUser.id
        let to = 1
        let text = this.state.inputValue2
        this.props.sendMessage2(from,to,text)
        this.setState({
            inputValue2:''
        })
    }
    render() {
        const {selectedUser,history} = this.props
        const {inputValue,inputValue2} = this.state
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        {
                            selectedUser ?
                                <div className={'content'}>
                                    <div className="row">
                                        <div className="col-12">
                                            <h2>{selectedUser.firstName + ' ' + selectedUser.lastName + ' ' + selectedUser.phone}</h2>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <input type="text" className={'form-control'} value={inputValue}
                                                       onChange={this.changeSendMessages}/>
                                                <button className={`btn btn-success ${this.state.inputValue===''?`disabled`:``} `}
                                                        onClick={this.sendMessage}>send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={'bg-dark'}/>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="messagePoint">
                                                {
                                                    history.map((item,index)=><div className={'row '}>
                                                        <div className={`col-7`} style={{marginLeft:`${item.from===1?`290px`:``}`}} key={index}>

                                                                <div className={`messages ${item.from===1?`bg-success`:``}`}><p>{item.text}<span>{item.date}</span></p></div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <div> </div>
                        }
                    </div>
                    {
                        selectedUser.id===1?'':
                            <div className="col-6">
                                {
                                    selectedUser ?
                                        <div className={'content'}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2>Person who is typing with {selectedUser.firstName+' '+selectedUser.lastName}</h2>
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="col-12">
                                                    <div className="input-group">
                                                        <input type="text" className={'form-control'} value={inputValue2}
                                                               onChange={this.changeSendMessages2}/>
                                                        <button className={`btn btn-success ${this.state.inputValue2===''?`disabled`:``}`}
                                                                onClick={this.sendMessage2}>send
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className={'bg-dark'}/>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="messagePoint">
                                                        {
                                                            history.map((item,index)=><div className={'row '}>
                                                                    <div className={`col-7`} style={{marginLeft:`${item.from===selectedUser.id?`290px`:``}`}} key={index}>

                                                                        <div className={`messages ${item.from===selectedUser.id?`bg-success`:``}`}><p>{item.text}<span>{item.date}</span></p></div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <div> </div>
                                }
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default Index;