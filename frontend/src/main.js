import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Set base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:8000/api/'

const app = createApp(App)
app.use(router)
app.mount('#app')
