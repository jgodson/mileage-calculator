import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getImagePath } from '../../../utilities';
import Tooltip from './tooltip';
import './vehicleCard.css';

const AVAILABLE_ICONS = [
  'car1',
  'car2',
  'car3',
  'bus1',
  'bus2',
  'snowmobile',
  'truck1',
  'truck2',
];

export default class VehicleCard extends PureComponent {
  changeVehicleIcon = (iconName) => {
    return () => this.props.changeVehicleIcon(iconName);
  }

  render() {
    const {
      name,
      icon,
      changeVehicle,
      changeVehicleName,
      removeVehicle,
      deleteDisabled,
    } = this.props;

    return (
      <div className="VehicleCard" onClick={changeVehicle}>
        <div className="icon">
          <Tooltip hoverElement={<img src={getImagePath(icon)} alt="" />}>
            {AVAILABLE_ICONS.map((iconName) => (
              <button key={iconName} className="icon-button" onClick={this.changeVehicleIcon(iconName)}>
                <img className="small-icon" src={getImagePath(iconName)} alt="" />
              </button>
            ))}
          </Tooltip>
        </div>
        <div className="name">
          <Tooltip hoverElement={<h5>{name}</h5>}>
            <button onClick={changeVehicleName}>Change name</button>
            <button disabled={deleteDisabled} onClick={removeVehicle}>Delete</button>
          </Tooltip>
        </div>
      </div>
    );
  }

  static propTypes = {
    deleteDisabled: PropTypes.bool.isRequired,
    changeVehicle: PropTypes.func.isRequired,
    removeVehicle: PropTypes.func.isRequired,
    changeVehicleName: PropTypes.func.isRequired,
    changeVehicleIcon: PropTypes.func.isRequired,
  }
}
