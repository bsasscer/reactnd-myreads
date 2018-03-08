import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelf from "./BookShelf.js";
import BookSearch from "./BookSearch.js";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    // initial books array is empty. we fill it with an API call
    books: [],

    // the app contains three shelves
    shelves: [
      {
        id: "currentlyReading",
        name: "Currently Reading"
      },
      {
        id: "wantToRead",
        name: "Want to Read"
      },
      {
        id: "read",
        name: "Read"
      }
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  componentDidMount() {
    // return an array of books from the provided BooksAPI
    // pass the new array to setState
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  // function by @marcus https://udacity-react.slack.com/team/U9L3DB8CD
  addBookToShelf = (bookToAdd, shelf) => {
      this.setState(state => {
        // return a new array that excludes the selected  book
        const nextState = state.books.filter(book => book.id !== bookToAdd.id);
        // append the selected book to the new array and include its target shelf prop
        return {
          books: [...nextState, { ...bookToAdd, shelf }]
        };
      });
    };

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
                Map each object in the shelves array to a BookShelf.
                Filter the books array by shelf
              */}
              {this.state.shelves.map(shelf => (
                <BookShelf
                  key={shelf.id}
                  shelf={shelf}
                  books={this.state.books.filter(books => {
                    return books.shelf === shelf.id;
                  })}
                      addBookToShelf={this.addBookToShelf}
                />
              ))}
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
