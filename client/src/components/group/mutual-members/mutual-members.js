 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import MutualMembersDiv from './mutual-members-div';
 import {number} from 'prop-types';

 const MutualMembers = ({group,length}) => (
      <Fragment>{length != 0 && <MutualMembersDiv group={group} />}</Fragment>
 )

 MutualMembers.propTypes = {
    group: number
 }

 const mapStateToProps = state => ({
     length: state.Group.mutualMembers.length
 })

 export default connect(mapStateToProps)(MutualMembers);