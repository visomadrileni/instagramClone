 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {NavLink} from 'react-router-dom';
 import {Me} from '../../../../utils/utils';

 const BannerMapTags = ({user_details,tags}) => {
    let {id,username} = user_details;
    let map_tags = tags.map(t => (
        <NavLink to="/" key={t.tag}>{t.tag}</NavLink>
    ))


    return (
        <Fragment>
           {tags.length != 0 ? map_tags : `${Me(id) ? 'You' : username} have no tags`}
        </Fragment>
    )
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     tags: state.User.tags
 })

 export default connect(mapStateToProps)(BannerMapTags)