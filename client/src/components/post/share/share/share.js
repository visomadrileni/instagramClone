 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {getUsersToShare} from '../../../../actions/post';
 import {removeHr} from '../../../../utils/utils';
 import ShareList from './share-list';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import Overlay from '../../../others/overlay';
 import ModalHeader from '../../../others/modal/modal-header';
 import ModalMiddle from '../../../others/modal/modal-middle';
 import ModalBack from '../../../others/modal/modal-back';
 import {number,func} from 'prop-types';

 class Share extends Component {
     share = { loading: false }

     componentWillReceiveProps = () => this.setState({ loading: false })

     componentDidMount = () => {
         let {dispatch,post} = this.props;
         dispatch(getUsersToShare(post))
     }

     componentDidUpdate = () => removeHr()

     render(){
         let {loading} = this.state;
         let {users,post,incrementShares,decrementShares,postOwner,back} = this.props;
         let map_users = users.map(u => (
             <ShareList 
                  key={u.follow_id}
                  {...u}
                  post={post}
                  incrementShares={incrementShares}
                  decrementShares={decrementShares}
                  postOwner={postOwner}
             />
         ))

        return (
            <Fragment>
                <Overlay />

                <div className="modal modal_big">
                    <Title value="Share post" />

                    <FadeIn duartion="300ms">
                        <ModalHeader title="Share post to" />

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

 Share.propTypes = {
     post: number.isRequired,
     postOwner: number.isRequired,
     incrementShares: func.isRequired,
     decrementShares: func.isRequired,
     back: func.isRequired
 }

 const mapStateToProps = state => ({
     users: state.Post.usersToShare
 })

 export default connect(mapStateToProps)(Share)
 export {Share as PureShare}