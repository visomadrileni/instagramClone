 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../utils/utils';
 import End from '../end';
 import Nothing from '../nothing';
 import {number,bool,oneOf} from 'prop-types';
 
 const FollowSectionEnd = ({loading,len,when,user_details}) => {
    let {id,username} = user_details;

    return (
        <Fragment>
            {!loading && len === 0 ? (
                <Nothing message={Me(id) ? `You have no ${when}` : `${username} have no ${when}`} />
            ) : !loading && len !== 0 ? (
                <End />
            ) : null}
        </Fragment>
    )
 }

 FollowSectionEnd.propTypes = {
     loading: bool.isRequired,
     len: number.isRequired,
     when: oneOf(['followers','followings']).isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(FollowSectionEnd)