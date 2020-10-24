 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {deleteComment} from '../../../../../actions/post';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import {notify} from '../../../../../utils/utilMethods/handy-notification';
 import Prompt from '../../../../others/prompt';
 import {number,string,func,shape} from 'prop-types';

 class DeleteCommentOption extends Component{
     state = { deleteComment: false }

     showPrompt = e => {
         e.preventDefault();
         this.setState({ deleteComment: true })
     }

     delComment = async e => {
        e.preventDefault()
        let {commentDetails:{comment_id,type,commentSrc},dispatch,decrementComments} = this.props;
        await post('/api/delete-comment',{comment_id,type,commentSrc});
        dispatch(deleteComment(comment_id))
        decrementComments()
        notify({ value: 'Comment deleted'})
     }

     modalBack = () => {
         this.props.toggleOptions()
         this.setState({ deleteComment: false })
     }


     render(){
         let {deleteComment} = this.state;

         return (
             <Fragment>
                 <li>
                    <a href="#" onClick={this.showPrompt}>{`Delete comment ${isAdmin() ? 'as admin' : ''}`}</a>
                 </li>

                 {deleteComment && (
                     <Prompt
                         title="delete comment"
                         content="This comment will be deleted.There's no undo so you wont be able to find it"
                         actionText="Delete"
                         action={this.delComment}
                         back={this.modalBack}
                     />
                 )}
             </Fragment>
         )
     }
 }

 DeleteCommentOption.propTypes = {
     commentDetails: shape({
         comment_id: number.isRequired,
         commentSrc: string.isRequired,
         type: string.isRequired
         }).isRequired,
      decrementComments: func.isRequired,
      toggleOptions: func.isRequired   
 }

 export default connect()(DeleteCommentOption)
 export {DeleteCommentOption as PureDeleteCommentOption}