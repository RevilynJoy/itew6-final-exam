<template>
  <div>
    <BookForm
      v-if="showForm"
      :book="selectedBook"
      @add="createBook"
      @update="updateBook"
      @cancel="cancelForm"
    />

    <div class="book-grid">
      <div class="book-card" v-for="book in books" :key="book.id">
        <div>
          <div class="book-title">{{ book.title }}</div>
          <div class="book-author">by {{ book.author }}</div>
          <div class="book-isbn"><strong>ISBN:</strong> {{ book.isbn }}</div>
          <div class="book-copies"><strong>Copies:</strong> {{ book.copies_available }}</div>
        </div>
        <div class="book-actions">
          <button class="btn btn-warning btn-sm" @click="editBook(book)">Edit</button>
          <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Delete</button>
        </div>
      </div>
    </div>

    <div class="add-book-wrapper">
      <button class="btn btn-success" @click="addMode">+ Add Book</button>
    </div>
  </div>
</template>



  
  <script>
  import axios from 'axios'
  import BookForm from './BookForm.vue'
  
  export default {
    components: { BookForm },
    data() {
      return {
        books: [],
        selectedBook: null,
        showForm: false,
      }
    },
    methods: {
      fetchBooks() {
        axios.get('books/').then(res => this.books = res.data);
      },
      addMode() {
        this.selectedBook = { title: '', author: '', isbn: '', copies_available: 1 };
        this.showForm = true;
      },
      editBook(book) {
        this.selectedBook = { ...book };
        this.showForm = true;
      },
      createBook(book) {
        axios.post('books/', book).then(() => {
          this.fetchBooks();
          this.showForm = false;
        });
      },
      updateBook(book) {
        axios.put(`books/${book.id}/`, book).then(() => {
          this.fetchBooks();
          this.showForm = false;
        });
      },
      deleteBook(id) {
        axios.delete(`books/${id}/delete/`).then(this.fetchBooks);
      },
      cancelForm() {
        this.showForm = false;
      }
    },
    mounted() {
      this.fetchBooks();
    }
  }
  </script>
 <style scoped>
/* Basic button style for actions */
.btn {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

/* Grid layout for books */
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Individual book card design */
.book-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;
  text-align: center;
}

/* Hover effect on book card */
.book-card:hover {
  transform: translateY(-5px);
}

/* Book title styling */
.book-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

/* Author, ISBN, and Copies styling */
.book-author,
.book-isbn,
.book-copies {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.25rem;
}

/* Actions (Edit/Delete buttons) styling */
.book-actions {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

/* Add Book button wrapper */
.add-book-wrapper {
  margin-top: 2rem;
  text-align: center;
}

/* Style for the Add Book button */
.btn-success {
  background-color: #28a745;
  border: none;
  color: #fff;
}

.btn-success:hover {
  background-color: #218838;
}

/* Button for Edit/Delete actions */
.btn-warning {
  background-color: #18a915;
  color: #fff;
}

.btn-warning:hover {
  background-color: #13ef0f;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
