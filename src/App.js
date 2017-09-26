import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import NewEntryForm from './components/new-entry-form/newEntryForm';
import PastEntriesList from './components/past-entries-list/pastEntriesList';
import sampleData from './sampleData';

export default class App extends Component {
  constructor() {
    super();
  }

  state = {
    entries: sampleData
  }

  render() {
    return (
      <div className="App">
        <Header />
        <NewEntryForm />
        <PastEntriesList entries={this.state.entries}/>
      </div>
    );
  }
}
