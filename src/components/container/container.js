import React, { Component } from 'react';
import './container.css';

export default class Container extends Component {
  render() {
    return (
      <main className="Container">
        {this.props.children}
      </main>
    )
  }
}
