 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {FadeIn} from 'animate-components';
 import {getFollowers} from '../../../../actions/follow';
 import {bottomScroll,cLoading} from '../../../../utils/utils';
 import FollowersList from './followers-list';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import MonHeader from '../../../others/m-on/mon-header';
 import FollowSectionEnd from '../../../others/follow/follow-sectionEnd';
 import {string} from 'prop-types';

 class Followers extends Component {
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })
     componentDidMount = () => {
         let {user_details:{id},dispatch} = this.props;
         dispatch(getFollowers(id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
         let {loading} = this.state;
         let {followers,param:{username}} = this.props;
         let len = followers.length;
         let map_followers = followers.map(f => <FollowersList key={f.follow_id} {...f} />)

         return (
             <div>
                 <Title value={`@${username}'s followers`} />

                 <FadeIn duration="300ms">
                     <IsLoading loading={loading} />
                     <div className={classNames('wrapper_s','pro_s',cLoading(loading))} >
                         <div className={classNames({m_div: len !== 0,m_no_div: len === 0})}>
                             <MonHeader len={len} forWhat={'followers'} />
                             <div className="m_wrapper">{len !== 0 && map_followers}</div>
                         </div>
                     </div>

                     <FollowSectionEnd len={len} loading={loading} when="followers" />
                 </FadeIn>
             </div>
         )
     }
 }
 
 Followers.propTypes = {
     param: string.isRequired
 }
 
 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     followers: state.Follow.followers
 })

 export default connect(mapStateToProps)(Followers)
 export {Followers as PureFollowers}