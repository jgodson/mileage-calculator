import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './tooltip.css';

export default class Vehicles extends PureComponent {
  render() {
    const {children, hoverElement} = this.props;

    return (
      <div className="Tooltip">
        {hoverElement}
        <div className="tooltiptext">{children}</div>
      </div>
    );
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,
    hoverElement: PropTypes.element.isRequired,
  }
}
