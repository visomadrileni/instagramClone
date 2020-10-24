 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {getPostTags} from '../../../actions/post';
 import {removeHr} from '../../../utils/utils';
 import TagItems from './tag-list/tag-list';
 import Title from '../../others/title';
 import Overlay from '../../others/overlay';
 import IsLoading from '../../others/isLoading'
 import ModalHeader from '../../others/modal/modal-header';
 import ModalMiddle from '../../others/modal/modal-middle';
 import ModalBack from '../../others/modal/modal-back';
 import {number,func} from 'prop-types';

 class Tags extends Component {
     state = { loading: false }

     componentWillReceiveProps = () =>this.setState({ loading: false })
     componentDidMount = () => {
         let {dispatch,post} = this.props;
         dispatch(getPostTags(post))
     }

     componentDidUpdate = () => removeHr()

     render(){
         let {loading} = this.state;
         let {tags,decrementTags,back} = this.props;
         let map_tags = tags.map(t => <TagItems key={t} {...t} decrementTags={decrementTags} />)
         

         return (
             <Fragment>
                 <Overlay />

                 <div className="tags_model modal modal_big">
                     <Title value="Tags" />

                     <FadeIn duration="300ms">
                         <ModalHeader title="Tagged in this post" />

                         <Scrollbars style={{ height: 450 }} className="modal_middle">
                             <IsLoading loading={loading} />
                             <ModalMiddle loading={loading} list={map_tags} />
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

 Tags.propTypes = {
    post: number.isRequired,
    back: func.isRequired,
    decrementTags: func.isRequired
 }

 const mapStateToProps = state => ({
     tags: state.Post.tags
 })

 export default connect(mapStateToProps)(Tags);
 export {Tags as PureTags}