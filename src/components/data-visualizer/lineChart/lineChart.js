import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts/highstock';
import './lineChart.css';
import { calculateMileage, labelNames } from '../../../utilities';

export default class LineChart extends Component {
  constructor() {
    super();

    this.crunchData = this.crunchData.bind(this);
  }

  crunchData(entries) {
    const currentUnits = this.props.currentUnits;
    // Special styles for towing points
    const towingColor = '#FFC551';
    const towingRadius = 3;

    // Convert the dates to timestamps and differ duplicates by adding time to each
    const completedDates = {};
    // Add 60 minutes to each duplicate entry so we don't break the chart
    const timeAdd = 60 * 60 * 1000;
    for (const index in entries) {
      if (completedDates[entries[index].date]) {
        completedDates[entries[index].date]++;
        entries[index].date = new Date(entries[index].date).valueOf() + (timeAdd * completedDates[entries[index].date]);
      } else {
        completedDates[entries[index].date] = 1;
        entries[index].date = new Date(entries[index].date).valueOf();
      }
    }

    // Sort the entries by date
    entries.sort((a, b) => a.date > b.date);

    // Return the data mapped to {x: timestamp, y: mileage, color: (undefined or towingColor) marker: {radius: (undefined or towingRadius)}}
    return entries.map((entry) => {
      return {
        x: entry.date,
        y: parseFloat(calculateMileage(entry.liters, entry.km, currentUnits)),
        color: entry.towing ? towingColor : undefined,
        marker: {
          radius: entry.towing ? towingRadius : undefined,
        }
      }
    });
  }

  componentDidMount() {
    const currentUnits = this.props.currentUnits;
    const labels = labelNames(currentUnits);

    Highcharts.stockChart('LineChart', {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: `Average ${labels.mileage}`,
        style: {
          'fontWeight': 'bold',
          'fontFamily': 'sans-serif'
        }
      },
      series: [{
        name: labels.mileage,
        data: this.crunchData(this.props.entries),
        tooltip: {
            valueDecimals: 2
        },
        marker: {
          enabled: true
        }
      }]
    });
  }

  render() {
    return <div id="LineChart" className="LineChart"></div>
  }

  static PropTypes = {
    entries: PropTypes.array.isRequired,
    currentUnits: PropTypes.string.isRequired
  }
}