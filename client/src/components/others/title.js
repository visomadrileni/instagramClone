 import React,{Component} from 'react'
 import {Helmet} from "react-helmet";
 import {connect} from 'react-redux';
 import d from  '../../utils/api/Dom';
 import {string} from 'prop-types';

  class Title extends Component  {
    componentDidMount(){
        new d('meta[data-desc-src="hbs"]').remove();
    }

    render(){
       const {value,desc,un} = this.props;
        return (
            <Helmet>
               <title>
                   {un ? `(${un})` : ''} {`${value}`} • Instagram
               </title>
                <meta name="description" content={desc} />
            </Helmet>
        )
    }
 }
 
  Title.defaultProps = {
      value: '',
      desc: 'Instagram lets you capture,follow,like and share world`s moments in a better way and tell your story with photos,message,posts and everything  in between'
  };

  Title.propTypes= {
      value: string.isRequired,
      desc: string
  }

  const mapStateToProps = state => ({
      un: state.Notification.unreadNotifications
  });

  export default connect(mapStateToProps)(Title);