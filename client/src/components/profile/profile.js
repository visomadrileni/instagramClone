 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {getUnreadMessages} from '../../actions/message';
 import {getUnreadNotifications} from '../../actions/notification';
 import {isAdmin} from '../../utils/admin-utils';
 import {forProfile,isPrivate,humanReadable,cLoading} from '../../utils/utils';
 import ProfileNav from './nav';
 import ProfileRoutes from './profile-routers'
 import Banner from './banner/banner';
 import Title from '../others/title';
 import Nothing from '../others/nothing';
 import IsLoading from '../others/isLoading';

 class Profile extends Component {
     state = { loading: true }

     inv_error = () => this.props.history.push('/error/user')

     componentWillReceiveProps = ({dispatch,match}) => {
         if(this.props.match.url != match.url){
             forProfile({
                 dispatch,
                 username: match.params.username,
                 invalidUser: this.inv_error
             })
           }
         this.setState({ loading: false })
     }

     componentDidMount = () => {
         let {match:{params:username},dispatch} = this.props;
         forProfile({dispatch,username,invalidUser: this.inv_error})
         dispatch(getUnreadNotifications())
         dispatch(getUnreadMessages())
     }

     render(){
         let {loading} = this.state;
         let {
              match:{url,params:{username}},
              user_details: {id,firstname,surname,account_type},
              isFollowing,
              mutuals
            } = this.props;
         let notPrivate = !isPrivate(id,isFollowing,account_type)

         return (
             <div>
                 <Title value={`@${username} (${firstname} ${surname})`} desc={`Connect with ${username}'s profile`} />

                 <div className="profile-data" id="profile-data" data-get-username={username} data-getid={id}>
                     <IsLoading loading={loading} when="page" />

                     <FadeIn duration="300ms" className={cLoading(loading)}>
                        <Banner />
                        {notPrivate || isAdmin() ? (
                            <div>
                                <ProfileNav url={url} user={id} />
                                <ProfileRoutes url={url} param={username} />
                            </div>
                        ) : (
                            <div style={{ marginTop: 85}}>
                                <Nothing message={`Account is private.Follow to connect with ${username}`} secondMessage={mutuals.length != 0 ? humanReadable(mutuals.length,'mutual follower') : ''} />
                            </div>
                        )}
                     </FadeIn>
                 </div>
             </div>
         )
     }
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     mutuals: state.User.mutualUsers,
     isFollowing: state.Follow.isFollowing
 })

 export default connect(mapStateToProps)(Profile)
 export {Profile as PureProfile}