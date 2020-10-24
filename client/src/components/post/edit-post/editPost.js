 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {editPost} from '../../../utils/post-utils';
 import d from '../../../utils/api/Dom';
 import ModalHeader from '../../others/modal/modal-header';
 import ModalBack from '../../others/modal/modal-back';
 import PrimaryButton from '../../others/button/primary-button';
 import AddEmojis from '../../others/emojis/add-emojis';
 import TextArea from '../../others/input/textArea';
 import Overlay from '../../others/overlay';
 import {number,string,func} from 'prop-types';

 class EditPost extends Component {
     state = {
         description: '',
         ogDescription: ''
     }

     componentDidMount = () => {
         let {description} = this.state;
         this.setState({
             description,
             ogDescription: description
         })
     }

     back = () => {
         let {back} = this.props;
         this.returnOgDescription();
         back()
     }

     returnOgDescription = () => {
         let {ogDescription} = this.state;
         this.props.changeDesc(ogDescription)
     }

     descChange = ({target:{value}}) => {
         this.setState({ description: value })
         this.props.changeDesc(value)
     }

     updatePost = async e => {
         e.preventDefault()
         let {description} = this.state;
         let {dispatch,post,back} = this.props;
         new d('.e_p_update').addClass('a_disabled')
         editPost({
             post_id: post,
             description,
             dispatch,
             done: () => back(),
             failed: this.returnOgDescription()
         })
     }

     render(){
         let {description} = this.state;

         return (
             <div>
                 <Overlay />

                 <div className="edit_post modal">
                     <FadeIn duration="300ms">
                         <ModalHeader title="Edit post" />

                         <div className="e_p_middle modal_middle">
                             <TextArea
                                placeholder="Description ..."
                                className="e_p_textarea"
                                value={description}
                                valueChange={this.descChange}
                             />
                         </div>

                         <div className="e_p_bottom modal_bottom" style={{marginTop: 0}}>
                             <AddEmojis
                                 position={{top:-32,left: -217}}
                                 textArea=".e_p_textarea"
                                 updateTextArea={value => this.setState({description: value})}
                                 recenterEmojis
                             />

                             <ModalBack back={this.back} btnType="secondary" />
                             <PrimaryButton
                                label="Update post"
                                onClick={this.updatePost}
                                extraClass="e_p_update"
                             />
                         </div>
                     </FadeIn>
                 </div>
             </div>
         )
     }
 }

 EditPost.propTypes = {
     post: number.isRequired,
     description: string.isRequired,
     back: func.isRequired,
     changeDesc: func.isRequired
 }

 export default connect()(EditPost);
 export {EditPost as PureEditPost}