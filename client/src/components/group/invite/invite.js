 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {getUsersToInvite} from '../../../actions/group';
 import {removeHr} from '../../../utils/utils';
 import ModalHeader from '../../others/modal/modal-header';
 import ModalMiddle from '../../others/modal/modal-middle';
 import ModalBack from '../../others/modal/modal-back';
 import IsLoading from '../../others/isLoading';
 import Overlay from '../../others/overlay';
 import InviteList from './invite-list';
 import {number,func} from 'prop-types';
 
  class Invite extends Component{
      state = {loading: true }
 
      componentWillReceiveProps = () => this.setState({ loading: !this.state.loading})

      componentDidUpdate = () => removeHr()
      componentDidMount = () => {
          let {dispatch} = this.props;
          dispatch(getUsersToInvite())
      }

      render(){
          let {loading} = this.state;
          let {users,back,group} = this.props;
          let map_users = users.map(u => (
              <InviteList key={u.follow_id} {...u} back={back} group={group} />
          ))

          return (
              <Fragment>
                  <Overlay />

                  <div className="likes modal modal_big">
                      <FadeIn duration="300ms">
                          <ModalHeader title="Invite" />

                          <Scrollbars style={{ height: 450}} className="modal_middle">
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

   Invite.propTypes = {
       group: number,
       back: func.isRequired
   }

  const mapStateToProps = state => ({
      users: state.Group.userToInvite
  })

 export default connect(mapStateToProps)(Invite);
 export {Invite as PureInvite}






























































