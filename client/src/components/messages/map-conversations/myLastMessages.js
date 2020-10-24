 import React,{Fragment} from 'react';
 import {Me} from '../../../utils/utils';
 import MaterialIcon from '../../others/icons/material-icon';
 import {number,string,oneOfType} from 'prop-types';

 const MyLastMessage = ({ lastMessageBy}) => (
    <Fragment>
        {Me(lastMessageBy) && (
            <span className="mssg_sent">
                <MaterialIcon icon="done_all" />
            </span>
        )}
    </Fragment>
 )

 MyLastMessage.propTypes = {
     lastMessageBy: oneOfType([number,string])
 }

 export default MyLastMessage;