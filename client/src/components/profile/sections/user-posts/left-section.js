 import React,{Fragment} from 'react'
 import {connect} from 'react-redux';
 import {Me} from '../../../../utils/utils';
 import NewConTeaser from '../../../messages/newConTeaser'
 import MutualUsers from '../../mutual-users/mutual-user';
 import UserHashtags from '../../../hashtag/user-hashtags';
 import AddToFavourites from '../../../others/addToFavourites'
 import Suggested from '../../../others/suggested/suggested';
 import Recommend from '../../../others/recommend/recommend';
 import {string} from 'prop-types';

 const UserPostsLeftSection = ({username,id}) => (
     <Fragment>
         {Me(id) && <MutualUsers username={username} />}

         <Suggested when="profile" params={username} />
         <UserHashtags username={username} />

         {!Me(id) && <Recommend username={username} />}
         {!Me(id) && <AddToFavourites user={id} username={username} />}
         {!Me(id) && <NewConTeaser userDetails={{username,id}} />}
     </Fragment>
 )

 UserPostsLeftSection.propTypes = {
     username: string.isRequired
 }

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(UserPostsLeftSection)