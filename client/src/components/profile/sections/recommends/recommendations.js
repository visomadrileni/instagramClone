 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {Me,bottomScroll} from '../../../../utils/utils';
 import Recommend from './recommend/rList' 
 import Title from '../../../others/title'
 import MonEnd from '../../../others/m-on/mon-end';
 import MonHeader from '../../../others/m-on/mon-header';
 import {string} from 'prop-types';

 class Recommendations extends Component {
     componentDidUpdate = () => bottomScroll()

     render(){
         let {user_details:{id},param:username,recommends} = this.props;
         let len = recommends.length;
         let map_recommends = recommends.map(r => <Recommend key={r.recommend_id} {...r} />)

         return (
             <div>
                 <Title value={`@${username}'s recommendations`} />

                 <FadeIn duration="300ms">
                     <div className="wrapper pro_s">
                         <div className={classNames({m_div: len !== 0,m_no_div: len === 0 })}>
                             <MonHeader len={len} forWhat="recommendation" />
                             <div className="m_wrapper">{len !== 0 && map_recommends}</div>
                         </div>
                     </div>

                     <MonEnd len={len} nothingMssg={Me(id) ? 'You have no recommendations' : `${username} have no recommendations`} />
                 </FadeIn>
             </div>
         )
     }
 }

 Recommendations.propTypes = {
     param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     recommends: state.Follow.recommendations
 })

 export default connect(mapStateToProps)(Recommendations);
 export {Recommendations as PureRecommendations}