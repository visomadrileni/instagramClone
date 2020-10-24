 import React,{Component} from 'react';
 import {notify} from '../../../utils/utilMethods/handy-notification';
 import {insta_notify} from '../../../utils/utils';
 import d from '../../../utils/api/Dom';
 import AppLink from '../../others/link/link';
 import PrimaryButton from '../../others/button/primary-button';
 import {number,string,func} from 'prop-types';

 export default class InviteList extends Component{
     invite = async e => {
        e.preventDefault();
        new d('.invite_btn').blur();
        let {follow_to,username,group,back} = this.props
        insta_notify({
            to: follow_to,
            type: 'invite',
            group_id: group
          })
        
        notify({ value: `Invited ${username}`})  
        back();
     }

     render(){
         let {follow_to,username,firstname,surname} = this.props;

         return (
             <div className="modal_items">
                 <div className="modal_it_img">
                     <img src={`/users/${follow_to}/avatar.jpg`} />
                 </div>

                 <div className="modal_it_content">
                     <div className="modal_it_info">
                         <AppLink
                            url={`/profile/${username}`}
                            className="modal_it_username"
                            label={username}
                         />
                         <span className="modal_it_light">{`${firstname} ${surname}`}</span>
                     </div>

                     <div className="modal_ff">
                         <PrimaryButton
                             label="Invite"
                             onClick={this.invite}
                             extraClass="invite_btn"
                         />
                     </div>
                 </div>
                 <hr />
             </div>
         )
     }
 }

 InviteList.propTypes= {
   follow_id: number.isRequired,
   follow_to: number.isRequired,
   username: string.isRequired,
   firstname: string.isRequired,
   surname: string.isRequired,
   group: number
 }
























