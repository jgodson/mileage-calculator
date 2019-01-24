import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VehicleCard from './components/vehicleCard';
import './vehicles.css';

export default class Vehicles extends PureComponent {
  setVehicle = (vehicle) => {
    return () => this.props.setVehicle(vehicle);
  }

  addVehicle = () => {
    const name = window.prompt("Name?");

    if (name === null) {
      return;
    }

    this.props.addVehicle({
      name,
      icon: 'car1',
      id: Math.floor(Math.random() * 100 * this.props.vehicles.length)
    });
  }

  removeVehicle = (index) => {
    return () => {
      if (window.confirm("Are you sure? This will permanently delete all entries for this vehicle.")) {
        this.props.removeVehicle(index);
      }
    }
  }

  changeVehicleName = (index) => {
    return (name) => {
      const newName = prompt("New name?");

      if (newName === null) {
        return;
      }

      this.props.changeVehicleName({index, name: newName});
    }
  }

  changeVehicleIcon = (index) => {
    return (icon) => this.props.changeVehicleIcon({index, icon});
  }

  renderVehicles = () => {
    return this.props.vehicles.map((vehicle, index) => {
      return (
        <VehicleCard
          deleteDisabled={this.props.vehicles.length === 1}
          name={vehicle.name}
          icon={vehicle.icon}
          key={vehicle.id}
          changeVehicle={this.setVehicle(vehicle)}
          removeVehicle={this.removeVehicle(index)}
          changeVehicleName={this.changeVehicleName(index)}
          changeVehicleIcon={this.changeVehicleIcon(index)}
        />
      );
    });
  }

  render() {
    return (
      <div className="Vehicles">
        <h4>Vehicles</h4>
        {this.renderVehicles()}
        <button className="add" onClick={this.addVehicle}>Add vehicle</button>
      </div>
    );
  }

  static propTypes = {
    addVehicle: PropTypes.func.isRequired,
    removeVehicle: PropTypes.func.isRequired,
    setVehicle: PropTypes.func.isRequired,
    changeVehicleIcon: PropTypes.func.isRequired,
    changeVehicleName: PropTypes.func.isRequired,
    vehicles: PropTypes.array.isRequired,
    vehicle: PropTypes.object.isRequired
  }
}
