 import React,{Fragment} from 'react';
 import CommentTypeImage from './type-image';
 import ToTags from '../../../hashtag/toTags/toTags';
 import {string,oneOf} from 'prop-types';

 const CommentType = ({type,text,commentSrc}) => {
     let noComment = {
         fonStyle: 'italic',
         display: 'block'
     }

     return (
         <Fragment>
             {type === 'text' && !text ? (
                 <span style={noComment}>Empty comment</span>
             ) : type === 'text' ? (
                 <p className="ce">
                     <ToTags str={text} />
                 </p>
             ) : type === 'image' ? (
                 <CommentTypeImage commentSrc={commentSrc} />
             ) : type === 'sticker' ? (
                 <img src={`/comments/${commentSrc}`} className="comments_sticker" />
             ) : null }
         </Fragment>
     )
 }

 CommentType.propTypes = {
     type: oneOf(['text','image','sticker','']).isRequired,
     text: string,
     commentSrc: string
 }
 export default CommentType;