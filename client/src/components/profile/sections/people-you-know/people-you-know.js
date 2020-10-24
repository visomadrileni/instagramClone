 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Redirect} from 'react-router-dom';
 import classNames from 'classnames';
 import {Me} from '../../../../utils/utils';
 import PeopleYouKnowList from './peope-you-know-list';
 import Title from '../../../others/title'
 import MonEnd from '../../../others/m-on/mon-end';
 import MonHeader from '../../../others/m-on/mon-header';
 import {string} from 'prop-types';

 class PeopleYouKnow extends Component {
    render(){
         let {user_details:{id},param:username,mutuals} = this.props;
         let len = mutuals.length;
         let map_mutuals = mutuals.map(m => <PeopleYouKnowList key={m.follow_id} {...m} />) 

         return (
            <div>
                 {Me(id) ? <Redirect to={`/profile/${username}`} /> : null}
                 <Title value={`@${username}'s followers you might know`} />

                 <FadeIn duration="300ms" >
                     <div className="wrapper_s pro_s">
                         <div className={classNames({ m_div: len !== 0,m_no_div: len === 0})}>
                             <MonHeader len={len} forWhat={'peopleYouKnow'} />
                             <div className="m_wrapper">{len !== 0 && map_mutuals}</div>
                         </div>
                     </div>

                     <MonEnd len={len} nothingMssg={Me(id) ? "You have no followers" : `${username} have no followers`} />
                 </FadeIn>
            </div>
         )
    }
 }

 PeopleYouKnow.propTypes = {
    param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     mutuals: state.User.mutualUsers
 })

 export default connect(mapStateToProps)(PeopleYouKnow);
 export {PeopleYouKnow as PurePeopleYouKnow}