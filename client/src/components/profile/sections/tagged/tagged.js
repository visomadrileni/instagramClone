 import React,{Component} from 'react'
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {getTaggedPosts} from '../../../../actions/post';
 import {Me,bottomScroll,cLoading} from '../../../../utils/utils';
 import Post from '../../../post/post/post';
 import MapPosts from '../../../post/map-posts/map-posts'
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading'
 import SectionsEnd from '../../../others/sections-end'
 import Suggested from '../../../others/suggested/suggested';
 import {string} from 'prop-types';

 class Tagged extends Component {
     state = { loading: true }

     componentWillReceiveProps = ({user_details,dispatch}) => {
         this.setState({ loading: false });
         return this.props.user_details !== user_details ? dispatch(getTaggedPosts(user_details.id)) : null;
     }

     componentDidMount = () => {
        let {user_details:{id},dispatch} = this.props;
        dispatch(getTaggedPosts(id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
         let {loading} = this.state;
         let {user_details:{id},param:username,tagged} = this.props;
         let len = tagged.length;
         let map_tagged = tagged.map(t => <Post key={t.post_id} {...t} when="tagged" />)

         return (
             <div>
                 <FadeIn duration="300ms">
                     <IsLoading loading={loading} />
                     <Title value={`${username}'s tagged posts`} />

                     <div className={classNames('wrapper_s',cLoading(loading))}>
                         <div className="wrapper_k">
                             <Suggested when="profile" />
                         </div>

                         <div className="wrapper_p">
                             <MapPosts posts={map_tagged} nothingMssg={Me(id) ? 'You are not tagged in any post' : `${username} is not tagged in any post`} />
                         </div>
                     </div>

                     <SectionsEnd len={len} loading={loading} />
                 </FadeIn>
             </div>
         )
     }
 }

 Tagged.propTypes = {
     param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     tagged: state.Post.tagged
 })

 export default connect(mapStateToProps)(Tagged)
 export {Tagged as Puretagged}