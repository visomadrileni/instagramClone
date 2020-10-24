 import React from 'react';
 import {connect} from 'react-redux';
 import {changePostitProperties,resetPostIt}  from '../../../actions/post';
 import {addPost} from '../../../utils/post-utils';
 import PrimaryButton from '../../others/button/primary-button';
 import SecondaryButton from '../../others/button/secondary-button';
 import {func} from 'prop-types';

 const PostItActions = props => {
     let {back,group_name,postIt:{fileChanged,showOverlay,...rest},dispatch} = props;

     let toggleOverlay = () => dispatch(changePostitProperties('showOverlay',!showOverlay))

     let BackAndReset = async e => {
         return e ? e.preventDefault() : null
         await dispatch(resetPostIt())
         back();
     }

     let postIt = async e => {
         e.preventDefault()
         toggleOverlay()

         await addPost({
               dispatch,
               ...rest,
               group_name
            })

         toggleOverlay()
         BackAndReset()   
     }

     return (
         <div className="t_p_act p_act">
             <SecondaryButton label="Cancel" onClick={BackAndReset} />
             <PrimaryButton label="Post" onClick={postIt} disabled={!fileChanged} extraClass="p_post" />
         </div>
     )
 }

 PostItActions.propTypes = {
     back: func.isRequired
 }

 const mapStateToProps = state => ({
     group_name: state.Group.group_details.name,
     postIt: state.Post.postIt
 })

 export default connect(mapStateToProps)(PostItActions);
 export {PostItActions as PurePostItActions}