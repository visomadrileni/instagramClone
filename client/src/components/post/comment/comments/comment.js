 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {timeAgo} from '../../../../utils/utilMethods/handyTimeAgo';
 import {Me} from '../../../../utils/utils';
 import CommentType from './comment-type';
 import CommentOptions from './options/comment-options';
 import AppLink from '../../../others/link/link';
 import {number,string,func,oneOf} from 'prop-types';

 class Comment extends Component{
     state = { text: '' }

     _toggle = what => this.setState({ text: this.state[what]})
     componentDidMount = () => this.setState({text: this.props.text})

     render(){
         let {text} = this.state;
         let {comment_id,comment_by,comment_by_username,type,commentSrc,comment_time,decrementComments} = this.props;

         return (
            <div>
              <div className={classNames('comments',{my_comment: Me(comment_by)})}>
                 <img src={`/users/${comment_by}/avatar.jpg`} alt="avatar" />

                 <div className="comments_content">
                     <AppLink
                        url={`/profile/${comment_by_username}`}
                        className="comments_user"
                        label={comment_by_username}
                     />

                     <CommentType type={type} text={text} commentSrc={commentSrc} />
                     <div className="comments_bottom">
                         <span className="comments_time">{timeAgo(comment_time)}</span>
                     </div>

                     <CommentOptions
                        commentDetails={{
                            comment_id,
                            comment_by,
                            text,
                            type,
                            commentSrc
                            }}
                        decrementComments={decrementComments}
                        updateCommentText={value => this.setState({ text: value})}    
                     />
                 </div>
              </div>
            </div> 
         )
     }
 }

 Comment.propTypes = {
     comment_id: number.isRequired,
     comment_by: number.isRequired,
     comment_by_username: string.isRequired,
     comment_time: string.isRequired,
     post_id: number.isRequired,
     commentSrc: string,
     text: string,
     type: oneOf(['text','sticker','image']).isRequired,
     decrementComments: func.isRequired
 }
 
 export default connect()(Comment)