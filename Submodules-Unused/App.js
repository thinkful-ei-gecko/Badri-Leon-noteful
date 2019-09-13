import React, { Component } from 'react';
import 'normalize.css'
import './App.css';
import Banner from './Banner/Banner';
import Results from './Results/Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookInfo : [],
    };
    }

  parseBookResults = (results) => {
    //title - results[i].volumeInfo.title
    //picture - results[i].volumeInfo.imageLinks.thumbnail
    //author - results[i].volumeInfo.authors[0]
    //price - if results[i].saleInfo.saleability !== 'FREE' 
                //then results[i].saleInfo.listPrice.amount + results[i].saleInfo.listPrice.currencyCode
              //otherwise, FREE
    //description - results[i].searchInfo.textSnippet

    let updatedState = [];
    //map out important data into the object

    results.items.forEach(book => {
      let currentBook = {};
      if (book.volumeInfo.title) { currentBook.title = book.volumeInfo.title; }
      else { currentBook.title = 'No Title' }
      if (book.volumeInfo.imageLinks) { 
        if (book.volumeInfo.imageLinks.thumbnail) { currentBook.picture = book.volumeInfo.imageLinks.thumbnail; }
        else { currentBook.picture = 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png'; }
      }
      else { currentBook.picture = 'http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png'; }
      if (book.volumeInfo.authors) { currentBook.author = book.volumeInfo.authors[0] }
      else { currentBook.author = 'No author listed' }
      if (book.saleInfo.saleability === 'FOR_SALE') {
        currentBook.price = `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}`;
      }
      else if (book.saleInfo.saleability === 'NOT_FOR_SALE' ) {
        currentBook.price = 'NOT FOR SALE';
      }
      else {
        currentBook.price = 'FREE';
      }
      if (book.searchInfo) { 
        if (book.searchInfo) { currentBook.description = book.searchInfo.textSnippet; }
        else { currentBook.description = 'no description'; }
      }
      else { currentBook.description = 'no description'; }
      updatedState.push(currentBook);
    })
    
    let newStateObject = {
      bookInfo : updatedState
    }
    console.log(newStateObject);
    this.setState({
      ...newStateObject
    })
  }
  
  APIcall = (searchTerm,printType,filter) => {
    let baseURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    if (filter !== 'all') { 
      baseURL += `&filter=${filter}`;
    }
    baseURL += `&printType=${printType}`;
    baseURL += `&maxResults=8`;
    console.log(baseURL);
    fetch(baseURL)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('could not resolve');
    })
    .then(resJson => {
      console.log(resJson);
      this.parseBookResults(resJson);
    })
    .catch(e => console.error(e));
  }


  render() {
    return (
      <div className="App">
        <Banner APIcall={this.APIcall}></Banner>
        {console.log(this.state)}
        <Results stateData={this.state.bookInfo}></Results>       
      </div>
    );
  }
}


export default App;
