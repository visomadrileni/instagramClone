 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {Me,bottomScroll} from '../../../../utils/utils';
 import Favourite from './favourite/favourite';
 import Title from '../../../others/title';
 import MonEnd from '../../../others/m-on/mon-end';
 import MonHeader from '../../../others/m-on/mon-header';
 import {string} from 'prop-types';

 class Favourites extends Component {
     componentDidMount = () => bottomScroll()

     render(){
          let {favourites,param:username,user_details:{id}} = this.props;
          let len = favourites.lengthl
          let map_favourites = favourites.map(f => <Favourite key={f.fav_id} {...f} />)

          return (
              <div>
                  <Title value={`@${username}'s favourites`} />
                  <FadeIn duration="300ms">
                      <div className="wrapper_s pro_s">
                          <div className={classNames({m_div: len !== 0,m_no_div: len === 0})}>
                              <MonHeader len={len} forWhat={'favourite'} />
                              <div className="m_wrapper">{len !== 0 && map_favourites}</div>
                          </div>
                       </div>

                      <MonEnd len={len} nothingMssg={Me(id) ? 'You have no favourites' : `${username} have no favourites`} />
                  </FadeIn> 
              </div>
          )
     }
 }

 Favourites.propTypes = {
     param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     favourites: state.Follow.favourites
 })

 export default connect(mapStateToProps)(Favourites)
 export {Favourites as PureFavourites}