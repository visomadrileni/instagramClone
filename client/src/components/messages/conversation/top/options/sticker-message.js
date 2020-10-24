 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {stickerMessage} from '../../../../../utils/message-utils';
 import Stickers from '../../../../others/stickers/stickers';
 import {func} from 'prop-types';

 class StickerMessage extends Component{
     state = { showStickers: false }

     show = e => {
         e.preventDefault()
         this.setState({ showStickers: true })
     }

     message = sticker => {
         let {conDetails: {con_with,con_with_username},toggleOptions,dispatch} = this.props;
         stickerMessage({
             con_id: con_with,
             con_with: con_with_username,
             sticker,
             dispatch
            })
         toggleOptions()
     }

     modalBack = () => {
         this.setState({ showStickers: false })
         this.props.toggleOptions()
     }

     render(){
         let {showStickers} = this.state;

         return (
             <Fragment>
                 <li>
                     <a href="#" className="mssg_sticker" onClick={this.show}>Send sticker</a>
                 </li>

                 {showStickers && (
                     <Stickers back={this.modalBack} stickerSelected={sticker => this.message(sticker)} />
                 )}
             </Fragment>
         )
     }
 }

 StickerMessage.propTypes = {
     toggleOptions: func.isRequired
 }

 const mapStateToProps = state => ({
     conDetails: state.Message.conDetails
 })

 export default connect(mapStateToProps)(StickerMessage);
 export {StickerMessage as PureStickerMessage}