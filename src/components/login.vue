<template>
  <div class="body">
    <div class="text-xs-center">
      <!-- 页头 -->
      <!-- <div class="login_head">
        <v-layout row wrap align-center >
          <v-flex text-xs-left>
            <img src="@/assets/chejianyuan.jpg" alt="" width="100">
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs4 sm2 md2 lg2>
            <p class="grey--text title ma-0">使用帮助</p>
          </v-flex>

          <v-divider vertical class="my-4"></v-divider>
          <v-flex xs4 sm2 md2 lg2>
            <p class="grey--text title ma-0" >关于我们</p>
          </v-flex>
        </v-layout>
      </div> -->
      <!-- 主体部分 -->
      <div class="login_bg">
        <div style="position: absolute; top: 16px; left: 16px">
          <img src="@/assets/校徽.png" alt="" width="100">
        </div>
        <div style="position: absolute; top: 16px; right: 16px">
          <ul>
            <li>关于我们</li>
            <li>使用帮助</li>
          </ul>
        </div>

        <div class="login_title">
            重庆大学论文推荐系统
        </div>
        <!-- 提示框 -->

        <div v-if="receiveMessage" class="alert_div">
            <!-- 通过$router.push({name: '/', params: {message: 'sfdsf'}})来传递参数 -->
            <v-alert type="success" value="true" dismissible >{{ registerMessage }}</v-alert>
        </div>

        <div class="login_body">
          <v-layout column align-center class="mt-5 mb-3">
            <v-flex>
              <!-- <v-icon  class="mr-2">lock</v-icon> -->
              <!-- <v-icon v-if="loggedIn" class="mr-2">lock_open</v-icon> -->
              <span class="headline">登录</span>
            </v-flex>
          </v-layout>

          <v-form ref="form" v-model="valid" lazy-validation class="" @submit.prevent="validateAndLogin">
            <v-layout justify-center align-center row>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="username"
                    :counter="10"
                    :rules="nameRules"
                    label="用户名"
                    required
                    solo
                  ></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout justify-center align-center row>
              <v-flex xs12 sm6>
                <v-text-field
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  label="密码 "
                  solo
                ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- <v-layout justify-center align-center row>
              <v-flex xs12 sm6 md4>
                <div>
                  <v-checkbox label="记住账号信息" v-model="rememberInfo" color="primary"></v-checkbox>
                </div>
              </v-flex>
            </v-layout> -->
            <v-layout justify-center align-center row>
              <v-flex xs12 sm6>
                <v-layout justify-space-around wrap>
                  <v-flex xs12>
                    <v-btn type="submit" block outline color="indigo" :disabled="loading">
                      <div class="lds-ring-container" v-if="loading">
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                      </div>
                      <span v-if="!loading">登录</span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout justify-center align-center row wrap class="mt-3">
              <v-flex xs12>
                  <!-- <span style="text-align: left">忘记密码？</span> -->
                  <v-btn flat router to='/register'>免费注册</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </div>
        <!-- 遮罩层 -->
        <div class="layer"></div>
      </div>
      <!-- 页尾的部分 -->
      <!-- <div class="login_foot">
        技术支持
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   dataSuccessMessage: {
  //     type: String,
  //     required: true
  //   }
  // },
  data () {
    return {
      timer: null,
      loading: false,
      receiveMessage: false,
      dataMessage: this.$route.params.message,
      valid: false,
      username: '',
      email: '',
      password: '',
      nameRules: [
        v => !!v || '用户名不能为空',
        v => v.length >= 3 || '密码不能小于3个字符',
        v => (v && v.length <= 10) || '用户名不能大于10个字符'
      ],
      emailRules: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+/.test(v) || '邮箱的格式不正确'
      ],
      passwordRules: [
        v => !!v || '密码不能为空',
        v => v.length >= 3 || '密码不能小于3个字符'
      ],
      rememberInfo: false
    }
  },
  methods: {
    validateAndLogin () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.dispatch('retrieveToken', {
          username: this.username,
          // email: this.email,
          password: this.password
        })
          .then(response => {
            this.timer = setTimeout(() => {
              // this.$store.commit('login')
              this.loading = false
            }, 1000)
          })
          .catch(error => {
            console.log(error)
            this.loading = false
            this.password = ''
          })
        clearTimeout(this.timer)
        // 没和后端联调
        // this.loading = true
        // this.timer = setTimeout(() => {
        //   // this.$router.push({name: 'home'})
        //   this.$store.commit('login')
        //   console.log('nihao')
        // }, 2000)
      } else {
        alert('请检查您的信息是否正确')
      }
    }
  },
  created () {
    this.$store.commit('logout')
    this.dataMessage = 'created'
    // console.log(this.dataMessage)
  },
  computed: {
    // 确认收到信息与否，收到返回已创建
    registerMessage () {
      if (this.$route.params.message === 'success') {
        return '已创建'
      } else {
        return '未收到信息'
      }
    },
    login () {
      return this.$store.getters.login
    }
  },
  watch: {
    dataMessage () {
      // console.log(this.receiveMessage)
      // 未收到消息的话，不打开alert提示框
      if (this.registerMessage === '未收到信息') {
        this.receiveMessage = false
      } else {
        this.receiveMessage = true
        this.timer = setTimeout(() => {
          this.receiveMessage = false
        }, 1000)
      }
    },
    // 判断是否登录了
    login () {
      if (this.login === true) {
        this.$router.push({name: 'knowUser'})
      }
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
@import url('cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css');
*{
  margin-top:0
}
a{
  text-decoration: none;
  color: black
}
a:hover{
  border: 1px solid blue;
  background:blueviolet;
  color: #fff;
}
li{
  float: left;
  font-family: "myfontfamily2";
  font-size: 24px;
  list-style: none;
  margin: 16px 16px
}
.login_title{
  width: 100%;
  height: 64px;
  position: absolute;
  top: 80px;
  font-family: 'myfontfamily';
  font-size: 64px;
  color: white;
}
.login_head{
  /* height: 10vh; */
  overflow: hidden;
  background: white;
}
/* .login_head img{
  margin-left: 30px
} */
.login_bg{
  position: relative;
  height: 100vh;
  width: 100%;
  background: url(../assets/cquniversity.jpg) ;
  background-size: cover;
  text-align: contain
}
/* 提示框div */
.alert_div{
  width: 100%;
  position: absolute;
  top: 0
}
.login_body {
  /* border-radius: 20px; */
  height: 400px;
  width: 40%;
  position: absolute;
  /* background: white; */
  top: 50%;
  /* left: 50%; */
  right: 10vh;
  margin-top: -200px;
  /* border: 1px solid red; */
  /* margin-right: -20vh; */
  z-index: 9999
}
.layer{
  border-radius: 30px;
  width: 40%;
  height: 400px;
  background: white;
  position: absolute;
  top: 50%;
  /* left: 50%; */
  right: 10vh;
  margin-top: -200px;
  /* margin-right: -20vh; */
  opacity: 0.7;
}
/* .login_foot{
  height: 10vh;
  text-align: center;
  line-height: 100%
} */

.head{
  text-align: center
}

.lds-ring-container {
    position: absolute;
    left: 50%;
    top: -14px;
    transform: translate(-21%, 0)
  }

.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  /* // margin: 6px; */
  border: 3px solid #00bcd4;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #00bcd4 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
