import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import BookSearch from './BookSearch.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    // initial books array is empty. we fill it with an API call
    books: [],
    
    // the app contains three shelves
    shelves: [
      {
        "id": "currentlyReading",
        "name": "Currently Reading"
      },
      {
        "id": "wantToRead",
        "name": "Want to Read"
      },
      {
        "id": "read",
        "name": "Read"
      }
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    // return an array of books from the provided BooksAPI
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        {/*
          if showSearchPage is true, show the BookSearch component
        */}
        {this.state.showSearchPage ? (
          <BookSearch />
        ) : (
          // if showSearchPage is false, show the main page
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {/*
                Map each object in the shelves array to a BookShelf
                Show all books in all shelves for now. TODO: add filtering
              */}
                    {this.state.shelves.map(shelf => (
                      <BookShelf key={shelf.id} shelf={shelf} books={this.state.books} />
                    ))}
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
