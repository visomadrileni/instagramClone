 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {FadeIn} from 'animate-components';
 import {cLoading} from '../../../utils/utils';
 import {getPhotosToExplore} from '../../../actions/explore';
 import Title from '../../others/title';
 import IsLoading from '../../others/isLoading';
 import ExplorePhotoGallery from './photo-gallery';

  class ExpPhotos extends Component {
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })
     componentDidMount = () => this.props.dispatch(getPhotosToExplore())

     render(){
         let {loading} = this.state;

         return (
            <div>
                <Title value="Explore photos" />

                <FadeIn duration="300ms">
                    <IsLoading loading={loading} />

                    <div className={classNames('m_div','explore_photos',cLoading(loading))}>
                        <ExplorePhotoGallery />
                    </div>
                </FadeIn>
            </div>
         )
     }
  }

  export default connect()(ExpPhotos);
  export {ExpPhotos as PureExpPhotos}
























































































