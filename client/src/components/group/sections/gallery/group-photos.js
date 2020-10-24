 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import PhotoGallery from 'react-photo-gallery';
 import Nothing from '../../../others/nothing';
 import ImageTheatre from '../../../others/imageTheater/ImageTheater';
 
 class GroupPhotos extends Component{
     state = {
         showImage: false,
         imgSrc: '',
         filter: '',
         username: '',
         time: '',
         link: ''
      }

    selectPhoto = (e,{photo}) => {
        let {src,filter,username,post_time,post_id} = photo;
        this.setState({
            imgSrc: src,
            filter,
            username,
            time: post_time,
            link: `/post/${post_id}`,
            showImage: true
        })
    }

    render(){
        let {showImage,imgSrc,filter,username,time,link} = this.state;
        let {photos,group_details:{name}} = this.props;
        let len = photos.length;
        let photo_set = []

        for(let p of photos){
            photo_set.push({
                ...p,
                src: `/posts/${p.imgsrc}`,
                width: 15,
                height: 15,
                className: `g_photo ${p.filter}`
            })
        }

        return (
            <Fragment>
                {len == 0 ? (
                    <Nothing message={`${name} group has no photos`} />
                ) : (
                    <PhotoGallery
                       photos={photo_set}
                       columns={4}
                       margin={7}
                       onClick={this.selectPhoto}
                    />
                )}

                {showImage && (
                    <ImageTheatre
                       imgSrc={imgSrc}
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
     group_details: state.Group.group_details,
     photos: state.Post.photos
 })

 export default connect(mapStateToProps)(GroupPhotos);
 export {GroupPhotos as PureGroupPhotos}