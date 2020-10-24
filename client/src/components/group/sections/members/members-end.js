 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import End from '../../../others/end';
 import Nothing from '../../../others/nothing';
 import {bool} from 'prop-types';

 const MembersEnd = ({loading,len,name}) => (
     <Fragment>
         {!loading && len == 0 ? (
            <Nothing message={`${name} group has no members`} />
         ) : !loading && len != 0 ? (
             <End />
         ) : null }
     </Fragment>
 )

 MembersEnd.propTypes = {
     loading: bool.isRequired
 }

 const mapStateToProps = state => ({
     len: state.Group.members,
     name: state.Group.group_details.name
 })

 export default connect(mapStateToProps)(MembersEnd);