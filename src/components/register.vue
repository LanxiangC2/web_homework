<template>
  <v-container text-xs-center  grid-list-md>
    <!-- 遮罩层 -->
    <div class="layer2">
    </div>
    <!-- 页头部分 -->
    <div class="login_head">
      <v-layout row wrap align-center >
        <v-flex text-xs-left>
          <img src="@/assets/校徽.png" alt="" width="100">
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex xs4 sm2 md2 lg2>
          <p class="grey--text ma-0">使用帮助</p>
        </v-flex>

        <v-divider vertical class="my-4"></v-divider>
        <v-flex xs4 sm2 md2 lg2>
          <p class="grey--text ma-0" >关于我们</p>
        </v-flex>
      </v-layout>
    </div>
    <!-- body部分 -->
    <h1 class="black--text my-2" style="text-align: center; font-family: 'myfontfamily2'">账号注册</h1>
    <v-divider class="mb-3"></v-divider>
    <v-form ref="form" :lazy-validation="false" @submit.prevent="validate()">
      <v-layout align-center justify-center wrap>
        <v-flex xs12 sm6 md6 lg4><v-text-field solo label="用户名" v-model="username" :counter="10" :rules="nameRules" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center wrap>
        <v-flex xs12 sm6 md6 lg4><v-text-field solo label="邮箱" v-model="email" :rules="emailRules" required type="email"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center wrap>
        <v-flex xs12 sm6 md6 lg4><v-text-field type="password" solo label="密码" v-model="password" :rules="passwordRules" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center wrap>
        <v-flex xs12 sm6 md6 lg4><v-text-field type="password" solo label="再次确认密码" v-model="password_confirm" :rules="password_confirmRules" required></v-text-field>
        </v-flex>
      </v-layout>
      <!-- <v-divider class="mb-3"></v-divider> -->
      <v-layout align-center justify-center wrap>
        <v-flex xs6 sm3 md3 lg2><v-btn block outline color="primary" type="submit">确认</v-btn></v-flex>
        <v-flex xs6 sm3 md3 lg2><v-btn block outline color="secondary" router :to="{name: 'login'}">返回</v-btn></v-flex>
      </v-layout>
    </v-form>

  </v-container>
</template>
<script>
// import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      dataMessage: '成功创建',
      nameRules: [
        v => !!v || '用户名不能为空',
        v => v.length >= 3 || '密码不能小于3个字符',
        v => (v && v.length <= 10) || '用户名不能大于10个字符'
      ],
      emailRules: [
        v => !!v || '邮箱不能为空',
        // 邮箱格式为“12123@122.com”
        v => /.+@.+\.+/.test(v) || '邮箱的格式不正确'
        // v => /.+@.+/.test(v) || '邮箱的格式不正确'
      ],
      passwordRules: [
        v => !!v || '密码不能为空',
        v => v.length >= 3 || '密码不能小于3个字符'
      ],
      password_confirmRules: [
        v => v === this.password || '两次的密码不相等'
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        // axios.post('/users/', {
        //   username: this.username,
        //   password: this.password,
        //   email: this.email
        // })
        //   .then(response => {
        //     console.log(response.data)
        //     this.$router.push({name: 'login', params: {message: 'success'}})
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
      } else {
        alert('请确认您的格式是否符合要求！')
      }
    }
  },
  created () {
    this.$store.commit('logout')
  }

}
</script>
<style scoped>
p{
  font-family: "myfontfamily2";
  font-size: 24px
}
/* .layer2{
  height: 30%;
  width: 100%;
  background: white;
  opacity: 0.7;
  position: absolute;
  top: 30%;
  z-index: 0;
} */
</style>
