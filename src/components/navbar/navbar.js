import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImagePath } from '../../utilities';
import './navbar.css';

export default class Navbar extends Component {
  constructor() {
    super();

    this.renderLinks = this.renderLinks.bind(this); 
  }

  renderLinks(links) {
    const pageKeys = Object.keys(links);
    return pageKeys.map((key) => {
      return (
        <a key={key} onClick={() => this.props.changePage(key)}>
          <img className="icon" src={getImagePath(links[key].icon)} alt="" />
          <span className="text">{links[key].text}</span>
        </a>
      )
    });
  }

  render() {
    return (
      <nav className="Navbar">
        {this.renderLinks(this.props.pages)}
      </nav>
    )
  }

  static PropTypes = {
    pages: PropTypes.object,
    changePage: PropTypes.func.isRequired
  }
}