 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Redirect} from 'react-router'
 import {Me} from '../../../../utils/utils'
 import {newConversation} from '../../../../utils/message-utils';
 import {func} from 'prop-types';

 class BannerMessageUser extends Component{
     state = { messagedUser: false }

     messageUser = e => {
         e.preventDefault()
         let {user_details:{id,username},toggleOptions} = this.props;
         newConversation({
             user: id,
             username,
             updateConversations: false,
             done: () => this.setState({ messageUser: true })
            })
         toggleOptions()
     }

     render(){
         let {messagedUser} = this.state;
         let {user_details:{id},isFollowing} = this.props;

        return (
            <Fragment>
                {messagedUser && <Redirect to="/" />}
                {isFollowing && !Me(id) && (
                    <li>
                        <a href="#" onClick={this.messageUser}>Message</a>
                    </li>
                )}
            </Fragment>
        )
     }
 }

 BannerMessageUser.propTypes = {
     toggleOptions: func.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     isFollowing: state.Follow.isFollowing
 })

 export default connect(mapStateToProps)(BannerMessageUser)