 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {NavLink} from 'react-router-dom';
 import {Me} from '../../../../utils/utils';

 const BannerAddTagsLink = ({tags_len,id}) => (
     <Fragment>
         {tags_len === 0 && Me(id) && (
             <NavLink to="/edit-profile" className="add_tags">Add</NavLink>
         )}
     </Fragment>
 )

 const maspStateToProps = state => ({
     id: state.User.user_details.id,
     tags_len: state.User.tags.length
 })

 export default connect(maspStateToProps)(BannerAddTagsLink)
 export {BannerAddTagsLink as PureBannerAddTagsLink}