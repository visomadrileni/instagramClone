 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {Me} from '../../../../../utils/utils';
 import {timeAgo} from '../../../../../utils/utilMethods/handyTimeAgo';
 import RemoveFav from './remove-favourite';
 import AppLink from '../../../../others/link/link'
 import Follow from '../../../../others/follow/follow';
 import Unfollow from '../../../../others/follow/unfollow';
 import MonSticky from '../../../../others/m-on/mon-sticky';
 import MonTopInfo from '../../../../others/m-on/mon-topinfo';
 import {number,string} from 'prop-types';

 class Favourite extends Component{
    state = {
        isFollowing: false,
        showTime: false
    }

    showTime = () => this.setState({ showTime: true })
    hideTime = () => this.setState({ showTime: false })

    componentDidMount = async () => {
        let {user,username} = this.props;
        if(!Me(user)){
            let {data: isFollowing} = await post('/api/is-following',{username})
            await this.setState({ isFollowing})
        }
    }


    render(){
        let {isFollowing,showTime} = this.state;
        let {id,fav_id,fav_time,user,username,firstname,surname} = this.props;

        return (
            <div className="m_on followers_m_on" onMouseOver={this.showTime} onMouseOut={this.hideTime}>
               <MonTopInfo info={{user,username,firstname,surname}} />
               <MonSticky show={showTime} text={timeAgo(fav_time)} />

               <div className="m_bottom">
                   <RemoveFav fav_id={fav_id} username={username} />
                   {Me(user) ? (
                       <AppLink url={`/profile/${username}`} className="sec_btn" label="Profile" />
                    ) : isFollowing ? (
                        <Unfollow user={user} unfollowed={() => this.setState({isFollowing: false})} updateFolowings={Me(id)} />
                    ) : <Follow userDetails={{user,username,firstname,surname}} followed={() => this.setState({ isFollowing: true })} updateFollowings={Me(id)} />}
               </div>
            </div>
        )
    }
 }

 Favourite.propTypes = {
     fav_id: number.isRequired,
     fav_by: number.isRequired,
     fav_time: string.isRequired,
     user: number.isRequired,
     username: string.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired
 }

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(Favourite)
 export {Favourite as PureFavourite}