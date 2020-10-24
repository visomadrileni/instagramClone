 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {FadeIn} from 'animate-components'
 import {getBookmarkedPosts} from '../../../../actions/post';
 import {Me,bottomScroll,cLoading} from '../../../../utils/utils';
 import Title from '../../../others/title';
 import Nothing from '../../../others/nothing'
 import IsLoading from '../../../others/isLoading';
 import SectionsEnd from '../../../others/sections-end'
 import Suggested from '../../../others/suggested/suggested';
 import Post from '../../../post/post/post';
 import MapPosts from '../../../post/map-posts/map-posts';
 import {string} from 'prop-types';

 class Bookmarks extends Component {
     state = { loading:false }

     componentWillReceiveProps = ({dispatch,user_details}) => {
        this.setState({ loading: false });
        return this.props.user_details != user_details ? dispatch(getBookmarkedPosts(user_details.id)) : null;
     }

     componentDidMount = () => {
         let {user_details:{id},dispatch} = this.props;
         dispatch(getBookmarkedPosts(id))
     }

     componentDidUpdate = () => bottomScroll()


     render(){
         let {loading} = this.state;
         let {param:{username},user_details:{id},bookmarks} = this.props;
         let len = bookmarks.length;
         let map_posts = bookmarks.map(b => <Post key={b.post_id} {...b} when="bookmaeks" />)

       return (  
            <div>
                <FadeIn duration="300ms">
                    <IsLoading loading={loading} />
                    <Title value={`${username}'s bookmarked posts`} />

                    <div className={classNames('wrapper_s pro_s',cLoading(loading))} >
                        <div className="wrapper_k">
                            <Suggested />
                        </div>

                        <div className="wrapper_p">
                            {Me(id) ? (
                                <MapPosts posts={map_posts} nothingMssg={Me(id) ? 'You have no bookmarked posts' : `${username} has no bookmarked posts`} />
                               ) : (
                                <Nothing message={`${username}'s bookmarked posts are private`} />
                            )}
                        </div>
                    </div>

                    <SectionsEnd len={len} loading={loading} />
                </FadeIn>
            </div>
         ) 
     }
 }
 
 Bookmarks.propTypes = {
     param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     bookmarks: state.Post.bookmarks
 })

 export default connect(mapStateToProps)(Bookmarks)
 export {Bookmarks as PureBookmarks}