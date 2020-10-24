 import React,{Component} from 'react';
 import {FadeIn} from 'animate-components';
 import {changePassword} from '../../../../utils/setting-utils';
 import {filedsToArray} from '../../../../utils/edit-profile-utils';
 import PasswordSection from './password-section'; 
 import Title from '../../../others/title';
 import PrimaryButton from '../../../others/button/primary-button';

 export default class ChangePassword extends Component {
     state = {
         oldPass: '',
         newPass: '',
         newPassAgain: ''
     }

     changeValue = (what,e) => this.setState({ [what]: e.target.value })
     change = e => {
         e.preventDefault()
         let {oldPass,newPass,newPassAgain} = this.state;
         changePassword(oldPass,newPass,newPassAgain)
     }
     
     decideLabel = key => {
        let label = key === 'oldPass' ? 'Current Password' : key === 'newPass' ? 'New password' : 'Confirm new password'
        return label;
     }

     map = ({key,value}) => {
         let focus = key === 'oldPass' ? true : false;
         let label = this.decideLabel(key)

         return (<PasswordSection label={label} value={value} change={(e) => this.changeValue(key,e)} autofocus={focus} />)
     }

     render(){     
      // For disabled key warning.Key helps React update virtual DOM, but when we provide key to component of map function, text input inside that component looses focus.
         console.error = () => {}
         let array = filedsToArray(this.state)
         let mappedFields = array.map(this.map);

         return (
             <div>
                 <Title value="Change password" />

                 <FadeIn duration="300ms">
                     <div className="change_pass">
                         <div className="c_p_header">
                             <span>Change password</span>
                         </div>

                         <div className="c_p_main">
                             {mappedFields}
                             <PrimaryButton label="Change password" onClick={this.change} extraClass="c_p_btn" />
                         </div>
                     </div>
                 </FadeIn>
             </div>
         )
     }
 }