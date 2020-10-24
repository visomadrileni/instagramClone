 import React from 'react';
 import UserSearch from './user-search';
 import GroupSearch from './group-search';
 import HashtagSearch from './hashtag-search';
 import SearchSection from './section';
 import {func,array} from 'prop-types';

 const MapSearch = ({users,groups,hashtags,clicked}) => {
     let map_users = users.map(u => <UserSearch key={u.id} clicked={clicked} />)
     let map_groups = groups.map(g => <GroupSearch key={g.group_id} {...g} clicked={clicked} />)
     let map_hashtags = hashtags.map(h => <HashtagSearch key={h.hashtag} {...h} clicked={clicked} />)

     return (
         <div className="search_div">
             <SearchSection searchList={map_users} listFor="member" />
             <SearchSection searchList={map_groups} listFor="group" />
             <SearchSection searchList={map_hashtags} listFor="hashtag" />
         </div>
     )
 }

 MapSearch.propTypes = {
     users: array.isRequired,
     groups: array.isRequired,
     hashtags: array.isRequired,
     clicked: func.isRequired
 }

 export default MapSearch;