 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames'
 import {getPhotos} from '../../../../actions/post';
 import {bottomScroll,cLoading} from '../../../../utils/utils'
 import UserPhotos from './user-photos'
 import End from '../../../others/end'
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import {string} from 'prop-types';

 class Gallery extends Component {
     state = {loading: true}

     componentWillReceiveProps = ({user_details,dispatch}) => {
       this.setState({ loading: false });
       return this.props.user_details !== user_details ? dispatch(getPhotos(user_details.id)) : null
     } 

     componentDidMount = () => {
         let {user_details:{id},dispatch} = this.props;
         dispatch(getPhotos(id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
         let {loading} = this.state;
         let {param:{username},photos} = this.props;
         let len = photos.length;

         return (
             <div>
                 <Title value={`${username}'s gallery`} />

                 <FadeIn duration="300ms">
                     <IsLoading loading={loading} />
                     <div className={classNames('pro_s','photos_s',cLoading(loading))}>
                         <UserPhotos />
                     </div>

                     {!loading && len != 0 && <End /> }
                 </FadeIn>
             </div>
         )
     }
 }

 Gallery.propTypes = {
     param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     photos: state.Post.photos
 })

 export default connect(mapStateToProps)(Gallery)
 export {Gallery as PureGallery}