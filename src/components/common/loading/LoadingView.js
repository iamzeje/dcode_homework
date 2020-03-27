import React, { PureComponent } from 'react';
import { DualRing } from 'react-loading-io';

import './LoadingView.scss';

export default class LoadingView extends PureComponent {
  render() {
    return (
      <div className="loading-view-container">
        <div className="loading-bar-wrap">
          <DualRing width={3} size={60} color={'#000000'} speed={1} />
        </div>
      </div>
    );
  }
}
