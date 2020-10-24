 import React,{Component,Fragment} from 'react';
 import ToolTip from 'react-tooltip';
 import Emojis from '../../../others/emojis/emojis';
 import MaterailIcon from '../../../others/icons/material-icon';
 import {func} from 'prop-types';

 export default class ConversationAddEmojis extends Component {
    state = { showEmojis: false }
    
    toggleEmojis = () => this.setState({ showEmojis: !this.state.showEmojis})

    render(){
       let {showEmojis} = this.state;
       let {updateMssgValue} = this.props;

       return (
           <Fragment>
               <span className="mssg_emoji_btn" onClick={this.toggleEmojis} data-tip="Add emojis">
                   <MaterailIcon icon="sentiment_very_sattisfied" />
               </span>

               {showEmojis && (
                   <Emojis
                      position={{ top:308, left:750 }}
                      textArea=".send_mssg"
                      updateStateValue={(value) => updateMssgValue(value)}
                   />
               )}

               <ToolTip />
           </Fragment>
       )
    }
 }

 ConversationAddEmojis.propTypes = {
     updateMssgValue: func.isRequired
 }