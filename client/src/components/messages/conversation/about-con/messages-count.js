 import React from 'react';
 import {connect} from 'react-redux';
 import {humanReadable} from '../../../../utils/utils';

 const MessagesCount = ({ messagesCount}) => (
    <div className="sli_mssg_count">
        <span className="sli_label">No. of messages</span>
        <span className="sli_bold">{humanReadable(messagesCount,'message')}</span>
    </div>
 )

 const mapStateToProps = state => ({
     messagesCount: state.Message.conAbout.messagesCount
 })

 export default connect(mapStateToProps)(MessagesCount);