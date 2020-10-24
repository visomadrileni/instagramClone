import React,{Component,Fragment} from 'react';
import {post} from 'axios';
import {Scrollbars} from 'react-custom-scrollbars';
import {FadeIn} from 'animate-components';
import classNames from 'classnames';
import {cLoading} from '../../../utils/utils';
import d from '../../../utils/api/Dom';
import MapStickers from './map-stickers';
import IsLoading from '../isLoading';
import Overlay from '../overlay';
import PrimaryButton from '../../others/button/primary-button';
import ModalHeader from '../modal/modal-header';
import ModalBack from '../modal/modal-back';
import {func} from 'prop-types';


export default class Stickers extends Component {
    state = {
        stickers: [],
        loading: true,
        selectedSticker: ''
       }

    componentDidMount = async () => {
      let {data: stickers} = await post('/api/get-stickers')
      this.setState({
          stickers,
          loading: false
      })
    }  
    
    selectSticker = e => {
        let sticker = new d(`[data-sticker="sticker-${e}]`)
        let siblings = new d('/sti_img')

        siblings.removeClass('sti_img_active');
        sticker.addClass('sti_img_active')
        new d('.btn_select_sticker').focus()

        this.setState({ selectedSticker: e })
    }

    chooseSticker = e => {
        e.preventDefault()
        new d('.btn_select_sticker').addClass('a_disabled');

        let {selectedSticker} = this.state;
        let {back,stickerSelected} = this.back;
        stickerSelected(selectedSticker);
        back()
    }

    render(){
        let {loading,stickers} = this.state;
        let {back,disabled} = this.props;

        return (
            <Fragment>
                <Overlay />

                <div className="stickers_modal modal modal_big">
                    <FadeIn duration="300ms">
                        <ModalHeader title="Choose a sticker" />

                        <Scrollbars style={{ height: 450 }} className="modal_middle">
                            <IsLoading loading={loading} />

                            <div className={classNames('modal_main',cLoading(loading))} >
                                <MapStickers stickers={stickers} selectSticker={this.selectSticker} />
                            </div>
                        </Scrollbars>

                        <div className="modal_bottom">
                            <ModalBack back={back} btnType="secondary" />
                            <PrimaryButton
                                  label="Choose"
                                  onClick={this.chooseSticker}
                                  extraClass="btn_select_sticker"
                                  disabled={disabled}
                            />
                        </div>
                    </FadeIn>
                </div>
            </Fragment>
        )
    }
}

Stickers.propTypes = {
   back: func.isRequired,
   stickerSelected: func.isRequired
}