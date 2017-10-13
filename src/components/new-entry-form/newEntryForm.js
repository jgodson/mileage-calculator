import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './newEntryForm.css';
import { labelNames, convertDistance, convertVolume } from '../../utilities';

export default class NewEntryForm extends Component {
  constructor() {
    super();

    this.createEntry = this.createEntry.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  state = {
    errors: [],
    submitError: false
  }

  createEntry(event) {
    event.preventDefault();
    let currentErrors = [];
    const currentUnits = this.props.currentUnits;
    const entry = {
      date: this.date.value.replace(/-/g, '/'),
      km: convertDistance(parseFloat(this.km.value), currentUnits, true),
      liters: convertVolume(parseFloat(this.liters.value), currentUnits, true),
      towing: this.towing.value === "true" ? true : false
    }

    Object.keys(entry).forEach((key) => {
      if (this.isEmpty(entry[key])) {
        currentErrors.push(key);
      }
    });

    if (currentErrors.length === 0) {
      this.props.addEntry(entry);
      this.clearForm();
    } else {
      this.setState({
        errors: currentErrors,
        submitError: true
      });
    }
  }

  isEmpty(value) {
    return typeof value === "string" && value.trim() === "";
  }

  handleBlur(event) {
    const value = event.target.value;
    const id = event.target.id;
    const isEmpty = this.isEmpty(value);
    if (!isEmpty && this.state.errors.includes(id)) {
      const errors = [...this.state.errors];
      errors.splice(errors.indexOf(id), 1);
      this.setState({errors});
    } else if (isEmpty) {
      const errors = [...this.state.errors];
      errors.push(id);
      this.setState({errors});
    }
  }

  clearForm() {
    this.form.reset();
    this.setState({
      errors: [],
      submitError: false
    })
  }

  render() {
    const error = <div className="error">Please fill out all fields and submit again</div>;
    const formErrors = this.state.errors;
    const currentUnits = this.props.currentUnits;
    const switchUnitsButton = () => {
      return (
        <div className="units-selector">
          <label>Units
            <select value={currentUnits} onChange={(event) => this.props.setUnits(event.target.value)}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>
          </label>
        </div>
      )
    }
    const labels = labelNames(currentUnits);

    return (
      <form ref={(form) => this.form = form} className="NewEntryForm" onSubmit={(event) => this.createEntry(event)}>
        <fieldset>
          <div className="form-header">
            <h4>Add a new entry</h4>
            {switchUnitsButton()}
          </div>
          <label>
            <div>Date</div>
            <input
              className={formErrors.includes("date") ? 'has-error' : ''}
              id="date"
              type="date"
              onBlur={(event) => this.handleBlur(event)}
              ref={(input) => this.date = input} 
            />
          </label>
          <label>
            <div>{labels.distance}</div>
            <input
              className={formErrors.includes("km") ? 'has-error' : ''} 
              id="km" 
              placeholder={`Enter ${labels.distance.toLowerCase()} driven...`}
              type="number"
              step="any"
              min="0"
              onBlur={(event) => this.handleBlur(event)} 
              ref={(input) => this.km = input} 
            />
          </label>
          <label>
            <div>{labels.volume}</div>
            <input
              className={formErrors.includes("liters") ? 'has-error' : ''} 
              id="liters"
              placeholder={`Enter ${labels.volume.toLowerCase()} used...`}
              type="number"
              step="any"
              min="0"
              onBlur={(event) => this.handleBlur(event)} 
              ref={(input) => this.liters = input}
            />
          </label>
          <label>
            <div>Towing?</div>
            <select ref={(input) => this.towing = input}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
          {this.state.submitError && error}
          <button className="destructive" type="button" onClick={this.clearForm}>Clear Form</button>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    )
  }

  static propTypes = {
    addEntry: PropTypes.func.isRequired,
    setUnits: PropTypes.func.isRequired,
    currentUnits: PropTypes.string.isRequired
  }
}