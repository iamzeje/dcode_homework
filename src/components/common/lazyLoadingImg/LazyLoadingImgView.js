import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './LazyLoadingImgView.scss';

export default class LazyLoadingImgView extends Component {
  static propTypes = {
    img: PropTypes.object,
  };

  render() {
    return (
      <LazyLoadImage
        alt={this.props.img.alt}
        src={this.props.img.src} // use normal <img> attributes as props
        width={this.props.img.width}
        height={this.props.img.height}
        effect="blur"
      />
    );
  }
}
