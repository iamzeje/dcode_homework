import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

import 'swiper/css/swiper.css';
import './SwiperView.scss';

const params = {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  spaceBetween: 30,
};

export default class SwiperView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <Swiper {...params}>{this.props.children}</Swiper>;
  }
}
