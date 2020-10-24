import React,{Component} from 'react';
import {connect} from 'react-redux';
import PostIt from './post-it';
import {number,bool,oneOf} from 'prop-types';

 class PostItTeaser extends Component {
     state = { postIt: false }

     togglePostIt = e => {
         e.preventDefault();
         this.setState({ postIt: !this.state.postIt})
     }

     render(){
         let {postIt} = this.state;
         let {type,group,disabled,session:{id,username}} = this.props;

         return (
              <div>
                  <div className="post_it inst" style={{ marginBottom: type === 'group' && 10 }}>
                      <img src={`/users/${id}/avatar.jpg`} alt="Your avatar" />

                      <div className="post_teaser">
                          <span className="p_whats_new" onClick={disabled ? null : this.togglePostIt}>
                              What's new with you,@{username}? #cool
                          </span>
                      </div>
                  </div>

                  {postIt && (
                      <PostIt
                          back={this.togglePostIt}
                          type={type}
                          group={group}
                      />
                  )}
              </div>
         )
     }
 } 

 PostItTeaser.defaultProp = {
     disabled: false
 }

 PostItTeaser.propTypes = {
    type: oneOf(['user','group']).isRequired,
    disabled: bool,
    group: number
 }

 const mapStateToProps = state => ({
     session: state.User.session
 })

 export default connect(mapStateToProps)(PostItTeaser)
 export {PostItTeaser as PurePostItTeaser}