<template>
  <div>
    <!-- Book Form Modal -->
    <BookForm
      v-if="showForm"
      :book="selectedBook"
      @add="createBook"
      @update="updateBook"
      @cancel="cancelForm"
    />

    <!-- Header with Book List title and Add Book Button -->
    <div class="header-wrapper">
      <h1 class="book-list-title fw-bold text-primary text-center">Book List</h1>
      <div class="add-book-wrapper">
        <button class="btn btn-success" @click="addMode">+ Add Book</button>
      </div>
    </div>

    <!-- Book Cards -->
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
          <button class="btn btn-danger btn-sm" @click="confirmDelete(book)">Delete</button>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Confirm Deletion</h3>
        <p>Are you sure you want to delete this book?</p>
        <div class="button-group">
          <button class="btn btn-danger" @click="deleteBook">Yes</button>
          <button class="btn btn-secondary" @click="showDeleteConfirm = false">No</button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">Success</h3>
        <p>{{ successMessage }}</p>
        <div class="button-group">
          <button class="btn btn-primary" @click="showSuccess = false">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BookForm from './BookForm.vue';

export default {
  components: { BookForm },
  data() {
    return {
      books: [],
      selectedBook: null,
      showForm: false,
      showDeleteConfirm: false,
      showSuccess: false,
      successMessage: '',
      bookToDelete: null,
    };
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
        this.successMessage = 'Book added successfully.';
        this.showSuccess = true;
      });
    },
    updateBook(book) {
      axios.put(`books/${book.id}/`, book).then(() => {
        this.fetchBooks();
        this.showForm = false;
        this.successMessage = 'Book updated successfully.';
        this.showSuccess = true;
      });
    },
    confirmDelete(book) {
      this.bookToDelete = book;
      this.showDeleteConfirm = true;
    },
    deleteBook() {
      if (!this.bookToDelete) return;
      axios.delete(`books/${this.bookToDelete.id}/delete/`).then(() => {
        this.fetchBooks();
        this.showDeleteConfirm = false;
        this.bookToDelete = null;
        this.successMessage = 'Deleted successfully.';
        this.showSuccess = true;
      });
    },
    cancelForm() {
      this.showForm = false;
    }
  },
  mounted() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin: 30px;
}

.book-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

.book-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.book-author,
.book-isbn,
.book-copies {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.25rem;
}

.book-actions {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.add-book-wrapper {
  margin-top: 2rem;
  text-align: center;
}

.btn {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.btn-success {
  background-color: #28a745;
  color: white;
}
.btn-success:hover {
  background-color: #218838;
}

.btn-warning {
  background-color: #18a915;
  color: white;
}
.btn-warning:hover {
  background-color: #13ef0f;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
.btn-danger:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 300px;
  text-align: center;
}
.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Header Styles */
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.book-list-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

h1 {
  font-family: 'Poppins', sans-serif;
}


</style>


