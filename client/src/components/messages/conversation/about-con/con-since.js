 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {timeAgo} from '../../../../utils/utilMethods/handyTimeAgo';

 class ConversationSince extends Component{
    render(){
        const {con_time} = this.props;
        return(
            <div className="sli_time">
                <span className="sli_label">Conversation since</span>
                <span className="sli_bold">{`${timeAgo(con_time)}`}</span>
           </div>
        )
    }
 }

 const mapStateToProps = state => ({
     con_time: state.Message.conAbout.con_time
 })

 export default connect(mapStateToProps)(ConversationSince)
