 import React,{Fragment} from 'react';
 import {humanReadable} from '../../../../utils/utils';
 import AppLink from '../../../others/link/link';
 import {number,string,func} from 'prop-types';

 const GroupSearch = props => {
     let {group_id,name,membersCount,mutualMembersCount,clicked} = props;

     return (
        <div className="s_d_peo" onClick={clicked}>
            <AppLink url={`/group/${group_id}`} className="s_d_p">
                <Fragment>
                    <img src={`/groups/${group_id}/avatar.jpg`} />
                    <div className="s_d_c">
                       <span className="s_d_username">{name}</span>
                       <span>{mutualMembersCount === 0 ? humanReadable(membersCount,'member') : humanReadable(mutualMembersCount,'mutual member')}</span>
                    </div>
                </Fragment>
            </AppLink>
        </div>
     )
 }

 GroupSearch.propTypes = {
     group_id: number.isRequired,
     name: string.isRequired,
     membersCount: number.isRequired,
     mutualMembersCount: number.isRequired,
     clicked: func.isRequired
 }

 export default GroupSearch;