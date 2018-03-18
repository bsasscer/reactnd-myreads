import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BookSearch extends React.Component {
  state = {
    //The foundBooks array will hold books returned from the API search
    foundBooks: [],
    //The query string will hold search parameters entered by the user
    query: ""
  };

  handleSearch(e) {
    // If search parameters are entered, save the query to state,
    // then execute the API search.
    if (e.target.value !== "") {
      this.setState({ query: e.target.value });
      BooksAPI.search(this.state.query).then(foundBooks => {
        this.setState({ foundBooks });
      });
    } else {
      // If the search box is empty, empty the result set.
      this.setState({ foundBooks: [] });
    }
  }

  render() {
    // Take in shelvedBooks from App to compare to search results
    const shelvedBooks = this.props.shelvedBooks;
    // Show UI for search results
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
        {/* Only show search results when there is data to display */}
        {this.state.foundBooks !== undefined && (
          <div className="search-books-results">
            <ol className="books-grid">
              {/* Map search results to the Book component */}
              {this.state.foundBooks.map(book => (
                <Book
                  book={book}
                  key={book.id}
                  changeShelf={this.props.changeShelf}
                  shelvedBooks={shelvedBooks}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default BookSearch;
