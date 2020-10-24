 import React,{Component} from 'react';
 import {Me} from '../../../../utils/utils';
 import {timeAgo} from '../../../../utils/utilMethods/handyTimeAgo';
 import classNames from 'classnames';
 import MessageType from './message-type';
 import MessageTools from './tools/message-tools';
 import {number,string,oneOf} from 'prop-types';

 export default class Message extends Component {
     state = {
         message: '',
         showTools: false
       }
     
     toggleTools = () => this.setState({ showTools: !this.state.showTools})  
     componentDidMount = () => this.setState({ message: this.props.message })

   render(){
       let {message,showTools} = this.state;
       let {message_by,type,message_time,message_id} = this.props;
       let message_style = Me(message_by) ? 'my_mm_div' : 'not_my_mm_div'

       return (
            <div>
                <div className={classNames('m_m_divs',message_style)}>
                  <div className="toggle_mssg_tools" onClick={this.toggleTools}>
                      <MessageType messageDetails={{message,type,message_time}} />
                  </div>

                  <span className="m_m_time">
                      {timeAgo(message_time).replace('ago','') }
                  </span>

                  {showTools && (
                     <div className="m_m_tools">
                         <MessageTools
                           messageDetails={{ message_id,message,message_by,type}}
                           updateMessage={message => this.setState({ message})}
                         />
                     </div>
                   )}
              </div>
          </div>  
       )
    }  
 }

 Message.propTypes = {
     con_id: number.isRequired,
     message: string.isRequired,
     message_by: number.isRequired,
     message_to: number.isRequired,
     message_id: number.isRequired,
     message_time: string.isRequired,
     status: oneOf(['read','unread']),
     type: oneOf(['text','image','sticker']).isRequired,
 }