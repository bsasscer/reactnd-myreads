import React from "react";
import "./App.css";
import BookShelf from "./BookShelf.js";
import BookSearch from "./BookSearch.js";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    // Books array starts empty. We fill it with an API call.
    books: [],

    // Object simulating app shelving
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
      },
      {
        id: "none",
        name: "None"
      }
    ]
  };

  componentDidMount() {
    // Return an array of books from the provided BooksAPI.
    // Pass the new array to setState
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  // Function by @marcus https://udacity-react.slack.com/team/U9L3DB8CD
  changeShelf = (bookToAdd, shelf) => {
    this.setState(state => {
      // Return a new array that excludes the selected  book
      const nextState = state.books.filter(book => book.id !== bookToAdd.id);
      // Append the book/shelf pair to the array.
      return {
        books: [...nextState, { ...bookToAdd, shelf }]
      };
    });
  };

  render() {
    return (
      <div className="app">
        {/*
           React Router displays BookSearch when URL changes to /search.
          Pass changeShelf() as prop to enable changes in search results.
            */}
        <Route
          path="/search"
          render={() => <BookSearch changeShelf={this.changeShelf} />}
        />
        {/*
          React Router displays the Main page when URL exacty matches "/"
           */}
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
                Map each shelf object in shelves[] to a BookShelf component.
                Filter books so they only appear on their assigned shelf.
              */}
                {this.state.shelves.map(shelf => (
                  <BookShelf
                    key={shelf.id}
                    shelf={shelf}
                    books={this.state.books.filter(books => {
                      return books.shelf === shelf.id;
                    })}
                    changeShelf={this.changeShelf}
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
