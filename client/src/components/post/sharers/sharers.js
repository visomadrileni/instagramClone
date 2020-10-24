 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {getPostSharers} from '../../../actions/post';
 import {removeHr} from '../../../utils/utils';
 import Sharer from './sharer/sharer';
 import Title from '../../others/title';
 import ModalHeader from '../../others/modal/modal-header';
 import ModalMiddle from '../../others/modal/modal-middle';
 import ModalBack from '../../others/modal/modal-back';
 import IsLoading from '../../others/isLoading';
 import Overlay from '../../others/overlay';
 import {number,func} from 'prop-types';

 class Sharers extends Component{
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })

     componentDidMount = () => {
         let {dispatch,post} = this.props;
         dispatch(getPostSharers(post))
     }

     componentDidUpdate = () => removeHr()

     render(){
         let {loading} = this.state;
         let {sharers,decrementSharers,back} = this.props;
         let map_sharers = sharers.map(s => (
             <Sharer key={s.share_id} {...s} decrementSharers={decrementSharers} />
         ))

         return (
             <Fragment>
                 <Overlay />

                 <div className="modal modal_big">
                     <Title value="Post shared by" />

                     <FadeIn duration="300ms">
                         <ModalHeader title="Post shared by" />

                         <Scrollbars style={{ height: 450 }} className="modal_middle">
                             <IsLoading loading={loading} />
                             <ModalMiddle loading={loading} list={map_sharers} />
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

 Sharers.propTypes = {
     post: number.isRequired,
     back: func.isRequired,
     decrementSharers: func.isRequired
 }

 const mapStateToProps =  state => ({
     sharers: state.Post.sharers
 })

 export default connect(mapStateToProps)(Sharers)
 export {Sharers as PureSharers}