 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {notify} from '../../../../utils/utilMethods/handy-notification';
 import {FadeIn} from 'animate-components';
 import {editComment} from '../../../../actions/post';
 import d from '../../../../utils/api/Dom';
 import PrimaryButton from '../../../others/button/primary-button';
 import TextArea from '../../../others/input/textArea';
 import AddEmojis from '../../../others/emojis/add-emojis'
 import Overlay from '../../../others/overlay';
 import ModalHeader from '../../../others/modal/modal-header';
 import ModalBack from '../../../others/modal/modal-back';
 import {number,string,func} from 'prop-types'

 class EditComment extends Component{
     state = {
         comment: '',
         ogComment: ''
        }

     componentDidMount = () => {
         let {comment} = this.props;
         this.setState({
             comment,
             ogComment: comment
         })
     }   

     decreptionChange = ({ target: {value}}) => {
         this.setState({ comment: value })
         this.props.updateComment(this.state.ogComment)
     }

     updateComment = async e => {
         e.preventDefault();
         new d('.e_p_update').addClass('a_disabled')
         let {comment} = this.state;
         let {comment_id,dispatch,back} = this.props;
         await post('/api/edit-comment',{comment_id,comment})
         dispatch(editComment({comment_id,comment}))
         notify({ value: 'Comment updated '})
         this.back()
     }

     back = () => {
         this.updateComment(this.state.ogComment);
         this.props.back();
     }

     render(){
         let {comment} = this.state;

         return (
             <div>
                 <Overlay />

                 <div clasName="edit_post modal">
                     <FadeIn duration="300ms">
                         <ModalHeader title="Edit comment" />

                         <div className="e_p_middle modal_middle">
                             <TextArea
                                placeholder="Comment ..."
                                className="e_c_textarea"
                                value={comment}
                                valueChange={this.decreptionChange}
                             />
                         </div>

                         <div className="e_p_bottom modal_bottom">
                             <AddEmojis
                                position={{
                                    top: -30,
                                    left: -217
                                    }}
                                textArea=".e_c_textarea"
                                updateTextArea={value => this.setState({ comment: value})} 
                                recenterEmojis   
                             />

                             <ModalBack
                                back={this.back}
                                btnType="secondary"
                                disabled={!comment}
                             />

                             <PrimaryButton
                                 label="Update"
                                 onClick={this.updateComment}
                                 disabled={!comment}
                                 extraClass="e_p_update"
                             />
                         </div>
                     </FadeIn>
                 </div>
             </div>
         )
     }
 }

 EditComment.propTypes = {
     comment: string.isRequired,
     comment_id: number.isRequired,
     back: func.isRequired,
     updateComment: func.isRequired
 }

 export default connect()(EditComment);