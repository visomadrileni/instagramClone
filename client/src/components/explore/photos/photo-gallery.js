 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import Gallery from 'react-photo-gallery';
 import Nothing from '../../others/nothing';
 import ImageTheater from '../../others/imageTheater/ImageTheater'

 class ExplorePhotoGallery extends Component {
   state = {
       showImage: false,
       src: '',
       filter: '',
       username: '',
       time: '',
       link: ''
     };

     selectPhoto = (e,{photo}) => {
         let {src,filter,username,post_time,post_id} = photo;
         this.setState({
             src,
             filter,
             username,
             time: post_time,
             link: `/post/${post_id}`,
             showImage: true
         })
     }

     render(){
         let {showImage,src,filter,username,time,link} = this.state;
         let {photos} = this.props
         let len = photos.length
         let photo_set = []

         for(let f of photos){
             photo_set.push({
                 ...f,
                 src: `/posts/${f.imgsrc}`,
                 height: 15,
                 width: 15,
                 className: `${f.filter}`
             })
         }

         return (
             <Fragment>
                 <div className="m_wrapper" style={{ width: len === 0 ? 500 : null}}>
                     {len === 0 ? (
                         <Nothing message="Sorry,no photos to explore" />
                     ) : (
                        <Gallery 
                           photos={photo_set}
                           columns={4}
                           margin={7}
                           onClick={this.selectPhoto}
                        />
                     )}
                 </div>

                 {showImage && (
                    <ImageTheater
                        imgSrc={src}
                        filter={filter}
                        username={username}
                        time={time}
                        link={link}
                        back={() => this.setState({ showImage: false})}
                    />
                 )}
             </Fragment>
         )
     }
 }

 const mapStateToProps = state => ({
     photos: state.Explore.photos
 })

  export default connect(mapStateToProps)(ExplorePhotoGallery);
  export {ExplorePhotoGallery as PureExplorePhotoGallery}






























