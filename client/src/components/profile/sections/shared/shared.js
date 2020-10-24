 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames'
 import {getSharedPosts} from '../../../../actions/post';
 import {Me,bottomScroll,cLoading} from '../../../../utils/utils';
 import Post from '../../../post/post/post';
 import MapPosts from '../../../post/map-posts/map-posts';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import SectionsEnd from '../../../others/sections-end'
 import Suggested from '../../../others/suggested/suggested';
 import {string} from 'prop-types';

 class Shared extends Component {
     state = { loading: true }

     componentWillReceiveProps = ({user_details,dispatch}) => {
         this.setState({ loading: false })
         return this.props.user_details != user_details ? dispatch(getSharedPosts(user_details.id)) : null;
     }

     componentDidMount = () => {
         let {user_details:{id},dispatch} = this.props;
         dispatch(getSharedPosts(id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
       let {loading} = this.state;
       let {user_details:{id},param:username,shared} = this.props;
       let len = shared.length;
       let map_shared = shared.map(sh => <Post key={sh.share_id} {...sh} when="shared" />)

       return (
           <div>
               <FadeIn duration="300ms">
                   <IsLoading loading={loading} />
                   <Title value={`${username}'s shared posts`} />

                   <div className={classNames('wrapper_s','pro_s',cLoading(loading))}>
                       <div className="wrapper_k">
                           <Suggested />
                       </div>

                       <div className="wrapper_p">
                           <MapPosts posts={map_shared} nothingMssg={`No one shared posts with ${Me(id) ? 'you' : username}`} />
                       </div>
                   </div>

                   <SectionsEnd len={len} loading={loading} />
               </FadeIn>
           </div>
       )
     }
 }

 Shared.propTypes = {
     param: string.isRequired
 } 

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     shared: state.Post.shared
 })

 export default connect(mapStateToProps)(Shared)
 export {Shared as PureShared}