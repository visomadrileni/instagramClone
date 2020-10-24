 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import ToolTip from  'react-tooltip';
 import {stickerComment} from '../../../../utils/comment-utils';
 import MaterialIcon from '../../../others/icons/material-icon';
 import Stickers from '../../../others/stickers/stickers';
 import {number,string,func,shape} from 'prop-types';

 class StickerComment extends Component {
     state = { showStickers:false}

     stickerComm = sticker => {
         let {postDetails: {post_id,when,user},incrementComments,dispatch} = this.props;
         stickerComment({
             sticker,
             post_id,
             user,
             when,
             dispatch,
             done: () => incrementComments()
         })
     }

     render(){
         let {showStickers} = this.state;

         return (
             <div>
                 <span className="c_sticker" data-tip="Add sticker" onClick={() => this.setState({ showStickers: true})}>
                     <MaterialIcon icon="face" />
                 </span>

                 <ToolTip />

                 {showStickers && (
                     <Stickers
                        back={() => this.setState({ showStickers: false })}
                        stickerSelected={sticker => this.stickerComm(sticker)}
                     />
                 )}
             </div>
         )
     }
 }

 StickerComment.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         user: number.isRequired,
         when: string.isRequired
        }).isRequired,
     incrementComments: func.isRequired   
 }

 export default connect()(StickerComment)
 export {StickerComment as PureStickerComment}