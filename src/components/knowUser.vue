<template>
  <div class="bg">
    <div class="layer2">
    </div>
    <div v-if="loading === true" class="layer3">
    </div>
    <div class="progress" v-if="loading === true">
      <v-progress-circular
        :size="70"
        :width="7"
        color="white"
        indeterminate
        class="mt-10"
      ></v-progress-circular>
      <div class="mt-3 white--text">加载中 ......</div>
    </div>
    <v-card class="my-5 primary" dark style="font-family: 'myfontfamily2'">
      <h2 >请告诉我们您的需求</h2>
    </v-card>
    <v-stepper v-model="e1" class="mx-5 light-green lighten-5">
      <v-stepper-header >
        <v-stepper-step :complete="e1 > 1" step="1">您关注的领域</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">您想检索的期刊等级</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">您想通过什么内容来检索</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card flat
            class="my-0 light-green lighten-5"
            color=""
            height="200px"
          >
          <v-container>
            <div class="grey--text caption">提示：本系统经过三步设置快速直达您的目标论文，给予我们的信息越多越高效哦！！！</div>
            <div class="grey--text caption mb-3">提示：若想跳过繁琐步骤可<router-link to='/home'>点击直接搜索</router-link>, 虽然我们并不建议这样做</div>
            <v-layout justify-center>
              <v-flex xs6>
                <v-select :items="subjects" v-model="subject" outline label="检索论文的方向">
                </v-select>
              </v-flex>
            </v-layout>
          </v-container>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            继续
          </v-btn>

          <v-btn flat @click="turnback()">取消</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card flat
            class="light-green lighten-5"
            color=""
            height="200px"
          >
            <v-layout wrap class="ml-3">
              <v-flex xs12>
                <div class="grey--text caption" style="text-align: left">提示：请选择期刊类型以便我们高效地为您检索！！！</div>
              </v-flex>
              <v-flex xs12 class="mt-3">
                <v-divider></v-divider>
              </v-flex>
              <v-flex>
                <v-checkbox v-model="data_type" label="SCI" value="SCI"></v-checkbox>
              </v-flex>
              <v-flex><v-checkbox v-model="data_type" label="EI" value="EI"></v-checkbox></v-flex>
              <v-flex><v-checkbox v-model="data_type" label="ISTP" value="ISTP"></v-checkbox></v-flex>
              <v-flex><v-checkbox v-model="data_type" label="国家级期刊" value="nationalA"></v-checkbox></v-flex>
              <v-flex><v-checkbox v-model="data_type" label="省级期刊" value="provincialA"></v-checkbox></v-flex>
              <v-flex><v-checkbox v-model="data_type" label="核心期刊" value="coreA"></v-checkbox></v-flex>
              <v-flex><v-checkbox v-model="data_type" label="CN类期刊" value="cnA"></v-checkbox></v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            继续
          </v-btn>

          <v-btn flat @click="e1 = 1">取消</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card flat
            height="200px"
            class="light-green lighten-5"
          >
            <div class="grey--text caption ml-3" style="text-align: left">提示：选择类别+关键词检索会使效率更高哦！！！</div>
            <!-- <v-divider class="mb-4"></v-divider> -->
            <v-radio-group v-model="key_type" row class="ml-3">
                <v-radio label="主题" value="theme"></v-radio>
                <v-radio label="作者" value="author"></v-radio>
                <v-radio label="篇名" value="title"></v-radio>
                <v-radio label="单位" value="orgnization"></v-radio>
                <v-radio label="被引文献" value="citedAticle"></v-radio>
                <v-radio label="摘要" value="abstract"></v-radio>
                <v-radio label="栏目信息" value="column_information"></v-radio>
            </v-radio-group>
            <v-divider class="mb-4"></v-divider>
            <v-layout class="ml-3">
              <v-flex xs6>
                <v-text-field outline label="请输入检索类别下的关键词" v-model="key_words"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>

          <v-btn
            color="primary"
            @click="goNext()"
          >
            继续
          </v-btn>

          <v-btn flat @click="e1 = 2">取消</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      timer: null,
      e1: 0,
      data_type: [],
      key_type: '',
      key_words: '',
      subject: '',
      subjects: ['计算机/联网/通信电子', '会计/金融/银行/保险', '贸易/消费/制造/营造', '制造/医疗', '广告/媒体', '房地产/建筑', '专业服务/鉴于/培训', '服务业', '物流/运输', '能源/原材料', '政府/非盈利组织', '其他']
    }
  },
  methods: {
    turnback () {
      alert('同学，确定要返回吗？')
    },
    goNext () {
      if (confirm('同学，确认开始检索么？')) {
        this.loading = true
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.$store.commit('noteUserInfos', {
            data_type: this.data_type,
            key_type: this.key_type,
            key_words: this.key_words,
            subject: this.subject
          })
          this.$router.push({name: 'home'})
        }, 3000)
      }
    }
  }
}
</script>
<style scoped>
.bg{
}
.layer2{
  height: 30%;
  width: 100%;
  background: #B388FF;
  opacity: 0.7;
  position: absolute;
  top: 0px;
  z-index: 0;
}
.layer3{
  height: 100%;
  width: 100%;
  background: grey;
  opacity: 0.9;
  position: absolute;
  top: 0px;
  z-index: 888
}
.progress{
  width: 100px;
  height: 100px;
  position: absolute;
  top: 25%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  z-index: 999
}
</style>
