 import React,{Component,Fragment} from 'react';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import EditComment from '../../edit-comment/edit-comment';
 import {number,string,func,shape} from 'prop-types';

 export default class EditCommentOption extends Component {
     state = { editComment: false }

     showEditModal = e => {
         e.preventDefault();
         this.setState({ editComment: !this.state.editComment})
     }

     modalBack = () => {
         this.setState({ editComment: false })
         this.props.toggleOptions()
     }

     render(){
         let {editComment} = this.state;
         let {updateCommentText,commentDetails: {comment_id,type,text}} = this.props;

         return (
             <Fragment>
                 {type === 'text' && (
                     <li>
                         <a href="#" onClick={this.showEditModal}>{`Edit comment ${isAdmin() ? 'as admin' : ''}`}</a>
                     </li>
                 )}

                 {editComment && (
                     <EditComment
                       comment={text}
                       back={this.modalBack}
                       updateComment={value => updateCommentText(value)}
                       comment_id={comment_id}
                     />
                 )}
             </Fragment>
         )
     }
 }

 EditCommentOption.propTypes = {
     commentDetails: shape({
         comment_id: number.isRequired,
         type: string.isRequired,
         text: string.isRequired
         }).isRequired,
     updateCommentText: func.isRequired,
     toggleOptions: func.isRequired    
 }