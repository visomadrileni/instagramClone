import React,{Component} from 'react';
import {post} from 'axios';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';
import ShopIcon from '@material-ui/icons/Shop';
import './signup.scss';

class SignUp extends Component{
    state = {
        username:'',
        firstname:'',
        surname:'',
        email:'',
        password:''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    onSubmit = () => {
        const {username,firstname,surname,email,password} = this.state;
        post('/signup',{username,firstname,surname,email,password})
        window.location.assign('/login')
    }

    render(){
         const {username,firstname,surname,email,password} = this.state;

    return (
           <div className="signup-page">
              <div className="header">
                <h1 className="logo"><img src="https://i.imgur.com/zqpwkLQ.png" alt="instagram"/></h1>
                <p>Sign up to see photos and videos from your friends.</p>
                <button><FacebookIcon color="inherit" fontSize="small" style={{marginBottom:'-3px'}}></FacebookIcon>Log in with Facebook</button>
                <p>OR</p>
              </div>


            <div className="container">
              <form method="post" onSubmit={this.onSubmit}>
                  <input type="text" name="username" placeholder="username" value={username} onChange={this.onChange} />
                  <input type="text" name="firstname" placeholder="firstname" value={firstname} onChange={this.onChange} />
                  <input type="text" name="surname" placeholder="surname" value={surname} onChange={this.onChange} />
                  <input type="email" name="email" placeholder="email" value={email} onChange={this.onChange} />
                  <input type="password" name="password" placeholder="password" value={password} onChange={this.onChange} />
                  <input type="submit" value="Sign up" className=""/>
              </form>
              
              <ul>
                <li>By signing up, you agree to our </li>
                <li><a href="">Terms</a></li>
                <li><a href=""> Data Policy</a></li>
                <li> and</li>
                <li><a href=""> Cookies Policy</a> .</li>
             </ul>
            </div>

        <div className="option">
           <p>Have an account? <a href="/login">Log in</a></p>
        </div>
        <div className="otherapps">
          <p>Get the app.</p>
          <button type="button"><AppleIcon color="inherit" fontSize="small" />App Store</button>
          <button type="button"><ShopIcon color="inherit" fontSize="small"/>Google Play</button>
        </div>
            <div className="footer">
            <ul>
                <li><a href="">About</a></li>
                <li><a href="">Help</a></li>
                <li><a href="">Press</a></li>
                <li><a href="">Api</a></li>
                <li><a href="">Jobs</a></li>
                <li><a href="">Privacy</a></li>
                <li><a href="">Terms</a></li>
                <li><a href="">Locations</a></li>
                <li><a href="">Top Accounts</a></li>
                <li><a href="">Hashtags</a></li>
                <li><a href="">Language</a></li>
            </ul>
            <p>© 2020 INSTAGRAM</p>
            </div>
        </div>
    )
 }
}

export default SignUp;