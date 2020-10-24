 import React,{Component} from 'react'
 import {connect} from 'react-redux';
 import ToolTip from 'react-tooltip';
 import {getSuggestedUsers} from '../../../actions/explore';
 import {cLoading} from '../../../utils/utils';
 import SuggestedList from './suggested-list';
 import IsLoading from '../isLoading';
 import AppLink from '../link/link';
 import FAIcon from '../icons/font-awesome-icon';
 import {string,oneOf} from 'prop-types';
 
 class Suggested extends Component {
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })

     componentDidMount = () => {
     // params: if user is on a profile of eg. noddy, then noddy won't appear on suggestions
        let {dispatch,params} = this.props;
        dispatch(getSuggestedUsers(params))   
     }

     updateUsers = e => {
         e.preventDefault();
         let {dispatch,params} = this.props;
         dispatch(getSuggestedUsers(params))
     }

     render(){
         let {loading} = this.state;
         let {suggested,when} = this.props;
         let len = suggested.lengthl
         let map_suggested = suggested.map(s => (
             <SuggestedList key={s.id} {...s} when={when} />
         ))

         return (
              <div>
                  <div className="recomm">
                     <div className="recomm_top">
                         <span>Suggested</span>
                         <a href="#" className="recomm_refresh" onClick={this.updateUsers} data-tip="refresh">
                             <FAIcon icon="sync-alt" />    
                         </a> 
                         <AppLink url="/explore" className="recomm_all" data-tip="view all">
                             <FAIcon icon="chevron-right" />
                         </AppLink>
                     </div>

                     <div className="recomm_main" style={{ height: loading ? 100 : 'inherit'}}>
                         <IsLoading loading={loading} />

                         <div className={cLoading(loading)}>
                             {len != 0 ? map_suggested : null}
                         </div>
                     </div>
                  </div>

                  <ToolTip />
              </div>
         )
     }
 }

 Suggested.propTypes = {
   params: string,
   when: oneOf(['profile','home'])
 }

 const mapStateToProps = state => ({
     suggested: state.Explore.suggested
 })

 export default connect(mapStateToProps)(Suggested)