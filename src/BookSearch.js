import React from "react";
import { Link } from "react-router-dom";

class BookSearch extends React.Component {
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
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

export default BookSearch;
