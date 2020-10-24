 import React, { Fragment } from 'react';
 import End from './end';
 import {number,bool} from 'prop-types';

 const SectionsEnd = ({len,loading}) => (
     <Fragment>
        {loading === 'undefined' ? (
            len !== 0 ? (
                <End />
            ) : null
        ) : len !== 0 && !loading ? (
            <End />
        ) : null }
     </Fragment>
 )

 SectionsEnd.propTypes = {
     len: number.isRequired,
     loading: bool.isRequired
 }

 export default SectionsEnd;