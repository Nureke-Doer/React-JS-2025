import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const LS_KEY = 'minilibrary.books'

const schema = Yup.object({
  title: Yup.string().min(2, 'Минимум 2 символа').required('Обязательно'),
  author: Yup.string().required('Обязательно'),
  genre: Yup.mixed().oneOf(['fiction', 'nonfiction', 'tech'], 'Выберите жанр').required('Обязательно'),
  rating: Yup.number().min(0, 'Не меньше 0').max(5, 'Не больше 5').required('Обязательно'),
})

export default function AddSBook() {
  const navigate = useNavigate()

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      const list = raw ? JSON.parse(raw) : []
      const book = { ...values, id: Date.now(), rating: Number(values.rating) }
      const updated = [book, ...list]
      localStorage.setItem(LS_KEY, JSON.stringify(updated))
      resetForm()
      navigate('/books')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container">
      <h1>Add Book</h1>
      <Formik
        initialValues={{ title: '', author: '', genre: '', rating: 0 }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="row">
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" placeholder="Например: Война и мир" />
              <div className="error"><ErrorMessage name="title" /></div>
            </div>

            <div className="row">
              <label htmlFor="author">Author</label>
              <Field id="author" name="author" placeholder="Например: Толстой" />
              <div className="error"><ErrorMessage name="author" /></div>
            </div>

            <div className="row">
              <label htmlFor="genre">Genre</label>
              <Field as="select" id="genre" name="genre">
                <option value="">Выберите жанр...</option>
                <option value="fiction">Fiction</option>
                <option value="nonfiction">Nonfiction</option>
                <option value="tech">Tech</option>
              </Field>
              <div className="error"><ErrorMessage name="genre" /></div>
            </div>

            <div className="row">
              <label htmlFor="rating">Rating (0–5)</label>
              <Field id="rating" name="rating" type="number" step="0.1" min="0" max="5" />
              <div className="error"><ErrorMessage name="rating" /></div>
            </div>

            <button type="submit" disabled={isSubmitting}>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
