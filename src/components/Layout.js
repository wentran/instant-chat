import React, {Component} from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events.js';
import LoginForm from './LoginForm.js';

const socketUrl = "http://192.168.1.115:3231/"
class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: null
        };
    }

    componentWillMount() {
        this.initSocket()
    };

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', ()=> {
            console.log("connected on client")
        });
        this.setState({socket})
    };

    registerUser = (user)=> {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    };

    logout = () => {
        const { socket } = this.state;
        socket.emit (LOGOUT)
        this.setState({
            user: null
        })
    }

    render() {
        const { title } = this.props;
        const {socket}  = this.state;
        return (
            <div className="container">
                {title}
                <LoginForm socket={socket}
                           registerUser={this.registerUser}
                           />
            </div>
        );
    }
}

export default Layout;
