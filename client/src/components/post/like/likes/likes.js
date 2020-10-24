 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {getPostLikes} from '../../../../actions/post';
 import {removeHr} from '../../../../utils/utils';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import Overlay from '../../../others/overlay';
 import ModalHeader from '../../../others/modal/modal-header';
 import ModalMiddle from '../../../others/modal/modal-middle';
 import ModalBack from '../../../others/modal/modal-back';
 import LikeList from './like-list/like-list';
 import {number,func} from 'prop-types';

 class Likes extends Component{
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })

     componentDidMount = () => {
         let {dispatch,post} = this.props;
         dispatch(getPostLikes(post))
     }

     componentDidUpdate = () => removeHr()

     render(){
         let {loading} = this.state;
         let {likes,decrementLikes,back} = this.props;
         let map_likes = likes.map(l => (
             <LikeList key={l.like_id} {...l} decrementLikes={decrementLikes} />
         ))

         return (
             <Fragment>
                 <Overlay />

                 <div className="likes modal modal_big">
                     <Title value="Likes" />

                     <FadeIn duration="300ms">
                          <ModalHeader titile="Likes" />

                          <Scrollbars style={{ height: 450 }} className="modal_middle">
                              <IsLoading loading={loading} />
                              <ModalMiddle loading={loading} list={map_likes} />
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

 Likes.propTypes = {
    post: number.isRequired,
    back: func.isRequired,
    decrementLikes: func.isRequired
 }

 const mapStateToProps = state => ({
     likes: state.Post.likes
 })

 export default connect(mapStateToProps)(Likes)
 export {Likes as PureLikes}