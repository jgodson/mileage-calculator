import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import NewEntryForm from './components/new-entry-form/newEntryForm';
import PastEntriesList from './components/past-entries-list/pastEntriesList';
import sampleData from './sampleData';

export default class App extends Component {
  constructor() {
    super();

    this.loadSampleData = this.loadSampleData.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.syncDatabase = this.syncDatabase.bind(this);
    this.retriveEntries = this.retriveEntries.bind(this);
  }

  state = {
    entries: this.retriveEntries() || []
  }

  syncDatabase() {
    localStorage.setItem('entries', JSON.stringify(this.state.entries));
  }

  retriveEntries() {
    return JSON.parse(localStorage.getItem('entries'));
  }

  loadSampleData() {
    this.setState({ entries: sampleData });
  }

  removeEntry(index) {
    const entries = [...this.state.entries];
    entries.splice(index, 1);
    this.setState({entries});
  }

  addEntry(item) {
    const entries = [...this.state.entries];
    entries.push(item);
    this.setState({entries});
  }

  render() {
    return (
      <div className="App">
        <Header />
        <NewEntryForm addEntry={this.addEntry} loadSampleData={this.loadSampleData} />
        <PastEntriesList syncDatabase={this.syncDatabase} entries={this.state.entries} removeEntry={this.removeEntry}/>
      </div>
    );
  }
}
