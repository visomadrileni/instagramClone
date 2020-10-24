 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {deleteMessage} from '../../../../../utils/message-utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import Prompt from '../../../../others/prompt';
 import MaterialIcon from '../../../../others/icons/material-icon';
 import {number,string,shape} from 'prop-types';

 class DeleteMessageTool extends Component{
    state = { deleteMessage: false }

    toggleDelete = () => this.setState({ deleteMessage: !this.state.deleteMessage })

    delete = async e => {
        e.preventDefault();
        let {messageDetails: {message_id,message,type},dispatch} = this.props;
        deleteMessage({
            message_id,
            message,
            type,
            dispatch,
            done: () => this.toggleDelete
        }) 
    }

    render(){
        let {deleteMessage} = this.state;

        return (
            <Fragment>
                <span className="toggle_dlt_mssg" onClick={this.toggleDelete} data-tip={`Delete ${isAdmin() ? 'as admin' : ''}`} >
                     <MaterialIcon icon="delete" />
                </span>

                {deleteMessage && (
                    <Prompt
                      title="Delete message"
                      content="This message will be deleted.There's no undo so you won't be able to find it"
                      actionText="Delete"
                      action={this.delete}
                      back={this.toggleDelete}
                    />
                )}
            </Fragment>
        )
    }
 }


 DeleteMessageTool.propTypes = {
     messageDetails: shape({
         message_id: number.isRequired,
         message: string.isRequired,
         type: string.isRequired
        }).isRequired
 }

 export default connect()(DeleteMessageTool)
 export {DeleteMessageTool as PureDeleteMessageTool}