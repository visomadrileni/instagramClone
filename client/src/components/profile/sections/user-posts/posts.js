 import React,{Component} from 'react'
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Me} from '../../../../utils/utils';
 import UserPostsLeftSection from  './left-section'
 import SectionsEnd from '../../../others/sections-end'
 import Post from '../../../post/post/post';
 import MapPosts from '../../../post/map-posts/map-posts';
 import {string} from 'prop-types';

 class Posts extends Component {
     render(){
         let {user_details:{id},param:{username},posts} = this.props;
         let len = posts.length;
         let map_posts = posts.map(p => <Post key={p.post_id} {...p} when="userPosts" />)

         return (
             <div>
                 <FadeIn duration="300ms">
                     <div className="wrapper_s pro_s">
                         <div className="wrapper_k">
                             <UserPostsLeftSection username={username} />
                         </div>

                         <div className="wrapper_p">
                             <MapPosts posts={map_posts} nothingMssg={Me(id) ? 'You have no posts' : `${username} have no posts`} />
                         </div>
                     </div>

                     <SectionsEnd len={len} />
                 </FadeIn>
             </div>
         )
     }
 }

 Posts.propTypes = {
   param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     posts: state.Post.posts
 })

 export default connect(mapStateToProps)(Posts) 