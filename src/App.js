import React from "react";
import "./App.css";
import BookShelf from "./BookShelf.js";
import BookSearch from "./BookSearch.js";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    // shelvedBooks array starts empty. We fill it with an API call.
    shelvedBooks: [],

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
      }
    ]
  };

  componentDidMount() {
    // Return an array of books from the provided BooksAPI.
    // Pass the new array to setState
    BooksAPI.getAll().then(shelvedBooks => {
      this.setState({ shelvedBooks });
    });
  }

  // Function by @marcus https://udacity-react.slack.com/team/U9L3DB8CD
  changeShelf = (bookToAdd, shelf) => {
    this.setState(state => {
      // Return a new array that excludes the selected  book
      const nextState = state.shelvedBooks.filter(
        book => book.id !== bookToAdd.id
      );
      // Append the book/shelf pair to the array.
      return {
        shelvedBooks: [...nextState, { ...bookToAdd, shelf }]
      };
    });
  };

  render() {
    return (
      <div className="app">
        {/*
          Displays BookSearch component when URL changes to /search.
          Pass shelvedBooks as a prop to compare shelves to results.
          Pass changeShelf() as prop to enable shelf changes in results.
            */}
        <Route
          path="/search"
          render={() => (
            <BookSearch
              shelvedBooks={this.state.shelvedBooks}
              changeShelf={this.changeShelf}
            />
          )}
        />
        {/*
          Display the Main page when URL exacty matches "/"
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
                    shelvedBooks={this.state.shelvedBooks}
                    books={this.state.shelvedBooks.filter(shelvedBooks => {
                      return shelvedBooks.shelf === shelf.id;
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
