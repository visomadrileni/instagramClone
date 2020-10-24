 import React,{Component} from 'react';
 import classNames from 'classnames';
 import PostTags from './post-tags';
 import ToTags from '../../../hashtag/toTags/toTags';
 import ImageTheatre from '../../../others/imageTheater/ImageTheater';
 import {number,string,shape} from 'prop-types';

 export default class PostImage extends Component {
     state = { showImage: false }

     _toggle = what => this.setState({ showImage: !this.state[what]})

     render(){
         let {showImage} = this.state;
         let {postDetails:{post_id,post_time,description,imgSrc,filter,username,tags_count}} = this.props;

         return (
            <div>
                <div className="p_o">
                    <div className="p_actual" spellcheck="false">
                       <div className="p_abt" style={{ marginBottom: description ? '10px' : null}}>
                           <p>
                               <ToTags str={`${description}`} />
                           </p>
                       </div>

                       <img src={`/posts/${imgSrc}`} className={classNames('p_img',filter)} onClick={() => this._toggle('showImage')} />
                       <PostTags post_id={post_id} tags_count={tags_count} />
                    </div>
                </div>

                {showImage && (
                    <ImageTheatre
                       imgSrc={`/posts/${imgSrc}`}
                       filter={filter}
                       username={username}
                       time={post_time}
                       link={`/post/${post_id}`}
                       back={() => this._toggle('showImage')}
                    />
                )}
            </div>
         )
     }
 }  

 PostImage.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         post_time: string.isRequired,
         description: string.isRequired,
         imgSrc: string.isRequired,
         filter: string.isRequired,
         tags_count: number.isRequired,
         username: string.isRequired
        }).isRequired
 }