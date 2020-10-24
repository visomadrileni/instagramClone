 import React,{Component,Fragment} from 'react';
 import ImageTheatre from '../../../others/imageTheater/ImageTheater';
 import {string} from 'prop-types';

 export default class CommentTypeImage extends Component{
    state = { openImage: false }

    toggleImage = () => this.setState({ openImage: !this.state.openImage})

    render(){
        let {openImage} = this.state;
        let {commentSrc} = this.props;

        return (
            <Fragment>
                <img className="comment_img" onClick={() => this.setState({ openImage: true })} src={`/comments/${commentSrc}`} />

                {openImage && (
                  <ImageTheatre
                     imgSrc={`/comments/${commentSrc}`}
                     showInfo={false}
                     back={() => this.setState({ openImage: false })}
                  />
                )}
            </Fragment>
        )
    }
 }

 CommentTypeImage.propTypes = {
     commentSrc: string.isRequired
 }