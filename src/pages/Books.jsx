import React, { useEffect, useMemo, useState, useCallback } from 'react'
import BookCard from '../components/BookCard.jsx'

const LS_KEY = 'minilibrary.books'

const defaultBooks = [
  { id: 1720000000001, title: 'Ұшқан Ұя', author: 'Бауыржан Момышұлы', genre: 'Fiction', rating: 4.8 },
  { id: 1720000000002, title: 'Волоколамское шоссе', author: 'Александр Бек', genre: 'Fiction', rating: 4.7 },
  { id: 1720000000003, title: 'Идиот', author: 'Федор Достоевский', genre: 'Fiction', rating: 5 },
]

export default function Books() {
  const [books, setBooks] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? JSON.parse(raw) : defaultBooks
    } catch {
      return defaultBooks
    }
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(books))
  }, [books])

  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('all')

  const onDelete = useCallback((id) => {
    setBooks(prev => prev.filter(b => b.id !== id))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return books
      .filter(b => (genre === 'all' ? true : b.genre === genre))
      .filter(b => (q ? b.title.toLowerCase().includes(q) : true))
  }, [books, query, genre])

  return (
    <div className="container">
      <h1>Books</h1>
      <div className="controls">
        <input
          placeholder="Поиск по названию книги"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All</option>
          <option value="fiction">Fiction</option>
          <option value="nonfiction">Nonfiction</option>
          <option value="tech">Tech</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>Ничего не найдено.</p>
      ) : (
        <div className="grid">
          {filtered.map(b => (
            <BookCard key={b.id} book={b} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
