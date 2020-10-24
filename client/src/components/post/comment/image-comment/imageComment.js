 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {imageComment} from '../../../../utils/comment-utils';
 import MaterialIcon from '../../../others/icons/material-icon';
 import FileInput from '../../../others/input/file';
 import {number,string,func,shape} from 'prop-types';

 class ImageComment extends Component{
     state = {commentFile: '' }

     commentFileChanged = async e => {
         let {postDetails:{post_id,when,user},dispatch,incrementComments} = this.props;
         this.setState({ commentFile: e.target.value })
         await imageComment({
             post_id,
             dispatch,
             when,
             user,
             file: e.target.files[0],
             done: () => incrementComments()
         })
     }

     fileLabel = () => (
         <Fragment>
             <div data-tip="Attach a file">
                 <MaterialIcon icon="attach_file" />
             </div> 
         </Fragment>
     )

     render(){
         let {commentFile} = this.state;

         return (
             <div>
                 <form className="p_comment_form" encType="multipart/form-data">
                     <FileInput
                         value={commentFile}
                         fileChange={this.commentFileChanged}
                         label={this.fileLabel}
                     />
                 </form>
             </div>
         )
     }
 }
 
 ImageComment.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         user: number.isRequired,
         when: string.isRequired
        }).isRequired,
     incrementComments: func.isRequired   
 }

 export default connect()(ImageComment);
 export {ImageComment as PureImageComment}