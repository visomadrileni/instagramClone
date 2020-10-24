import React,{Component} from 'react';
import {connect} from 'react-redux';
import {post} from 'axios';
import './login.scss';

class Login extends Component{
    state = {
        username:'',
        password:''
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = e => {
        e.preventDefault();
        const {username,password} = this.state;
        post('/login',{username,password})
    }

    render(){
        const {username,password} = this.state;

      return (
             <div id="wrapper">
                 <div className="main-content">
                    <div className="header"><img src="https://i.imgur.com/zqpwkLQ.png" /></div>
                    <form method="post" action="/user/login" onSubmit={this.onSubmit} className="l-part">
                        <input type="text" name="username" value={username} onChange={this.onChange} placeholder="Username" className="input-1" />
                        <div className="overlap-text">
                            <input type="password" name="password" value={password} onChange={this.onChange} placeholder="Password" className="input-2" />
                            <a href="#">Forgot?</a>
                        </div>
                        <input type="submit" value="Log in" className="btn" />
                    </form>
                </div>

                <div className="sub-content">
                    <div className="s-part">Don't have an account? <a href="/signup">Sign up</a></div>
                </div>
            </div>
        )
    }
}

export default connect()(Login);