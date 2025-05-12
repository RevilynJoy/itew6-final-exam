<template>
  <div class="container py-4"><br>
    <h1 class="text-center mb-4">Book Management System</h1>

    <nav class="mb-4">
      <router-link to="/books" class="btn btn-outline-primary me-2">Manage Books</router-link>
      <router-link to="/borrow" class="btn btn-outline-primary me-2">Borrow Book</router-link>
      <router-link to="/transactions" class="btn btn-outline-primary me-2">View Transactions</router-link>
      <router-link to="/return-management" class="btn btn-outline-primary me-2">Return Books</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}
body {
  background-color: #f9f9f9;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-decoration: none;
}

.btn-outline-primary {
  border: 1px solid #007bff;
  color: #007bff;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}

</style>


