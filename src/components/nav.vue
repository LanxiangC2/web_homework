<template>
  <v-toolbar dark color="primary" v-if="login">
    <v-toolbar-side-icon @click="openMenu()"></v-toolbar-side-icon>

    <v-btn icon router to='/home'>
      <v-icon>home</v-icon>
    </v-btn>

    <v-toolbar-title class="white--text" style="font-family: 'myfontfamily'; font-size: 30px">重庆大学论文推荐系统</v-toolbar-title>

    <v-spacer></v-spacer>
      <!-- <p>欢迎您！</p>
      <p>管理员</p> -->
    <v-btn icon>欢迎您！</v-btn>
    <v-btn icon><span style="font-family: 'myfontfamily'">{{ user }}</span></v-btn>
    <v-avatar size="36">
      <img src="../assets/timg.jpg" alt="">
    </v-avatar>

    <v-btn icon @click="logout">注销</v-btn>
    <!-- <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn> -->

  </v-toolbar>
</template>

<script>
import Bus from '../assets/Bus'
export default {
  data () {
    return {
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  },
  methods: {
    openMenu () {
      Bus.$emit('openMenu')
    },
    logout () {
      if (confirm('确认要注销该账号么？')) {
        this.$store.dispatch('logout')
        this.$router.push({path: '/'})
      }
    }
  },
  created () {
    Bus.$on('login', msg => {
      this.login = true
    })
  },
  computed: {
    login () {
      return this.$store.getters.login
    },
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
