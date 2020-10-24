 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {FadeIn} from 'animate-components';
 import {getConversationMessages,readConversation,getConDetails} from '../../../actions/message';
 import {cLoading} from '../../../utils/utils';
 import {messageScroll} from '../../../utils/message-utils';
 import d from '../../../utils/api/Dom';
 import IsLoading from '../../others/isLoading';
 import MapMessages from './message/map-messages';
 import TextMessage from './bottom/text-message';
 import ConversationTop from './top/conver-top';
 import {number,func,shape} from 'prop-types';

 class Conversation extends Component {
     state = { loading: true }

     componentWillReceiveProps = async ({dispatch,con: nextPropsCon}) => {
         let {con_id,unreadMssgs} = nextPropsCon;
         let {con} = this.props;
         if(con_id != con.con_id){
             new d('.send_mssg').focus()
             dispatch(getConDetails(con_id))
             dispatch(getConversationMessages(con_id))
             dispatch(readConversation(con_id,unreadMssgs))
         }

         this.setState({ loading: false })
     }

     componentDidMount = () => {
         let {con:{con_id,unreadMssgs},dispatch} = this.props;
         dispatch(getConDetails(con_id))
         dispatch(getConversationMessages(con_id));
         dispatch(readConversation(con_id,unreadMssgs))
         messageScroll()
     }

     componentDidUpdate = () => messageScroll()

     render(){
         let {loading} = this.state;
         let {hideConversation} = this.props;

         return (
             <div>
                 <IsLoading loading={loading} />

                 <div className={classNames('mssg_messages',cLoading(loading))}>
                     <FadeIn duration="300ms">
                         <ConversationTop hideConversation={hideConversation} />
                         <MapMessages />

                         <div className="m_m_bottom">
                             <TextMessage />
                         </div>
                     </FadeIn>
                 </div>
             </div>
         )
     }
 }

 Conversation.propTypes = {
     con: shape({
         con_id: number.isRequired,
         unreadMssgs: number.isRequired
         }).isRequired,
     hideConversation: func.isRequired    
 }

 export default connect()(Conversation);
 export {Conversation as PureConversation}