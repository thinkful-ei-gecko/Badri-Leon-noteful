import React, { Component } from 'react'
import Book from './Book/Book';
import './Results.css';

export default class Results extends Component {
    render() {
        return (
            <div>
                {console.log(`Results Props: ${this.props.stateData}`)}
                <ul>
                    {this.props.stateData.map((book, i) => <Book bookData={book} key={i}></Book>)}
                </ul>
            </div>
        )
    }
}

