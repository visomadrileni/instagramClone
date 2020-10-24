 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {deleteConversation} from '../../../../../utils/message-utils';
 import Prompt from '../../../../others/prompt';
 import {func} from 'prop-types';

 class DeleteConversation extends Component{
     state = { deleteCon: false }

     showDeleteCon = e => {
         e.preventDefault()
         this.setState({ deleteCon: true})
     }

     deleteConv = async e => {
         e.preventDefault();
         let {con_with,dispatch,hideConversation,toggleOptions} = this.props;
         toggleOptions();
         deleteConversation({
                con_id: con_with,
                dispatch,
                hideConversation               
         })
     }

     modalBack = () => {
         this.setState({ deleteCon: false})
         this.props.toggleOptions()
     }

     render(){
         let { deleteCon } = this.state;

         return (
             <Fragment>
                 <li>
                     <a href="#" className="dlt_con" onClick={this.showDeleteCon}>
                         Delete Conversation
                     </a>
                 </li>

                 {deleteCon && (
                     <Prompt
                        title="Delete conversation"
                        content="This conversation will be deleted.There's no undo so you wont be able to find it"
                        action="Delete"
                        action={this.deleteConv}
                        back={this.modalBack}
                     />
                 )}
             </Fragment>
         )
     }
 }

 DeleteConversation.propTypes = {
    toggleOptions: func.isRequired,
    hideConversation: func.isRequired
 }

 const mapStateToProps = state => ({
     con_with: state.Message.conDetails.con_with
 })

 export default connect(mapStateToProps)(DeleteConversation)
 export {DeleteConversation as PureDeleteConversation} 