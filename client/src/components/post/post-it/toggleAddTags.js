 import React from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {changePostitProperties} from '../../../actions/post';
 import MaterialIcon from '../../others/icons/material-icon';

 const ToggleAddTags = ({addTag,dispatch}) => {
     let toggle = () => dispatch(changePostitProperties('addTag',!addTag))

     return (
         <span className={classNames('tag_add',{p_span_toggle: addTag})} data-tip="Tag people" onClick={toggle}>
             <MaterialIcon icon="layalty" />
         </span>
     )
 }

 const mapStateToProps = state => ({
     addTag: state.Post.postIt.addTag
 })

 export default connect(mapStateToProps)(ToggleAddTags)
 export {ToggleAddTags as PureToggleAddTags}