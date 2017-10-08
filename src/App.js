import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import NewEntryForm from './components/new-entry-form/newEntryForm';
import PastEntriesList from './components/past-entries-list/pastEntriesList';
import DataVisualizer from './components/data-visualizer/dataVisualizer';

export default class App extends Component {
  constructor() {
    super();

    this.removeEntry = this.removeEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.syncDatabase = this.syncDatabase.bind(this);
    this.retriveEntries = this.retriveEntries.bind(this);
    this.getUnits = this.getUnits.bind(this);
    this.setUnits = this.setUnits.bind(this);
  }

  state = {
    entries: this.retriveEntries() || [],
    units: this.getUnits() || "metric"
  }

  syncDatabase() {
    localStorage.setItem('entries', JSON.stringify(this.state.entries));
  }

  retriveEntries() {
    return JSON.parse(localStorage.getItem('entries'));
  }

  getUnits() {
    return localStorage.getItem('units');
  }

  setUnits(newUnits) {
    localStorage.setItem('units', newUnits);
    this.setState({units: newUnits});
  }

  removeEntry(index) {
    const entries = [...this.state.entries];
    entries.splice(index, 1);
    this.setState({entries});
  }

  addEntry(entry) {
    const entries = [...this.state.entries];
    entries.push(entry);
    this.setState({entries});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <NewEntryForm addEntry={this.addEntry} setUnits={this.setUnits} currentUnits={this.state.units} />
        <PastEntriesList 
          syncDatabase={this.syncDatabase}
          entries={this.state.entries}
          removeEntry={this.removeEntry}
          currentUnits={this.state.units}
        />
        <DataVisualizer entries={this.state.entries} currentUnits={this.state.units}/>
      </div>
    );
  }
}
