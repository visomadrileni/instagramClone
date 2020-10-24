 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {getFollowings} from '../../../../actions/follow';
 import {bottomScroll,cLoading} from '../../../../utils/utils';
 import FollowingsList from './followingsList';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import MonHeader from '../../../others/m-on/mon-header';
 import FollowSectionEnd from '../../../others/follow/follow-sectionEnd';
 import {string} from 'prop-types';

 class Followings extends Component {
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })
     componentDidMount = () => {
         let {user_details:{id},dispatch} = this.props;
         dispatch(getFollowings(id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
          let {loading} = this.state;
          let {followings,param:{username}} = this.props;
          let len = followings.length;
          let map_followings = followings.map(f => <FollowingsList key={f.follow_id} {...f} />)

          return (
              <div>
                  <Title value={`@${username}'s followings`} />

                  <FadeIn duration="300ms">
                      <IsLoading loading={loading} />

                      <div className={classNames('wrapper_s','pro_s',cLoading(loading))}>
                          <div className={classNames({ m_div: len !== 0,m_no_div: len === 0})}>
                              <MonHeader len={len} forWhat={'following'} />
                              <div className="m_wrapper">{len !== 0 && map_followings}</div>
                          </div>
                      </div>

                      <FollowSectionEnd len={len} loading={loading} when="followings" />
                  </FadeIn>
              </div>
          )
     }
 }

 Followings.propTypes = {
     param: string.isRequired
 }

 const mapStateToProps = state => ({
     followings: state.Follow.followings,
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(Followings)
 export {Followings as PureFollowings}