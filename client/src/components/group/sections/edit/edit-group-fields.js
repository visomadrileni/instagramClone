 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../utils/utils';
 import {isAdmin} from '../../../../utils/admin-utils';
 import TextInput from '../../../others/input/text';
 import TextArea from '../../../others/input/textArea';
 import CheckBox from '../../../others/input/checkbox';
 import {shape,string,bool,func} from 'prop-types';

  const EditGroupFields = ({fields,changeValue,admin}) => {
        let disabled = !Me(admin) && !isAdmin()
        let {name,bio,isPrivate} = fields;

        return (
            <Fragment>
                <div className="g_e_name">
                    <span className="g_e_span">Group Name</span>
                    <TextInput
                        placeholder="group name ..."
                        disabled={disabled}
                        value={name}
                        valueChange={e => changeValue('name',e)}
                    />
                </div>

                <div className="g_e_bio">
                    <span className="g_e_span">Group bio</span>
                    <TextArea
                       placeholder="group bio ..."
                       value={bio}
                       valueChange={e => changeValue('bio',e)}
                       disabled={disabled}
                       className="gen_bio"
                    />
                </div>

                <div className="g_e_pri">
                    <CheckBox
                        label="private group"
                        disabled={disabled}
                        checked={isPrivate}
                        changeValue={e => changeValue('isPrivate',e)}
                    />

                    <span className="g_e_p_info">
                         Private: Only members can interact with group
                    </span>
                </div>
            </Fragment>
        )
  }

  EditGroupFields.propTypes = {
      fields: shape({
          name: string.isRequired,
          bio: string.isRequired,
          isPrivate: bool.isRequired
          }).isRequired,
       changeValue: func.isRequired   
  }

  const mapStateToProps = state => ({
      admin: state.Group.group_details.admin
  })

  export default connect(mapStateToProps)(EditGroupFields)
  export {EditGroupFields as PureEditGroupFields}










