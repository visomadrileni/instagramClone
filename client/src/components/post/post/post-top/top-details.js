import React,{Fragment} from 'react';
import {shortener} from '../../../../utils/utils';
import AppLink from '../../../others/link/link';
import MaterialIcon from '../../../others/icons/material-icon';
import {number,string,shape} from 'prop-types';

const PostTopDetails = ({details}) => {
    let {user,username,firstname,surname,group_id,group_name,type,location} = details;

    return (
        <Fragment>
            <div className="p_i_img">
                <img src={`/users/${user}/avatar.jpg`} />
            </div>

            <div className="p_i_1" style={{top: type === 'group' ? -8 : 'inherit'}}>
                <AppLink url={`/profile/${username}`} title={username} label={username} />
                {type === 'group' && (
                   <div className="its_grp_post">
                       <span className="to_grp_post">
                           <MaterialIcon icon="arrow_drop_up" />
                       </span>
                       <AppLink
                          url={`/group/${group_id}`}
                          className="to_grp_name"
                          label={group_name}
                       />
                   </div>
                )}

                <span className="p_i_1_title" title={location ? location : null}>
                   {location ? shortener(location,35) : `${firstname} ${surname}`}
                </span>
            </div>
        </Fragment>
    )
}

PostTopDetails.propTypes = {
    details: shape({
        user: number.isRequired,
        username: string.isRequired,
        firstname: string.isRequired,
        surname: string.isRequired,
        group_id: number,
        group_name: string,
        type: string.isRequired,
        location: string.isRequired
      }).isRequired
}

export default PostTopDetails;