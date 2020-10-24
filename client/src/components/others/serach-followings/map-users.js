 import React,{Fragment} from 'react';
 import {FadeIn} from 'animate-components';
 import {number,string,arrayOf,shape, func} from 'prop-types';

 const MapSearchForFollowingsUsers = ({ followings,selectUser}) => {
    let map_followings = followings.map(f => (
        <li className="tag_hmm" key={f.follow_to} onClick={() => selectUser(f.follow_to,f.follow_to_username)}>
            <img src={`/users/${f.follow_to}/avatar.jpg`} />
            <span>{f.follow_to_username}</span>
        </li>
    ))

    return (
        <Fragment>
            {followings.length > 0 ? (
                <div className="p_tagging_list">
                    <div className="p_tagging_wrapper">
                        <ul className="p_tagging_ul">
                            <FadeIn duaration="200ms">{map_followings}</FadeIn>
                        </ul>
                    </div>
                </div>
            ) : null}
        </Fragment>
    )
 }

 MapSearchForFollowingsUsers.propTypes = {
     followings: arrayOf(shape({
         follow_to: number,
         follow_to_username: string
        })).isRequired,
     selectUser: func.isRequired   
 }

 export default MapSearchForFollowingsUsers;



















