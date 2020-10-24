 import React,{Component,Fragment} from 'react';
 import HeaderLogo from './logo';
 import HeaderTopLinks from './topLinks';
 import HeaderOptions from './header-options';
 import Search from '../search/search';
 import MaterialIcon from '../icons/font-awesome-icon';
 
 export default class Header extends Component {
     state = { showOptions: false }

     toggleOptions = () => this.setState({ showOptions: !this.state.showOptions})

     render(){
         let {showOptions} = this.state;

         return (
             <div className="header">
                 <HeaderLogo />
                 <Search />

                 <div className="header_right">
                     <HeaderTopLinks />
                     <span className="show_more" onClick={this.toggleOptions}>
                        <MaterialIcon icon="expand_more" />
                     </span>
                 </div>

                 {showOptions ? (
                     <HeaderOptions toggleOptions={this.toggleOptions} />
                 ) : null}
             </div>
         )
     }
 }