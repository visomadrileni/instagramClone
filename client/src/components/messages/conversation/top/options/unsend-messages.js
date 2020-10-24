 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {deleteYourMessages} from '../../../../../utils/message-utils';
 import Prompt from '../../../../others/prompt';
 import {func} from 'prop-types';

 class UnsendMessages extends Component {
     state = {unsend: false }

     showPrompt = e => {
        e.preventDefault();
        this.setState({ unsend: true })
     }

     unsendAllMessages = e => {
         e.preventDefault()
         let {con_with,toggleOptions,dispatch} = this.props;
         toggleOptions()
         deleteYourMessages({
                con_id: con_with,
                dispatch
            })
         this.setState({ unsend: false })   
     }

     modalBack = () => {
         this.setState({ unsend: false })
         this.props.toggleOptions()
     }

     render(){
         let {unsend} = this.state;
         let {messages} = this.props;

         return (
             <Fragment>
                 {messages.length !== 0 && (
                     <li>
                         <a href="#" className="dlt_mssgs" onClick={this.showPrompt}>Unsend all messages</a>
                     </li>
                 )}

                 {unsend && (
                     <Prompt
                        title="Unsend all your messages"
                        content="All your messages will be deleted.There's no undo so you won't be able to finnd it"
                        action="Delete"
                        action={this.unsendAllMessages}
                        back={this.modalBack}
                     />
                 )}
             </Fragment>
         )
     }
 }

 UnsendMessages.propTypes = {
     toggleOptions: func.isRequired
 }

 const mapStateToProps = state => ({
     con_with: state.Message.conDetails.con_with,
     messages: state.Messages.messages
 })

 export default connect(mapStateToProps)(UnsendMessages);
 export {UnsendMessages as PureUnsendMessages}