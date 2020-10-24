 import React,{Component,Fragment} from 'react';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import EditMessage from '../edit';
 import MaterialIcon from '../../../../others/icons/material-icon';
 import {number,string,func,shape} from 'prop-types';
 
 export default class EditMessageTool extends Component {
     state = { editMessage: false }

     toggleEdit = () => this.setState({ editMessage: !this.state.editMessage})

     render(){
         let {editMessage} = this.state;
         let {messageDetails: {message_id,type,message},updateMessage} = this.props;

         return (
             <Fragment>
                 {type === 'text' && (
                     <span className="toggle_edit_mssg" onClick={this.toggleEdit} data-tip={`Edit ${isAdmin() ? 'as admin' : ''}`}>
                         <MaterialIcon icon="mode_edit" />
                     </span>
                 )}

                 {editMessage && (
                     <EditMessage
                        back={this.toggleEdit}
                        message={message}
                        message_id={message_id}
                        changeMessage={message => updateMessage(message)}
                     />
                 )}
             </Fragment>
         )
     }
 }

 EditMessageTool.propTypes = {
    messageDetails: shape({
         message_id: number.isRequired,
         type: string.isRequired,
         message: string.isRequired
        }).isRequired,
    updateMessage: func.isRequired   
 }