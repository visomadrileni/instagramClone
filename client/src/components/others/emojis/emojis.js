 import React from 'react';
 import {Scrollbars} from 'react-custom-scrollbars';
 import EmojisList from './emojis-list';
 import {shape,number,string,func,bool} from 'prop-types';

 const Emojis = props => {
     let {position} = props;

     return (
         <div className="emoji" style={position}>
             <Scrollbars className="emoji_wrapper" style={{ height: '300px'}}>
                 <EmojisList {...props} />
             </Scrollbars>
         </div>
     )
 }

 Emojis.defaultProps = {
     position: {
         top: 0,
         left: 0
     },
     recenterEmojis: false
 }

 export const EmojisPropTypes = {
     position: shape({
         top: number.isRequired,
         left: number.isRequired
         }),
    textArea: string.isRequired,
    updateStateValue: func.isRequired,
    recenterEmojis: bool
 }
 Emojis.propTypes = EmojisPropTypes;

 export default Emojis;
































