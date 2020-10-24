 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {Me,humanReadable} from '../../../utils/utils';
 import AppLink from '../../others/link/link';
 import MonTopInfo from '../../others/m-on/mon-topinfo';
 import MonSticky from '../../others/m-on/mon-sticky';
 import Follow from '../../others/follow/follow';
 import Unfollow from '../../others/follow/unfollow';

 class ExploreUsersList extends Component {
     state = {
         isFollowings: false,
         showTime: false
         }

      showTime = () => this.setState({ showTime: true})
      hideTime = () => this.setState({ showTime: false})
      
    render(){
        let {id,username,firstname,surname,followers_count,mutualUsersCount} = this.props;
        let {isFollowings,showTime} = this.state;

        return (
            <div className="m_on followers_m_on" onMouseOver={this.showTime} onMouseOut={this.hideTime}>
                <MonTopInfo
                    info={{
                        user: id,
                        username,
                        firstname,
                        surname,
                        mutuals: mutualUsersCount
                      }}
                    basedOnMutuals   
                />

                <MonSticky
                    show={showTime}
                    text={humanReadable(followers_count,'follower')}
                />

                <div className="m_bottom">
                    {Me(id) ? (
                        <AppLink
                           url={`/profile/${username}`}
                           label="Profile"
                           className="sec_btn"
                        />
                    ) : isFollowings ? (
                        <Unfollow
                             user={id}
                             unfollowed={() => this.setState({ isFollowings: false})}
                        />
                    ) : (
                        <Follow
                           userDetails={{user:id,username}}
                           followed={() => this.setState({ isFollowings: true})}
                        />
                    )}
                </div>
            </div>
        )
    }  
 }

 export default connect()(ExploreUsersList)
 export {ExploreUsersList as PureExploreUsersList}






































































