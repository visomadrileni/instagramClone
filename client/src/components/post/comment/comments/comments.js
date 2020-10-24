 import React from 'react';
 import Comment from './comment';
 import {string,func,array} from 'prop-types';

 const Comments = ({when,comments,decrementComments}) => {
   let map_comments = comments ? comments.map(c => <Comment key={c.comment_id} {...c} decrementComments={decrementComments} />) : null

   return (
         <div>
             {when === 'viewPost' && <div className="comments_div">{map_comments}</div>}
         </div>
     )
 }

 Comments.propTypes = {
    when: string.isRequired,
    comments: array,
    decrementComments: func.isRequired
 }
 
 export default Comments;