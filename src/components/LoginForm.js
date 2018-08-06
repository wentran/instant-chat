import React, {Component} from 'react';
import { VERIFY_USER} from '../Events';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            error: ""
        }

    }

    handleSubmit = () => {
        const {socket} = this.props;
        console.log("in submit socket---->",socket, "props in login",this.props)
        const {nickname} = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser)
    };

    setUser = ({user, isUser}) => {
        console.log("props in login",this.props)
        if (isUser) {
            this.setError("User name taken")
        } else {
            this.props.registerUser(user);
        }
    };

    setError = (error) => {
        this.setState({error})
    };

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({nickname: e.target.value }
        )
    };

    render() {
        let {nickname} = this.state;

        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}
                className="login-form">
                    <label htmlFor="nickname">
                        <h2>
                            Have a screen name?
                        </h2>
bu
                    </label>
                    <input
                    ref={(input) => {this.textInput = input }}
                    type="text"
                    id="nickname"
                    value={nickname}
                    onChange={this.handleChange}
                    placeholder="username"
                    ></input>
                    <div className="">

                    </div>
                </form>
                <button onClick={this.handleSubmit()}>
                </button>
                
            </div>
        );
    }
}
