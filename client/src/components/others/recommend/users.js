 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {getUsersToRecommend} from '../../../actions/follow';
 import {removeHr} from '../../../utils/utils';
 import RecommendUserList from './user-list';
 import IsLoading from '../isLoading';
 import Overlay from '../overlay';
 import ModalHeader from '../modal/modal-header';
 import ModalMiddle from '../modal/modal-middle';
 import ModalBack from '../modal/modal-back';
 import {func} from 'prop-types';

 class RecommendUsers extends Component {
     state = {loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })
     componentDidMount = () => {
         let {dispatch,user_details} = this.props;
         dispatch(getUsersToRecommend(user_details)) 
     }

     componentDidUpdate = () => removeHr()

     render(){
         let {loading} = this.state;
         let {users,back} = this.props;
         let map_users = users.map(u => <RecommendUserList key={u.follow_to} {...u} back={back} />)

         return(
             <Fragment>
                 <Overlay />

                 <div className="likes modal modal_big">
                     <FadeIn duration="300ms">
                         <ModalHeader title="Recommend" />

                         <Scrollbars style={{ height: 450 }} className="modal_middle">
                             <IsLoading loading={loading} />
                             <ModalMiddle loading={loading} list={map_users} />
                         </Scrollbars>

                         <div className="modal_bottom">
                             <ModalBack back={back} />
                         </div>
                     </FadeIn>
                 </div>
             </Fragment>
         )
     }
 }

 RecommendUsers.propTypes = {
     back: func.isRequired
 }

 const mapStateToProps = state => ({
    user_details: state.User.user_details,
    users: state.Follow.usersToRecommend
 })

 export default connect(mapStateToProps)(RecommendUsers)