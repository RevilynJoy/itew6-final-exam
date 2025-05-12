<template>
    <div class="container mt-4">
      <h3>Borrow a Book</h3>
  
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
        </div>
  
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
        </div>
  
    <form @submit.prevent="borrowBook">
      <div class="form-group mb-2">
        <label>Select Book</label>
        <select v-model="book_id" class="form-control" required>
          <option disabled value="">-- Choose a book --</option>
          <option v-for="book in books" :key="book.id" :value="book.id" :disabled="book.copies_available === 0">
            {{ book.title }} by {{ book.author }} ({{ book.copies_available }} available)
          </option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label>Select User</label>
        <select v-model="username" class="form-control" required>
          <option disabled value="">-- Choose a user --</option>
          <option v-for="user in users" :key="user" :value="user">
            {{ user }}
          </option>
        </select>
    </div>

      <button class="btn btn-primary" :disabled="borrowInProgress">
        {{ borrowInProgress ? 'Borrowing...' : 'Borrow Book' }}
      </button>
    </form>
  </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        books: [],
        book_id: '',
        username: '',
      users: ['juan', 'maria', 'pedro', 'ana', 'jose'],
      borrowInProgress: false,
      successMessage: '',
      errorMessage: ''
      }
    },
    mounted() {
    this.fetchBooks();
    },
    methods: {
    fetchBooks() {
      axios.get('books/')
        .then(res => {
          this.books = res.data;
        })
        .catch(error => {
          console.error('Error fetching books:', error);
          this.errorMessage = 'Error fetching books. Please try again.';
        });
    },

    borrowBook() {
      this.borrowInProgress = true;
      this.successMessage = '';
      this.errorMessage = '';

      axios.post('borrow/', {
        book_id: this.book_id,
        username: this.username
        })
      .then(() => {
        this.successMessage = "Book borrowed successfully!";
        this.book_id = '';
        this.username = '';
        // ETO LANG PARA I-REFRESH ANG LISTA NG BOOKS SA BORROW PAGE AFTER BORROWING A BOOK
        return this.fetchBooks();
      })
      .catch(err => {
        const message = err.response?.data?.error || "Failed to borrow book.";
        this.errorMessage = message;
        console.error(err);
      })
      .finally(() => {
        this.borrowInProgress = false;
        });
      }
    }
  }
  </script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

/* Apply Poppins font globally */
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}
/* Container for the form */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Heading styles */
h3 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Alert styling */
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

/* Success alert styling */
.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

/* Error alert styling */
.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Form elements */
.form-group {
  margin-bottom: 1.5rem;
}

/* Label styling */
label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

/* Input and select elements */
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
}

/* Disabled select options */
.form-control[disabled] {
  background-color: #f1f1f1;
  cursor: not-allowed;
}

/* Button styles */
button.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 8px;
  width: 100%;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

button.btn-primary {
  background-color: #007bff;
  border: none;
  color: white;
}

button.btn-primary:hover {
  background-color: #0056b3;
}

button.btn-primary:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* Margin for the button */
button.btn {
  margin-top: 1rem;
}
</style>

