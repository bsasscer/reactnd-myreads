import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class BookSearch extends React.Component {
  state = {
    // TODO: replace with dynamic search.
    books: [],
    query: "",
    shelf: [
      {
        id: "results",
        name: "Search results"
      }
    ]
  };

  handleSearch(e) {
    // if search parameters are present, execute the API search
    if (e.target.value !== "") {
      this.setState({ query: e.target.value });
      BooksAPI.search(this.state.query).then(books => {
        this.setState({ books });
        console.log(this.state.books);
        // console.log(this.state.books);
      });
    } else {
      // if the search box is empty, empty the result set
      this.setState({ books: [] });
    }
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
      <div className="search-books">
        <div className="search-books-bar">
          {/*
      The search page is open. Click a button to change the URL to "/"
      React Router will read the URL and display the appropriate UI.
      The click image is arrow-back.svg referenced by the close-search css class
    */}
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch.bind(this)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* map search results to Book component */}
            {this.state.shelf.map(shelf => (
              <BookShelf
                shelf={shelf}
                key={shelf.id}
                books={this.state.books}
                addBookToShelf={this.addBookToShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;
