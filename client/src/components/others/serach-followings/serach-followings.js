 import React,{Component} from 'react';
 import {post} from 'axios';
 import {uniqBy} from 'lodash';
 import d from '../../../utils/api/Dom';
 import TextInput from '../input/text';
 import MapSearchForFollowingsUsers from './map-users';
 import {string,bool,func,oneOf} from 'prop-types';

  class SearchFollowings extends Component {
      state = {
          value: '',
          data: [],
          followings: [],
          selected: []
        }
 
     componentDidMount = async () => {
         new d('.p_add_taggings_text').focus();
         let {data} = await post('/api/serach-followings')
         await this.setState({data})
     }   

     getFollowings = async e => {
         let value = e.target.value.trim(),
             {data} = this.state,
              ff = !value ? [] : data.filter(d => d.follow_to_username.toLowerCase().includes(value));

        await this.setState({
            value,
            followings: ff
        })      
     }

     selectUser = (user,username) => {
            let {selected} = this.state,
               {when,done} = this.props;

           selected.unshift({user,username});
           this.setState({
               selected,
               value: '',
               followings: []
           })    

          new d('.p_add_taggings_text').focus()
          let f_users = uniqBy(selected,'username');
          this.setState({ selected: f_users })

          // eslint-disable indent(a space left by indenting a line or block of text) 
          if(when === 'tag'){
               done(f_users);
           } else if(when === 'add_grp_members'){
               done(user);
           } else if(when === 'new_con'){
              done(user,username);
          }    
     }
     

     render(){
         let {value,followings} = this.state;
         let {placeholder,disabled} = this.props;

        return (
            <div className="search_followings">
                <div className="p_add_taggings">
                    <TextInput
                        className="p_add_taggings_text"
                        placeholder={placeholder}
                        disabled={disabled}
                        value={value}
                        valueChange={this.getFollowings}
                    />
                </div>

                <MapSearchForFollowingsUsers
                       followings={followings}
                       selectUser={this.selectUser}
                />
            </div>
        ) 
     }   
  }

  SearchFollowings.defaultProps = {
      placeholder: 'Search',
      disabled: false
  }

  SearchFollowings.propTypes = {
      when: oneOf(['tag','add_grp_members','new_con']).isRequired,
      done: func.isRequired,
      placeholder: string,
      disabled: bool
  }

  export default SearchFollowings;