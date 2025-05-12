<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <form @submit.prevent="handleSubmit" class="book-form">
        <h3 class="modal-title">{{ localBook.id ? 'Edit Book' : 'Add Book' }}</h3>

        <div class="form-group">
          <label>Title</label>
          <input v-model="localBook.title" class="form-control" required placeholder="Enter title">
        </div>
        <div class="form-group">
          <label>Author</label>
          <input v-model="localBook.author" class="form-control" required placeholder="Enter author">
        </div>
        <div class="form-group">
          <label>ISBN</label>
          <input v-model="localBook.isbn" class="form-control" required placeholder="Enter ISBN">
        </div>
        <div class="form-group">
          <label>Copies Available</label>
          <input v-model.number="localBook.copies_available" type="number" class="form-control" required>
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">{{ localBook.id ? 'Update' : 'Add' }}</button>
          <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['book'],
  data() {
    return {
      localBook: { ...this.book }
    };
  },
  watch: {
    book(newBook) {
      this.localBook = { ...newBook };
    }
  },
  methods: {
    handleSubmit() {
      this.$emit(this.localBook.id ? 'update' : 'add', this.localBook);
    }
  }
};
</script>

<style scoped>
/* Overlay - Dark background to focus user attention */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Slightly darker */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out; /* Smooth fade-in effect */
}

/* Modal box */
.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-in-out; /* Slide-in effect */
}

/* Modal Title */
.modal-title {
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  text-align: center;
}

/* Form Group - Add spacing and structure */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: bold;
  color: #555;
  margin-bottom: 0.5rem;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #007bff;
}

/* Button Group - Give buttons space and visual balance */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

/* Style buttons for better visibility */
.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

/* Animation effects */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
