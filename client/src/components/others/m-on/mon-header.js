import React,{Fragment} from 'react';
import {humanReadable} from '../../../utils/utils';
import {number,string} from 'prop-types';

 const MonHeader = ({len,forWhat}) => (
     <Fragment>
        (len != 0 ? (
            <div className="m_header">
                <span>
                    {forWhat === 'puk' ? `${humanReadable(len,'follower')} you might know` : humanReadable(len,forWhat)}
                </span>
            </div>
        ))
     </Fragment>
 )

 MonHeader.propTypes = {
     len: number.isRequired,
     forWhat: string.isRequired
 }

 export default MonHeader;