import React, {Component} from 'react';
import Sider from './component/sider'
import Content from './component/content'
 import './app.css'
class Main extends Component {
    state={
        users:[],
        selectedUser:'',
        messages:[],
        history:[]
    }
    addUsers=(firstName,lastName,phone)=>{
        let {users}=this.state
        users.push({id:users.length+1, firstName, lastName,phone})
        this.setState({
            users
        })
        localStorage.setItem('users', JSON.stringify(users))
    }
    userClicked=(user)=>{
        this.setState({
            selectedUser:user
        })
        localStorage.setItem('selectedUser',JSON.stringify(user))
        this.messageHistory(user)
    }
    messageHistory=(user)=>{
        let b = localStorage.getItem('messages')
        if(b){
            let messages=JSON.parse(b)
            let history=messages.filter(item=>item.from===1 && item.to===user.id || item.from===user.id && item.to===1)
            this.setState({
                history
            })
        }

    }
    sendMessage=(from,to,text)=>{
        let {messages}=this.state
        const date=new Date()
        messages.push({from,to,text,date:date.getHours()+':'+date.getMinutes()})
        this.setState({
            messages
        })
        localStorage.setItem('messages',JSON.stringify(messages))
        this.messageHistory(this.state.users.filter(item=>item.id===to)[0])
    }
    sendMessage2=(from,to,text)=>{
        let {messages}=this.state
        const date=new Date()
        messages.push({from,to,text,date:date.getHours()+':'+date.getMinutes()})
        this.setState({
            messages
        })
        localStorage.setItem('messages',JSON.stringify(messages))
        this.messageHistory(this.state.users.filter(item=>item.id===from)[0])
    }
    componentDidMount() {
        let usersString=localStorage.getItem('users')
        if(usersString){
            let UsersArray=JSON.parse(usersString)
            this.setState({
                users:UsersArray
            })
        }
        let selectedUser=localStorage.getItem('selectedUser')
        if(selectedUser){
            let selectArray=JSON.parse(selectedUser)
            this.setState({
                selectedUser:selectArray
            })
            this.messageHistory(selectArray)
        }
        let messages=localStorage.getItem('messages')
        if(messages){
            let messagesArray=JSON.parse(messages)
            this.setState({
                messages:messagesArray
            })

        }
    }
    render() {
        const {users,selectedUser,history}=this.state
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 sider-parent">
                            <Sider addUsers={this.addUsers} users={users} userClicked={this.userClicked} selectedUser={selectedUser}/>
                        </div>
                        <div className="col-9 content-parent">
                            <Content selectedUser={selectedUser} sendMessage={this.sendMessage} sendMessage2={this.sendMessage2} history={history}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;