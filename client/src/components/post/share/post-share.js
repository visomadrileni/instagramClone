 import React,{Component,Fragment} from 'react'
 import Share from './share/share';
 import MaterialIcon from '../../others/icons/material-icon';
 import {number,func,shape} from 'prop-types';

 export default class PostShare extends Component{
     state = { showShare: false }

     _toggle = what => this.setState({ [what]: !this.state[what]})

    render(){
        let {showShare} = this.state;
        let {postDetails:{post_id,user},incrementWhat,decrementWhat} = this.props;

        return (
            <Fragment>
                <div className="p_send_wra">
                    <span className="p_send" onClick={() => this._toggle('showShare')} data-tip="Share">
                        <MaterialIcon icon="send" />
                    </span>
                </div>

                {showShare && (
                    <Share
                       post={post_id}
                       back={() => this._toggle('showShare')}
                       postOwner={user}
                       incrementShares={() => incrementWhat('shares_count')}
                       decrementShares={() => decrementWhat('shares_count')}
                    />
                )}
            </Fragment>
        )
    } 
 }

 PostShare.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         user: number.isRequired
        }).isRequired,
     incrementWhat: func.isRequired,
     decrementWhat: func.isRequired   
 }