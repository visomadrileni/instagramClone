 import React,{Component,Fragment} from 'react';
 import {deactivateAccount} from '../../../../utils/setting-utils';
 import Prompt from '../../../others/prompt';
 import TextInput from '../../../others/input/text';
 import {string,func} from 'prop-types';

 export default class DeactivateForm extends Component {
     state = { showPrompt: false }

     showPrompt = e => {
         e.preventDefault()
         this.setState({ showPrompt: true })
     }

     deactivate = async e => {
         e.preventDefault();
         let {password} = this.props;
         deactivateAccount(password,() => this.setState({showPrompt: false }))
     }

     render(){
         let {showPrompt} = this.state;
         let {password,change} = this.props;

         return (
             <Fragment>
                 <form className="dlt_acc_form" onSubmit={this.showPrompt}>
                     <TextInput 
                       type="password"
                       placeholder="Your password..."
                       required
                       value={password}
                       valueChange={change}
                     />
                     <input type="submit" value="Deactivate" disabled={!password} />
                 </form>

                 {showPrompt && (
                     <Prompt
                        title="Deactivate account"
                        content="Are you sure,you want permanently deactivate your account? There's no undo so you wont be able to login with this account."
                        actionText="Deactivate"
                        action={this.deactivate}
                        back={() => this.setState({ showPrompt: false })}
                        blurred
                     />
                 )}
             </Fragment>
         )
     }
 }

 DeactivateForm.propTypes = {
     password: string.isRequired,
     change: func.isRequired
 }