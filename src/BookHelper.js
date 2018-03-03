import React from 'react';

class BookShelf extends React.Component {
  render() {
      // take in an array of books
      const books = this.props.books

      // UI for a shelf of books
      return <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map(book => (
                    <Book />
        ))}
      </ol>
    </div>
}
}

class Book extends React.Component {
  render () {
    // take in a single book
    const book = this.props.book

    // UI for a single book
    return <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
            <ShelfChanger />
        </div>
        <div className="book-title">{book.title}</div> {/* THIS BREAKS */}
        <div className="book-authors">{book.author}</div>  {/* THIS BREAKS */}
      </div>
    </li>
  }
}

class ShelfChanger extends React.Component {
  render () {

  return <div className="book-shelf-changer">
    <select>
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
}
}
export default BookShelf
