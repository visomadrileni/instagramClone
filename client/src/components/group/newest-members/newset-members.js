 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import NewestMembersDiv from './newset-members-div';
 import {number} from 'prop-types';

 const NewsetMembers = ({group,length}) => (
 <Fragment>{length != 0 && <NewestMembersDiv group={group} /> }</Fragment>
 )

 NewsetMembers.propTypes = {
     group: number
 }

 const mapStateToProps = state => ({
     length: state.Group.newestMembers.length
 })

 export default connect(mapStateToProps)(NewsetMembers);