 import React,{Component} from 'react';
 import {Redirect} from 'react-router-dom';
 import {FadeIn} from 'animate-components';
 import CreateGroupActions from './create-group-actions';
 import {createGroup} from '../../../utils/group-utils';
 import ModalHeader from '../../others/modal/modal-header';
 import AddEmojis from '../../others/emojis/add-emojis';
 import Overlay from '../../others/overlay';
 import TextArea from '../../others/input/textArea';
 import TextInput from '../../others/input/text';
 import {func} from 'prop-types';
 
  class CreateGroupModal extends Component{
      state = {
          name: '',
          bio: '',
          created: false,
          groupId: null
      }

      valueChange = (what,{target: {value}}) => this.setState({ [what]: value})

      create = async event => {
          event.preventDefault();
          let {name,bio} = this.state;
          let created = groupId => {
              this.setState({
                  groupId,
                  created: true
              })
            }

         createGroup({ name,bio,created})   
      }

      render(){
          let {bio,name,created,groupId} = this.state;
          let {back} = this.props;

          return (
              <div>
                  <Overlay />

                  <div className="create-group_modal">
                      <FadeIn duartion="300ms">
                          <ModalHeader title="Create group" />

                          <div className="c_g_middle modal_middle">
                              <div>
                                  <span>Name your group</span>
                                  <TextInput
                                     placeholder="Name ..."
                                     value={name}
                                     valueChange={e => this.valueChange('name',e)}
                                  />
                              </div>

                              <div>
                                  <span>Add bio to your group</span>
                                  <TextArea
                                      className="c_g_textarea"
                                      placeholder="Bio ..."
                                      value={bio}
                                      valueChange={e => this.valueChange('bio',e)}
                                  />
                              </div>
                          </div>

                          <div className="e_p_bottom modal_bottom">
                              <AddEmojis
                                 position={{ top: 60, left: -217}}
                                 textArea=".c_g_textarea"
                                 updateTextArea={e => this.setState({ bio: e.target.value })}
                                 recenterEmojis
                              />

                              <CreateGroupActions
                                 back={back}
                                 create={this.create}
                                 name={name}
                              />
                          </div>
                      </FadeIn>
                  </div>

                  {created && <Redirect to={`/group/${groupId}`} />}
              </div>
          )
      }
  }

  CreateGroupModal.propTypes = {
      back: func.isRequired
  }

  export default CreateGroupModal;
























































































