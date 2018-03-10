import React from "react";
import "./App.css";
import BookShelf from "./BookShelf.js";
import BookSearch from "./BookSearch.js";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";

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
    ]
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
        {/* Use React Router to display the BookSearch component */}
        <Route path="/search" component={BookSearch} />
        {/* Use React Router to display the Main page */}
        <Route
          exact
          path="/"
          render={() => (
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
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
