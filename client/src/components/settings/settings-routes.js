 import React from 'react';
 import {Switch,Route,Redirect} from 'react-router';
 import Deactivate from './sections/deactivate/deactivate';
 import ChangePassword from './sections/change-password/change-password';
 import ProfileSettings from './sections/profile-settings/profile-settings';
 import {string} from 'prop-types';

 const SettingsRoutes = ({url}) => (
     <div className="wrapper_p settings_p">
         <Switch>
             <Route exact path={`${url}`} component={ProfileSettings} />
             <Route path={`${url}/change-password`} component={ChangePassword} />
             <Route path={`${url}/deactivate`} component={Deactivate} />
             <Redirect />
         </Switch>
     </div>
 )

 SettingsRoutes.propTypes = {
     url: string.isRequired
 }

 export default SettingsRoutes;