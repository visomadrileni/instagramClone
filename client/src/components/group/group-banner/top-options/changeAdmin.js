 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../utils/utils';
 import SwapAdmin from '../../change-admin/change-admin';
 
 class ChangeAdmin extends Component{
     state = { change: false }

     showChangeAdmin = e => {
         e.preventDefault();
         this.setState({ change: !this.state.change})
     }

     modalBack = () => {
         this.setState({ change: false})
         this.props.toggleOptions()
     }

     render(){
         let {group_details: {admin,group_id}} = this.props;
         let {change} = this.state;

         return (
             <Fragment>
                 {Me(admin) && (
                     <li>
                         <a href="#" className="p_copy_link" onClick={this.showChangeAdmin}>
                             Transfer admin position
                         </a>
                     </li>
                 )}

                 {change && <SwapAdmin back={this.modalBack} group={group_id} />}
             </Fragment>
         )
     }
 }

 const mapStateToProps = state => ({
     group_details: state.Group.group_details
 })

 export default connect(mapStateToProps)(ChangeAdmin)
 export {ChangeAdmin as PureChangeAdmin}




























