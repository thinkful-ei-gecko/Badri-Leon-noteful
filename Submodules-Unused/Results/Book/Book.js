import React, { Component } from 'react'
import './Book.css';

export default class Book extends Component {

    render() {
        return (
            <div id="book" key={this.props.i}>
                <div className="left-side">
                <img src={this.props.bookData.picture} alt="book cover"/>

                </div>

                <div className="right-side">
                <h2>{this.props.bookData.title}</h2>
                <p>Author: {this.props.bookData.author}</p>
                <p>Price: {this.props.bookData.price}</p>
                <p>{this.props.bookData.description}</p>
                </div>
            </div>
        )
    }
}


    //title - results[i].volumeInfo.title
    //picture - results[i].volumeInfo.imageLinks.thumbnail
    //author - results[i].volumeInfo.authors[0]
    //price - if results[i].saleInfo.saleability !== 'FREE' 
                //then results[i].saleInfo.listPrice.amount + results[i].saleInfo.listPrice.currencyCode
              //otherwise, FREE
    //description - results[i].searchInfo.textSnippet