import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { Book } from "./Book";

class BookSearch extends React.Component {
  state = {
    // TODO: replace with dynamic search.
    books: [],
    query: ""
  };

  componentDidMount() {
    // return an array of books from the provided BooksAPI
    // pass the new array to setState
    // BooksAPI.search("ios").then(books => {
    //   this.setState({ books });
    //   console.log(this.state.books)
    // });
  }


  handleSearch(e) {
    // if search parameters are present, execute the API search
    if (e.target.value !== "") {
      this.setState({query: e.target.value} )
      BooksAPI.search(this.state.query).then(books => {
        this.setState({ books });
        // console.log(this.state.books);
      });
    }
    // if the search box is empty, empty the result set
    else {this.setState({ books: []})}
  }

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
            {/* <Book /> component goes */}
            {this.state.books.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;
