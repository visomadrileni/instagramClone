 import React,{Component} from 'react';
 import ConversationInfo from './info';
 import ConversationOptions from './options/options';
 import MaterialIcon from '../../../others/icons/material-icon';
 import {func} from 'prop-types';

 export default class ConversationTop extends Component {
     state = { showOptions: false }

     toggleOptions = () => this.setState({ showOptions: !this.state.showOptions})

     render(){
         let {showOptions} = this.state;
         let {hideConversation} = this.props;

         return (
             <div className="m_m_top">
                 <ConversationInfo />

                 <span className="m_m_exp" data-tip="Options" onClick={this.toggleOptions}>
                     <MaterialIcon icon="expand_more" />
                 </span>

                 {showOptions && (
                     <div className="mssg_options options">
                         <ConversationOptions hideConversation={hideConversation} toggleOptions={this.toggleOptions} />
                     </div>
                 )}
             </div>
         )
     }
 } 

 ConversationTop.propTypes = {
     hideConversation: func.isRequired
 }