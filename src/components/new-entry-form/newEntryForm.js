import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './newEntryForm.css';

export default class NewEntryForm extends Component {
  render() {
    return (
      <form className="NewEntryForm">
        <fieldset>
          <h4>Add a new entry</h4>
          <label>
            <div>Date</div>
            <input type="date" name="date" />
          </label>
          <label>
            <div>Kilometers</div>
            <input type="number" name="kilometers" />
          </label>
          <label>
            <div>Liters</div>
            <input type="number" name="liters" />
          </label>
          <label>
            <div>Towing?</div>
            <input type="checkbox" name="towing" />
          </label>
          <button type="button">Submit</button>
          <button type="button" onClick={this.props.loadSampleData}>Load Sample Data</button>
        </fieldset>
      </form>
    )
  }

  static propTypes = {
    loadSampleData: PropTypes.func.isRequired
  }
}