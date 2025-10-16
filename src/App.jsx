import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Books from './pages/Books.jsx'
import AddSBook from './pages/AddSBook.jsx'

const NotFound = () => (
  <div className="container">
    <h1>404 — Not Found</h1>
    <p>Страница не найдена</p>
  </div>
)

export default function App() {
  return (
    <div>
      <header className="header">
        <NavLink to="/books" className={({isActive}) => isActive ? 'active' : ''}>Books</NavLink>
        <NavLink to="/add-book" className={({isActive}) => isActive ? 'active' : ''}>Add Book</NavLink>
      </header>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/add-book" element={<AddSBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="container"><p>Read books :)</p></footer>
    </div>
  )
}
