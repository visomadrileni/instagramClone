import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import {Me} from '../../../../utils/utils';
import End from '../../../others/end'
import Nothing from '../../../others/nothing';
import CreateGroup from '../../../group/create-group/create-group'

const NoUserGroups = ({user_details,len}) => {
    let {id,username} = user_details;

    return (
        <Fragment>
            {len === 0 ? (
                <div className="wrapper_s">
                    <div className="wrapper_k" style={{ marginTop: -8 }}>
                        <CreateGroup />
                    </div>
                    <div className="wrapper_p">
                        <Nothing message={Me(id) ? "You're not a member of any group" : `${username} is not a member of any group`} />
                    </div>
                </div>
             ) : (
                <End />
            )}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user_details: state.User.user_details,
    len: state.Group.userGroups.length
})

export default connect(mapStateToProps)(NoUserGroups)