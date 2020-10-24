 import React,{Component,Fragment} from 'react';
 import {post} from 'axios';
 import * as PostUtils from '../../../utils/post-utils';
 import MaterialIcon from '../../others/icons/material-icon'
 import {number,func,shape} from 'prop-types';

 export default class PostLike extends Component {
    state = { liked: false }

    componentDidMount = async () => {
        let {postDetails:{post_id}} = this.props;
        let {data: liked} = await post('/api/liked-or-not',{post_id})
        await this.setState({ liked })
    }

    like = async () => {
        let {postDetails: {post_id,user}, incrementWhat} = this.props;
        PostUtils.like({
             post_id,
             user,
             done: () => {
                 this.setState({ liked: true })
                 incrementWhat('likes_count')
             }
        })
    }

    unlike = async () => {
        let {postDetails: {post_id,decrementWhat}} = this.props;
        PostUtils.unlike({
            post_id,
            done: () => {
                this.setState({ liked: false })
                decrementWhat('likes_count')
            }
        })
    }

    render(){
        let {liked} = this.state;

        return (
            <Fragment>
                <div className="p_like_wra">
                    {liked ? (
                        <span className="p_like p_unlike_icon" data-tip="Unlike" onClick={this.unlike}>
                            <MaterialIcon icon="favourite" />
                        </span>
                    ) : (
                        <span className="p_like p_like_icon" onClick={this.like} data-tip="Like">
                            <MaterialIcon icon="favourite_border" />
                        </span>
                    )}
                </div>
            </Fragment>
        )
    }
 }

 PostLike.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         user: number.isRequired
        }).isRequired,
     incrementWhat: func.isRequired,
     decrementWhat: func.isRequired    
 }