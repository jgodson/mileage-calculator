import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import NewEntryForm from './components/new-entry-form/newEntryForm';
import PastEntriesList from './components/past-entries-list/pastEntriesList';
import DataVisualizer from './components/data-visualizer/dataVisualizer';
import Container from './components/container/container';
import Navbar from './components/navbar/navbar';

export default class App extends Component {
  constructor() {
    super();

    this.removeEntry = this.removeEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.syncDatabase = this.syncDatabase.bind(this);
    this.retriveEntries = this.retriveEntries.bind(this);
    this.getUnits = this.getUnits.bind(this);
    this.setUnits = this.setUnits.bind(this);
    this.changePage = this.changePage.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // Check to see if we need to update the database with new entries
    if (this.state.entries.length !== nextState.entries.length) {
      this.syncDatabase(nextState.entries);
    }
  }

  pages = {
    newEntry: {
      text: 'New Entry',
      icon: 'new'
    },
    pastEntries: {
      text: 'Past Entries',
      icon: 'entries'
    },
    dataPage: {
      text: 'Show Data',
      icon: 'data'
    }
  }

  state = {
    entries: this.retriveEntries() || [],
    units: this.getUnits() || "metric",
    currentPage: Object.keys(this.pages)[0]
  }

  syncDatabase(newData) {
    localStorage.setItem('entries', JSON.stringify(newData));
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

  changePage(newPage) {
    this.setState({currentPage: newPage});
  }

  renderContent(page) {
    switch (page) {
      case 'newEntry':
        return <NewEntryForm addEntry={this.addEntry} setUnits={this.setUnits} currentUnits={this.state.units} />;
      case 'pastEntries':
        return (
          <PastEntriesList 
            syncDatabase={this.syncDatabase}
            entries={this.state.entries}
            removeEntry={this.removeEntry}
            currentUnits={this.state.units}
          />
        )
      case 'dataPage':
        return <DataVisualizer entries={this.state.entries} currentUnits={this.state.units} />;
      default:
        return <div>That page does not exist</div>;
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar pages={this.pages} changePage={this.changePage} />
        <Container>
          <Header />
          {this.renderContent(this.state.currentPage)}
        </Container>
      </div>
    );
  }
}
