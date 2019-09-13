import React, { Component } from 'react';
import FilterBar from './FilterBar/FilterBar';
import './Banner.css';


export default class Banner extends Component {
    render() {
        return (
            <header>
                <h1>Google Book Search</h1>
                <FilterBar APIcall={this.props.APIcall}></FilterBar>
            </header>
        )
    }
}

