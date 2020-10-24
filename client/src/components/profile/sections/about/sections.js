 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {timeAgo} from '../../../../utils/utilMethods/handyTimeAgo';
 import AboutSection from './section';

 const AboutSections = ({user_details}) => {
     let {username,firstname,surname,email,bio,instagram,github,twitter,facebook,website,phone,joined} = user_details;

     return (
            <Fragment>
                <AboutSection label="Username" value={username} />
                <AboutSection label="Name" value={`${firstname} ${surname}`} />
                <AboutSection label="Email" value={`${email}`} />
                <AboutSection label="Bio" value={bio} />
                <AboutSection label="Instagram" value={instagram} isLink />
                <AboutSection label="Facebook" value={facebook} isLink />
                <AboutSection label="Twitter" value={twitter} isLink />
                <AboutSection label="Github" value={github} isLink />
                <AboutSection label="Website" value={website} isLink />
                <AboutSection label="Phone" value={phone} />
                <AboutSection label="Joined" value={`${timeAgo(joined)}`} />
            </Fragment>
        )  
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(AboutSections)
