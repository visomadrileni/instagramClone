import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import PhotoGallery from 'react-photo-gallery';
import {Me} from '../../../../utils/utils';
import Nothing from '../../../others/nothing';
import ImageTheater from '../../../others/imageTheater/ImageTheater';

class UserPhotos extends Component {
    state = {
        showImage: false,
        imgSrc: '',
        filter: '',
        username:'',
        time: '',
        link: ''
    }

    selectPhoto = (e,{photo}) => {
        let {src,filter,username,post_time,post_id} = photo;
        this.setState({
            showImage: true,
            imgSrc:src,
            filter,
            username,
            time: post_time,
            link: `/post/${post_id}`
        })
    }

    render(){
        const {showImage,imgSrc,filter,username,time,link} = this.state;
        const {photos,user_details} = this.props;
        const len = photos.length;
        const photosSet = [];

        for (let f of photos){
            photosSet.push({
                ...f,
                src: `/posts/${f.imgSrc}`,
                width: 15,
                height: 15,
                className: `g_photo ${f.filter}`
            })
        }

        return (
            <Fragment>
                {len === 0 ? (
                    <Nothing message={Me(user_details.id) ? 'You have no photos' : `${user_details.username} has no photos`} />
                 ) : (
                    <PhotoGallery photos={photosSet} columns={4} margin={7} onClick={this.selectPhoto} />
                )}

                {showImage && (
                    <ImageTheater imgSrc={imgSrc} filter={filter} username={user_details.username} time={time} link={link} back={() => this.setState({ showImage: false })} />
                )}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    photos: state.Post.photos,
    user_details: state.User.user_details
})

export default connect(mapStateToProps)(UserPhotos)
export {UserPhotos as PureUserPhotos}