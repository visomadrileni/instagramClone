 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {FadeIn} from 'animate-components';
 import {getGroupPhotos} from '../../../../actions/post';
 import {bottomScroll,cLoading} from '../../../../utils/utils';
 import GroupPhotos from './group-photos';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import End from '../../../others/end';

 class GroupGallery extends Component{
     state = {loading: true}

     componentWillReceiveProps = ({dispatch,group_details}) => {
         this.props.group_details !== group_details && dispatch(getGroupPhotos(group_details.group_id))
         this.setState({ loading: false})
     }

     componentDidMount = () => {
         let {dispatch,group_details} = this.props;
         dispatch(getGroupPhotos(group_details.group_id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
         let {loading} = this.state;
         let {group_details:{name},photos} = this.props;
         let len = photos.length;

         return (
             <div>
                 <Title value={`${name} group's gallery`} />

                 <FadeIn duration="300ms">
                     <IsLoading loading={loading} />

                     <div className={classNames('wrapper_s','photos_s',cLoading(loading))}>
                         <GroupPhotos />
                     </div>

                     {!loading && len !== 0 && <End />}
                 </FadeIn>
             </div>
         )
     }
 }

 const mapStateToProps = state => ({
     group_details: state.Group.group_details,
     photos: state.Post.photos
 })

 export default connect(mapStateToProps)(GroupGallery)
 export {GroupGallery as PureGroupGallery}





















