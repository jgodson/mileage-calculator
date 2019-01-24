import React, { Component } from 'react';
import {addIdToEntries} from './utilities';
import './App.css';
import Header from './components/header/header';
import NewEntryForm from './components/new-entry-form/newEntryForm';
import PastEntriesList from './components/past-entries-list/pastEntriesList';
import DataVisualizer from './components/data-visualizer/dataVisualizer';
import Vehicles from './components/vehicles/vehicles';
import Container from './components/container/container';
import Navbar from './components/navbar/navbar';

const pages = {
  newEntry: {
    text: 'New Entry',
    icon: 'new',
  },
  pastEntries: {
    text: 'Past Entries',
    icon: 'entries',
  },
  dataPage: {
    text: 'Show Data',
    icon: 'data',
  },
  vehicles: {
    text: 'Vehicles',
    icon: 'car1',
  }
}

export default class App extends Component {
  componentWillMount() {
    // Backfill existing entries with the new default vehicle
    const entries = this.retriveEntries();
    const vehicles = this.retriveVehicles();
    const vehicle = vehicles[0];

    if (entries.some((entry) => entry.vehicleId === undefined)) {
      const id = vehicle.id;
      addIdToEntries({entries, id});
    }

    pages.vehicles.icon = vehicle.icon;
    this.setState({
      entries,
      units: this.getUnits(),
      currentPage: this.getCurrentPageOrDefault(),
      vehicles,
      vehicle,
    });
  }

  componentWillUpdate(_, nextState) {
    this.syncDatabase(nextState.entries, nextState.vehicles);
  }

  syncDatabase = (newEntries, newVehicles) => {
    localStorage.setItem('entries', JSON.stringify(newEntries));
    localStorage.setItem('vehicles', JSON.stringify(newVehicles));
  }

  retriveEntries = () => {
    return JSON.parse(localStorage.getItem('entries')) || [];
  }

  retriveVehicles = () => {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [{name: 'Default', icon: 'car1', id: 1}];
    this.setVehicle(vehicles[0]);
    return vehicles;
  }

  getUnits = () => {
    return localStorage.getItem('units') || "metric";
  }

  setUnits = (newUnits) => {
    localStorage.setItem('units', newUnits);
    this.setState({units: newUnits});
  }

  setVehicle = (vehicle) => {
    this.setState({vehicle});
    pages.vehicles.icon = vehicle.icon;
  }

  addVehicle = (newVehicle) => {
    const vehicles = [...this.state.vehicles];
    vehicles.push(newVehicle);
    this.setState({vehicles});
  }

  changeVehicleName = ({index, name}) => {
    console.log(index, name);
    const vehicles = [...this.state.vehicles];
    const vehicle = this.state.vehicles[index];
    vehicle.name = name;
    this.setState({vehicles});
  }

  changeVehicleIcon = ({index, icon}) => {
    const vehicles = [...this.state.vehicles];
    const vehicle = this.state.vehicles[index];
    vehicle.icon = icon;
    this.setState({vehicles});
  }

  removeVehicle = (index) => {
    const vehicles = [...this.state.vehicles];
    const allEntries = [...this.state.entries];
    const vehicle = this.state.vehicles[index];
    const entries = allEntries.filter((entry) => entry.vehicleId !== vehicle.id);
    vehicles.splice(index, 1);

    this.setState({vehicles, entries});

    if (vehicle.id === this.state.vehicle.id) {
      setTimeout(() => {
        this.setVehicle(vehicles[0]);
        this.forceUpdate();
      }, 0);
    }
  }

  getIconForCurrentVehicle = () =>  {
    return this.state.vehicle.icon;
  }

  removeEntry = (index) => {
    const nonVehicleEntries = this.state.entries.filter((entry) =>
      entry.vehicleId !== this.state.vehicle.id);
    const vehicleEntries = this.state.entries.filter((entry) =>
      entry.vehicleId === this.state.vehicle.id);

    vehicleEntries.splice(index, 1);
    this.setState({entries: [...nonVehicleEntries, ...vehicleEntries]});
  }

  addEntry = (entry) => {
    const entries = [...this.state.entries];
    entries.push(entry);
    this.setState({entries});
  }

  changePage = (newPage) => {
    window.history.pushState({}, newPage, `/mileage-calculator/${newPage}`);
    this.setState({currentPage: newPage});
  }

  getCurrentPageOrDefault = () => {
    const urlPage = window.location.pathname.replace('/', '');

    if (pages[urlPage] !== undefined) {
      return urlPage;
    }

    return Object.keys(pages)[0];
  }

  renderContent = (page) => {
    let entriesForVehicle = this.state.entries.filter((entry) =>
      entry.vehicleId === this.state.vehicle.id);

    switch (page) {
      case 'newEntry':
        return (
          <NewEntryForm
            addEntry={this.addEntry}
            setUnits={this.setUnits}
            currentUnits={this.state.units}
            entries={entriesForVehicle}
            currentVehicle={this.state.vehicle}
          />
        );
      case 'pastEntries':
        return (
          <PastEntriesList
            vehicle={this.state.vehicle}
            syncDatabase={this.syncDatabase}
            entries={entriesForVehicle}
            removeEntry={this.removeEntry}
            currentUnits={this.state.units}
          />
        )
      case 'dataPage':
        return (
          <DataVisualizer
            vehicle={this.state.vehicle}
            entries={entriesForVehicle}
            currentUnits={this.state.units}
          />
        );
      case 'vehicles':
        return (
          <Vehicles
            addVehicle={this.addVehicle}
            removeVehicle={this.removeVehicle}
            changeVehicleIcon={this.changeVehicleIcon}
            changeVehicleName={this.changeVehicleName}
            setVehicle={this.setVehicle}
            vehicles={this.state.vehicles}
            vehicle={this.state.vehicle}
          />
        );
      default:
        return <div>That page does not exist</div>;
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar pages={pages} changePage={this.changePage} />
        <Container>
          <Header />
          {this.renderContent(this.state.currentPage)}
        </Container>
      </div>
    );
  }
}
