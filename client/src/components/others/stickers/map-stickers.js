 import React from 'react';
 import {FadeIn} from 'animate-components';
 import {string,func,arrayOf} from 'prop-types';

 const MapStickers = ({stickers,selectSticker}) => {
     let map_stickers = stickers.map(s => (
         <img
            key={s}
            src={`/images/stickers/${s}`}
            className="sti_img"
            data-sticker={`sticker-${s}`}
            onClick={() => selectSticker(s)}
         />
     ))

     return <FadeIn duration="300ms">{map_stickers}</FadeIn>
 }

 MapStickers.propTypes = {
     stickers: arrayOf(string).isRequired,
     selectSticker: func.isRequired
 }

 export default MapStickers;