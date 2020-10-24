 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {humanReadable} from '../../../utils/utils';
 import d from '../../../utils/api/Dom';
 import Nothing from '../../others/nothing';
 import ConversationTeaser from './conversation-teaser';
 import {func} from 'prop-types';

 const MapConversations = ({showConversation,conversations}) => {
     let selcetConversation = con => {
         new d('.mssg_sr').removeClass('mssg_sr_toggle')
         new d(`.mt_${con.con_id}`).addClass('mssg_sr_toggle')
         showConversation(con)
     }

   let conlen = conversations.lengthl
   let map_conv = conversations.map(c => (
       <ConversationTeaser
          key={c.con_id}
          {...c}
          select={() => selcetConversation({
              con_id: c.con_id,
              unreadMssgs: c.unreadMssgs
          })}
       />
   ))
   
   return (
       <Fragment>
           <span className="con_count">{humanReadable(conlen,'conversation')}</span>
           {conlen === 0 ? (
               <Nothing conPage message="No conversation" />
           ) : (
               <FadeIn duration="300ms">{map_conv}</FadeIn>
           )}
       </Fragment>
   )
 }

 MapConversations.propTypes = {
    showConversation: func.isRequired
 }

 const mapStateToProps = state => ({
     conversations: state.Message.conversations
 })

 export default connect(mapStateToProps)(MapConversations);
 export {MapConversations as PureMapConversations}