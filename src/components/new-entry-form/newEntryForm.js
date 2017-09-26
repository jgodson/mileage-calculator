import React, { Component } from 'react';
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
            <input type="text" name="kilometers" />
          </label>
          <label>
            <div>Liters</div>
            <input type="text" name="liters" />
          </label>
          <label>
            <div>Towing?</div>
            <input type="checkbox" name="towing" />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    )
  }
}