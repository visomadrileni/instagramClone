 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {FadeIn} from 'animate-components';
 import Message from './message';
 import Nothing from '../../../others/nothing';

 const MapMessage = ({messages}) => {
     let len = messages.length;
     let map_messages = messages.map(m => <Message key={m.message_id} {...m} />)

     return (
         <Fragment>
             <Scrollbars className="m_m_wrapper" style={{ height: 390}}>
                 <div className="m_m_main">
                     {len === 0 ? (
                         <Nothing showMessage={false} />
                     ) : (
                         <FadeIn duration="300ms">{map_messages}</FadeIn>
                     )}

                     <div className="mssg_end" />
                 </div>
             </Scrollbars>
         </Fragment>
     )
 }

 const mapStateToProps = state => ({
     messages: state.Message.messages
 })

 export default connect(mapStateToProps)(MapMessage)