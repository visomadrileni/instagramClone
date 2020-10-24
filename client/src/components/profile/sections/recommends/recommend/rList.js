 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {timeAgo} from '../../../../../utils/utilMethods/handyTimeAgo'
 import {notify} from '../../../../../utils/utilMethods/handy-notification';
 import {removeRecommandation} from '../../../../../actions/follow';
 import {Me} from '../../../../../utils/utils'
 import RecommendBy from './recommend-by';
 import MonSticky from '../../../../others/m-on/mon-sticky';
 import MonTopInfo from '../../../../others/m-on/mon-topinfo'
 import SecondaryButton from '../../../../others/button/secondary-button';
 import {number,string} from 'prop-types';

 class RecommendList extends Component {
     state = { showTime: false }

     showTime = () => this.setState({ showTime: true })
     hideTime = () => this.setState({ showTime: false })

     removeRecommendation = async e => {
         e.preventDefault()
         let {recommend_id,dispatch} = this.props;
         await post('/api/remove-recommendation',{recommend_id})
         dispatch(removeRecommandation(recommend_id))
         notify({ value: 'Removed recommendation '})
     }

     render(){
         let {showTime} = this.state;
         let {user_details:{id},recommend_of,recommend_of_username,recommend_of_firstname,recommend_of_surname,recommend_time} = this.props;

         return (
             <div className="m_on followers_m_on" onMouseOver={this.showTime} onMouseOut={this.hideTime}> 
                 <MonTopInfo info={{
                     user:recommend_of,
                     username: recommend_of_username,
                     firstname: recommend_of_firstname,
                     surname: recommend_of_surname
                    }}
                  />
                  <MonSticky show={showTime} text={timeAgo(recommend_time)} />

                   <div className="m_bottom">
                      <RecommendBy username={recommend_of_username} />
                      {Me(id) && (<SecondaryButton label="Remove" onClick={this.removeRecommendation} />)}
                   </div> 
             </div>
         )
     }
 }

 RecommendList.propTypes = {
     recommend_id: number.isRequired,
     recommend_by: number.isRequired,
     recommend_to: number.isRequired,
     recommend_of: number.isRequired,
     recommend_by_username: string.isRequired,
     recommend_of_username: string.isRequired,
     recommend_of_firstname: string.isRequired,
     recommend_of_surname: string.isRequired,
     recommend_time: string.isRequired
 }

 const mapStateToProps = state => ({
    user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(RecommendList)
 export {RecommendList as PureRecommendList}