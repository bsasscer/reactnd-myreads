import React from 'react';
import Book from './Book'

class BookShelf extends React.Component {
  render() {
      // take in an array of books
      const books = this.props.books
      // take in a shelf title
      const shelf = this.props.shelf

      // pass in the title of the shelf from the shelf prop
      // map each book in the array to UI in the Book component
      return <div className="bookShelf" >
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book book={book}/>
            ))}
          </ol>
        </div>
      </div>
          }
}

export default BookShelf
