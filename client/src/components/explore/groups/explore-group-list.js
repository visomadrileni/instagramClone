 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {timeAgo} from '../../../utils/utilMethods/handyTimeAgo';
 import {humanReadable} from '../../../utils/utils';
 import AppLink from '../../others/link/link';
 import MonSticky from '../../others/m-on/mon-sticky';
 import Leave from '../../group/join-group/leave';
 import Join from '../../group/join-group/join';
 
 class ExploreGroupList extends Component {
     state = {
         joined: false,
         showTime: false
        }

     showTime = () => this.setState({ showTime: true })
     hideTime = () => this.setState({ showTime: false })
     
     render(){
       let { group_id,name,created,membersCount,mutualMembersCount,session: {id: user}} = this.props;
       let {joined,showTime} = this.state;
       let spanText = mutualMembersCount === 0 ? humanReadable(membersCount,'member') : humanReadable(mutualMembersCount,'mutual member')

       return(
           <div className="m_on exp_groups_m_on" onMouseOver={this.showTime} onMouseOut={this.hideTime}>
               <div className="m_top">
                   <img src={`/groups/${group_id}/avatar.jpg`} />

                   <div className="m_top_right">
                       <AppLink
                          url={`/group/${group_id}`}
                          label={name}
                       />
                       <span>{spanText}</span>
                   </div>
               </div>

               <MonSticky
                  show={showTime}
                  text={timeAgo(created)}
               />

               <div className="m_bottom">
                   {joined ? (
                       <Leave
                          leaveDeatils={{ user,group_id}}
                          leaved= {() => this.setState({ joined: false})}
                       />
                   ) : (
                       <Join
                         joinDetails={{
                             user,
                             addedBy: user,
                             group_id}}
                          joined={() => this.setState({ joined: true})}   
                       />
                   )}
               </div>
           </div>
       )
     }
 }

 const mapStateToProps = state => ({
     session: state.User.session
 })

 export default connect(mapStateToProps)(ExploreGroupList);
 export {ExploreGroupList as PureExploreGroupList}




































