 import React,{Component} from 'react';
 import {FadeIn} from 'animate-components';
 import {Redirect} from 'react-router-dom';
 import Title from '../others/title';
 import TextInput from '../others/input/text';
 import FAIcon from '../others/icons/font-awesome-icon';
 import {viewPassword} from '../../utils/utils';
 import {isAdmin,adminSubmit} from '../../utils/admin-utils';

 class AdminLogin extends Component {
     state = {
         password: ''
     }

     changeValue = (what,e) => this.setState({[ what]: e.target.value});
     toggleViewPassword = () => {
         viewPassword({
             input: '#al_password',
             icon: '.s_p_l'
         })
     }

     submit = e => {
         e.preventDefault();
         let {password} = this.state;
         let {search} = this.props.location;
         adminSubmit({password,search});
     }
    
     render(){
         let {password} = this.state;
         return (
             <div>
                 {isAdmin() && <Redirect to="/is-admin" />}

                 <Title 
                    value="Are you the admin"
                    desc="Verif you are admin with the admin password"
                 />

                 <FadeIn duration="300ms">
                     <div className="cua are-you-admin">
                         <div className="display_text">
                             <span>Are you the admin ?</span>
                         </div>
                         <form className="form_login" onSubmit={this.onSubmit}>
                             <TextInput
                                 type="password"
                                 id="al_password"
                                 placeholder="Admin password"
                                 value={password}
                                 valueChange={e => this.changeValue('password',e)}
                                 required
                             />
                             <span className="show_password s_p_l" onClick={this.toggleViewPassword}>
                                 <FAIcon icon="lock" />
                             </span>
                             <input 
                               type="submit"
                               value="Continue as admin"
                               className="al_submit"
                             />
                         </form>
                     </div>
                 </FadeIn>
             </div>
         )
     }
 }

 export default AdminLogin;




































































































