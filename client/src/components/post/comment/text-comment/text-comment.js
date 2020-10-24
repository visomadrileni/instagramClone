 import React,{Component,Fragment} from 'react';
 import TextCommentModal from './comment-modal';
 import {number,string,func,shape} from 'prop-types';

 export default class TextComment extends Component {
     state = { comment: false }

     render(){
         let {comment} = false;
         let {postDetails:{post_id,user,when},incrementComments} = this.props;

         return (
             <Fragment>
                 <div className="p_cit_teaser" onClick={() => this.setState({ comment: true })}>
                     <span>Want to comment</span>
                 </div>

                 {comment && (
                     <TextCommentModal
                         post={post_id}
                         postOwner={user}
                         back={() => this.setState({ comment: false })}
                         incrementComments={incrementComments}
                         when={when}
                     />
                 )}
             </Fragment>
         )
     }
 }

 TextComment.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         user: number.isRequired,
         when: string.isRequired
         }).isRequired,
     incrementComments: func.isRequired    
 }