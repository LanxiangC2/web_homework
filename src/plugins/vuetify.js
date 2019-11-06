// src/plugins/vuetify.js
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  theme: {
    primary: '#00bcd4',
    secondary: '#3f51b5',
    accent: '#ff9800',
    error: '#ff5722',
    warning: '#f44336',
    info: '#2196f3',
    success: '#8bc34a'
  }
})

// export default new Vuetify()
