  import React,{Component} from 'react';
  import {timeAgo} from '../../../utils/utilMethods/handyTimeAgo';
  import PostTop from './post-top/post-top';
  import PostImage from './post-middle/post-image';
  import PostActions from './post-actions/post-actions';
  import PostBottom from './post-bottom/post-bottom';
  import AppLink from '../../others/link/link';
  import {number,string,oneOf,array} from 'prop-types';
  
  export default class Post extends Component {
      state = { description: ''}

      componentDidMount = () =>this.setState({ description: this.state.description })

      render(){
          let {description} = this.state;
          let {share_by_username,share_time,when} = this.props;

          return (
              <div className="posts">
                  {when === 'shared' && (
                      <div className="post_share_info">
                          by{' '} 
                          <AppLink
                              url={`/profile/${share_by_username}`}
                              label={share_by_username}
                           />
                           <span>{share_time ? timeAgo(share_time) : null }</span>
                      </div>
                  )}

                  <PostTop
                     postDetails={{
                         ...this.props,
                         description
                        }}
                     updateDescription={value => this.setState({ description: value })}
                  />
                  <PostImage
                    postDetails={{
                        ...this.props,
                        description
                    }}
                  />

                  <hr className="img_d_hr" />
                  <PostActions postDetails={{...this.props}} />
                  <hr />
                  <PostBottom postDetails={{...this.props}} />
              </div>
          )
      }
  } 

  Post.propTypes = {
      post_id: number.isRequired,
      likes_count: number.isRequired,
      shares_count: number.isRequired,
      comments_count: number.isRequired,
      tags_count: number.isRequired,
      user: number.isRequired,
      group_id: number,
      username: string.isRequired,
      firstname: string.isRequired,
      surname: string.isRequired,
      location: string.isRequired,
      description: string.isRequired,
      filter: string.isRequired,
      imgSrc: string.isRequired,
      type: oneOf(['user','group']).isRequired,
      group_name: string,
      post_time: string.isRequired,
      share_by_username: string,
      share_time: string,
      comments: array,
      when: oneOf(['feed','viewPost','userPosts','bookmarks','shared','tagged','groupPosts','hashtag']).isRequired,
  }