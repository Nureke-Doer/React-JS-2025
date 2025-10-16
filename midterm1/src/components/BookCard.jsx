import React from 'react'

function BookCardBase({ book, onDelete }) {
  const { id, title, author, genre, rating } = book
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="meta">by {author}</div>
      <div className="meta">
        <span className="badge">{genre}</span>
        <span className="badge"> {Number(rating).toFixed(1)}</span>
      </div>
      <button className="delete" onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

const BookCard = React.memo(BookCardBase)
export default BookCard
