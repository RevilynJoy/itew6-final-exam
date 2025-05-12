<template>
  <div class="mb-4">
    <h1 class="fw-bold text-primary text-center">All Borrow Transactions</h1>
  </div>
  
  <div class="transactions">
    <div v-if="loading" class="loading text-center">
      Loading transactions...
    </div>
    
    <div v-if="successMessage" class="alert alert-success text-center">
      {{ successMessage }}
    </div>
    
    <div v-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }}
    </div>
    
    <div v-if="!loading && transactions.length === 0" class="no-transactions text-center">
      No transactions found.
    </div>
    
    <table v-if="transactions.length > 0" class="transaction-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Book</th>
          <th>User</th>
          <th>Status</th>
          <th>Borrowed On</th>
          <th>Returned On</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="transaction.id">
          <td>{{ index + 1 }}</td>
          <td>{{ transaction.book.title }}</td>
          <td>{{ transaction.user.username }}</td>
          <td>
            <span :class="getStatusClass(transaction.status)">
              {{ transaction.status }}
            </span>
          </td>
          <td>{{ formatDate(transaction.borrow_date) }}</td>
          <td>{{ transaction.return_date ? formatDate(transaction.return_date) : '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AllTransactions',
  data() {
    return {
      transactions: [],
      loading: true,
      successMessage: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      this.loading = true;
      this.errorMessage = '';
      
      axios.get('transactions/')
        .then(response => {
          this.transactions = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching transactions:', error);
          this.errorMessage = 'Failed to load transactions. Please try again.';
          this.loading = false;
        });
    },

    formatDate(datetime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      return new Date(datetime).toLocaleString('en-US', options);
    },

    getStatusClass(status) {
      status = status.trim();
      if (status === 'borrowed') return 'badge bg-danger'; // Red for Borrowed
      if (status === 'returned') return 'badge bg-success'; // Green for Returned
      return 'badge bg-secondary'; // Fallback for any other status (Gray)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.transactions {
  max-width: 1200px;  /* Increased max-width for wider layout */
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
}

.alert {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.loading, .no-transactions {
  text-align: center;
  margin: 20px 0;
  font-style: italic;
  color: #666;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1em;  /* Increased font size for better readability */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  overflow: hidden;
  text-align: center;  /* Centered all text in the table */
}

.transaction-table thead tr {
  background-color: #007bff;
  color: #ffffff;
  text-align: center; /* Centered the header text */
}

.transaction-table th,
.transaction-table td {
  padding: 15px 20px; /* Added more padding for a wider look */
}

.transaction-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.transaction-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.transaction-table tbody tr:last-of-type {
  border-bottom: 2px solid #007bff;
}

.transaction-table tbody tr:hover {
  background-color: #e6f2ff;
}

.badge {
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
}

.bg-danger {
  background-color: #dc3545;
}

.bg-success {
  background-color: #28a745;
}

.bg-secondary {
  background-color: #6c757d;
}

h1 {
  font-family: 'Poppins', sans-serif;
}
</style>
