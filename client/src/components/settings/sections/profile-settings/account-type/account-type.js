 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {notify} from '../../../../../utils/utilMethods/handy-notification';

 class ChangeAccountType extends Component {
     state = { type: 'public' }

     componentWillReceiveProps = ({account_type}) => this.setState({ type: account_type })

     changeType = async ({target:{value: type }}) => {
         this.setState({ type })
         await post('/api/change-account-type', {type})
         notify({ value: `Change account type to ${type}`})
     }

     render(){
         let {type} = this.state;

         return (
             <div className="acc_type">
                 <div className="set_header acc_type_header">
                     <span className="acc_type_h">Change account type</span>
                     <span>Select your account type,currently it's {' '}
                         <span className="type_indicator">{type}</span>
                     </span>
                 </div>

                 <div className="acc_type_main">
                     <select value={type} className="acc_select" onChange={this.ChangeType}>
                         <option value="public">Public</option>
                         <option value="private">Private</option>
                     </select>

                     <span className="bold">Note:</span>
                     <span>When account is{' '}
                        <span className="bold">private only your followers can interact with your profile</span>{' '}
                         Others would have to follow you first to interact.This is the {' '}
                        <span className="bold">recommended</span> option as only people you know would interact with your profile
                     </span>

                     <span>And when account is public{' '}
                        <span className="bold">anyone can see your profile and interact with your profile</span>
                     </span>
                 </div>
             </div>
         )
     }
 }

 const mapStateToProps = state => ({
     account_type: state.User.user_details.account_type
 })

 export default connect(mapStateToProps)(ChangeAccountType)
 export {ChangeAccountType as PureChangeAccountType}