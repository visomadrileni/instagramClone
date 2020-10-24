 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import SocialIconLink from './social-icon-link';

 const SocialIcons = ({user_details}) => {
    let {instagram,github,twitter,facebook,website} = user_details;

    return (
        <Fragment>
            {(instagram || facebook || twitter || github || website) && (
                <div className="social_div_inst">
                    <SocialIconLink value={instagram} label="instagram" />
                    <SocialIconLink value={facebook} label="facebook" />
                    <SocialIconLink value={twitter} label="twitter" />
                    <SocialIconLink value={github} label="github" />
                    <SocialIconLink value={website} label="globe" />
                </div>
            )} 
        </Fragment>
    )
 } 

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(SocialIcons);