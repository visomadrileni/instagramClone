 import React,{Component,Fragment} from 'react';
 import {Redirect} from 'react-router';
 import {newConversation} from '../../utils/message-utils';
 import SecondaryButton from '../others/button/secondary-button';
 import {number,string,shape} from 'prop-types';

 export default class NewConTeaser extends Component {
     state = { messaged: false }

     message = e => {
        e.preventDefault()
        let {id,username} = this.props.userDetails;
        newConversation({
            user: id,
            username,
            updateConversations: false,
            done: () => this.setState({ messaged: true })
        })
     }

     render(){
         let {messaged} = this.state;
         let {username} = this.props.userDetails;

         return (
             <Fragment>
                 <div className="recomm_teaser">
                   <span>Wanna message {username}? Create a private conversation with {' '} {username}</span>
                   <SecondaryButton label="Message" onClick={this.message} />
                 </div>

                 {messaged && <Redirect to="/messages" />}
             </Fragment>
         )
     }
 }

 NewConTeaser.propTypes ={
     userDetails: shape({
         id: number.isRequired,
         username: string.isRequired
         }).isRequired
 }