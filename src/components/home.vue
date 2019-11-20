<template>
  <div class="bg">
    <!-- layer遮罩层 -->
    <!-- <div class="layer">
    </div> -->
    <!-- layer遮罩层2 -->
    <div class="layer2">
    </div>

    <!-- <div class="pageHead"> -->
    <v-container grid-list-md>
      <v-layout>
        <v-flex xs2>
          <v-select :items="items" v-model="searchkey" solo></v-select>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            append-icon="search"
            solo
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <div class="pageBody"> -->
    <v-container grid-list-lg>
      <v-layout>
        <v-flex xs4>
          <v-card>
            <h2>论文引用榜</h2>
            <v-list>
              <template v-for="(article_data, index) in articles_quote" >
                <v-list-tile :key="article_data.paper_id" v-if="index < 10">
                    <!-- <v-list-tile-avatar>
                      <v-icon>favorite_border</v-icon>
                    </v-list-tile-avatar> -->
                    <v-list-tile-content @click="enterDownload(article_data)">
                      <v-list-tile-title>{{index+1}}.{{ article_data.paper_name }}</v-list-tile-title>
                      <v-list-tile-sub-title>引用次数：{{ article_data.quote }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <!-- <v-list-tile-action>
                      <v-btn>
                        <v-icon>download</v-icon>
                      </v-btn>
                    </v-list-tile-action> -->
                </v-list-tile>
                <v-divider avatar :key="index" v-if="index < 10"></v-divider>
              </template>
            </v-list>
            <div @click="openDialog1()">......</div>
            <!-- <v-layout row v-for="article_data in articles_data" :key="article_data.id">
              <v-flex>{{article_data.paper_id}}</v-flex>
            </v-layout> -->
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
            <h2>精彩论文抢先看</h2>
            <v-list>
              <template v-for="(article_data, index) in articles_time" >
                <v-list-tile :key="article_data.paper_id" v-if="index < 10">
                    <!-- <v-list-tile-avatar>
                      <v-icon>favorite_border</v-icon>
                    </v-list-tile-avatar> -->
                    <v-list-tile-content @click="enterDownload(article_data)">
                      <v-list-tile-title>{{index+1}}.{{ article_data.paper_name }}</v-list-tile-title>
                      <v-list-tile-sub-title>发布时间：{{ article_data.publish_time }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <!-- <v-list-tile-action>
                      <v-btn>
                        <v-icon>download</v-icon>
                      </v-btn>
                    </v-list-tile-action> -->
                </v-list-tile>
                <v-divider avatar v-if="index < 10" :key="index"></v-divider>
              </template>
            </v-list>
            <div @click="openDialog2()">......</div>
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card>
            <h2>论文热搜榜</h2>
            <v-list>
              <template v-for="(article_data, index) in articles_good" >
                <v-list-tile :key="article_data.paper_id" v-if="index < 10">
                    <!-- <v-list-tile-avatar>
                      <v-icon>favorite_border</v-icon>
                    </v-list-tile-avatar> -->
                    <v-list-tile-content @click="enterDownload(article_data)">
                      <v-list-tile-title>{{index+1}}.{{ article_data.paper_name }}</v-list-tile-title>
                      <v-list-tile-sub-title>搜索热力度：{{ article_data.paper_temperature }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <!-- <v-list-tile-action>
                      <v-btn>
                        <v-icon>download</v-icon>
                      </v-btn>
                    </v-list-tile-action> -->
                </v-list-tile>
                <v-divider avatar v-if="index < 10" :key="index"></v-divider>
              </template>
            </v-list>
            <div @click="openDialog3()">......</div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <div class="pageFoot"> -->
    <v-container grid-list-lg>
      <v-layout align-center justify-center fill-height>
        <v-flex xs6>
          <v-card dark class="secondary" style="text-align: left">
            <v-layout wrap>
              <v-flex xs12><h2 style="text-align: center">您的需求方向信息</h2></v-flex>
              <v-flex xs12><h3 class="ml-3">专业类别：{{subject}}</h3></v-flex>
              <v-flex xs12><h3 class="ml-3">期刊级别：{{data_type}}</h3></v-flex>
              <v-flex xs12><h3 class="ml-3">关键词类型：{{key_type}}</h3></v-flex>
              <v-flex xs12><h3 class="ml-3">关键词：{{key_words}}</h3></v-flex>
            </v-layout>
            <!-- <div style="height: 200px;width: 100%; vertical-align:middle; display: table-cell">
              <h2 class="ml-3">您选的方向信息</h2>
              <p>专业类别：{{requirements.subject}}</p>
              <p>期刊级别：{{requirements.data_type}}</p>
              <p>关键词类型：{{requirements.key_data}}</p>
              <p>关键词：{{requirements.key_word}}</p>
            </div> -->
          </v-card>
        </v-flex>
        <v-flex xs6>
          <!-- 模块分类 -->
          <v-layout  wrap>
            <v-flex  xs12 >
              <v-card dark class="primary" @click="toArticle()">
                <div style="height: 60px; line-height: 60px; cursor: pointer" router-link :to="{name: 'articles'}">
                  <h2> 选定方向的实时热度推荐</h2>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card dark class="info" @click="toHeatMap()">
                <div style="height: 60px; line-height: 60px">
                  <h2>选定方向的地区热度显示</h2>
                </div>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-card dark class="success" @click="toLab()">
                <div style="height: 60px; line-height: 60px">
                  <h2>选定方向的知名实验室介绍</h2>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="dialog"
      width="80vh"
      height="100vh"
    >
      <v-card>
        <v-card-title
          class="title grey lighten-2"
          primary-title
        >
          {{dialog_title}}
        </v-card-title>

        <v-card-text>
          <v-card>
            <v-list>
              <template v-for="(article_data, index) in lists.slice((currentPage - 1) * 15, currentPage * 15)">
                <v-list-tile :key="article_data.paper_id">
                    <!-- <v-list-tile-avatar>
                      <v-icon>favorite_border</v-icon>
                    </v-list-tile-avatar> -->
                    <v-list-tile-content @click="enterDownload(article_data)" style="border-bottom: 0.5px solid #e0e0e0">
                      <v-list-tile-title>{{index+1+15*(currentPage-1)}}.{{ article_data.paper_name }}</v-list-tile-title>
                      <v-list-tile-sub-title v-if="dialog_type === 1">引用次数：{{ article_data.quote }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title v-if="dialog_type === 2">发表时间：{{ article_data.publish_time }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title v-if="dialog_type === 3">搜索热力度：{{ article_data.paper_temperature }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-card-text>

        <div class="text-xs-center" v-if="lists.length !== 0">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="7"
          ></v-pagination>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: ['主题', '摘要', '单位', '作者', '篇名', '被引文献', '栏目信息'],
      searchkey: '主题',
      lists: [],
      dialog: false,
      dialog_title: '',
      dialog_type: 1,
      currentPage: 1
    }
  },
  created () {
    // console.log(this.requirements.data_type)
    axios.get('/paper/')
      .then(res => {
        this.$store.dispatch('retrieveData', res.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    toArticle () {
      this.$router.push({name: 'articles'})
    },
    toHeatMap () {
      this.$router.push({name: 'heatMap'})
    },
    toLab () {
      this.$router.push({name: 'lab'})
    },
    enterDownload (article) {
      sessionStorage.setItem('paper_id', article.paper_id)
      sessionStorage.setItem('author_id', article.author)
      this.$router.push({name: 'paper'})
    },
    openDialog1 () {
      this.dialog_type = 1
      this.currentPage = 1
      this.lists = this.articles_quote
      this.dialog_title = '论文引用榜'
      this.dialog = true
    },
    openDialog2 () {
      this.dialog_type = 2
      this.currentPage = 1
      this.lists = this.articles_time
      this.dialog_title = '论文实时榜'
      this.dialog = true
    },
    openDialog3 () {
      this.dialog_type = 3
      this.currentPage = 1
      this.lists = this.articles_good
      this.dialog_title = '论文热搜榜'
      this.dialog = true
    }
  },
  computed: {
    articles_quote () {
      return this.$store.getters.articles_quote
    },
    articles_time () {
      return this.$store.getters.articles_time
    },
    articles_good () {
      return this.$store.getters.articles_good
    },
    requirements () {
      return this.$store.getters.userRequirements
    },
    data_type () {
      if (this.requirements.data_type === undefined) {
        return '未选择'
      } else {
        var str = ''
        for (var i = 0, len = this.requirements.data_type.length; i < len; i++) {
          switch (this.requirements.data_type[i]) {
            case 'SCI':
              str += 'SCI' + ' '
              break
            case 'EI':
              str += 'EI' + ' '
              break
            case 'ISTP':
              str += 'ISTP' + ' '
              break
            case 'nationalA':
              str += '国家级期刊' + ' '
              break
            case 'provincialA':
              str += '省级期刊' + ' '
              break
            case 'coreA':
              str += '核心期刊' + ' '
              break
            case 'cnA':
              str += 'CN类期刊' + ' '
              break
          }
        }
        return str
      }
    },
    key_type () {
      if (this.requirements.key_type === undefined) {
        return '未选择'
      } else {
        switch (this.requirements.key_type) {
          case 'theme':
            return '主题'
          case 'author':
            return '作者'
          case 'title':
            return '篇名'
          case 'orgnization':
            return '单位'
          case 'citedArticle':
            return '被引文献'
          case 'abstract':
            return '摘要'
          case 'column_information':
            return '栏目信息'
        }
      }
    },
    subject () {
      if (this.requirements.subject === undefined) {
        return '未选择'
      } else {
        return this.requirements.subject
      }
    },
    key_words () {
      if (this.requirements.key_words === undefined) {
        return '未选择'
      } else {
        return this.requirements.key_words
      }
    },
    totalPages () {
      if (this.lists.length !== 0) {
        return Math.ceil(this.lists.length / 15)
      } else {
        return 15
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .layer{
  height: 100%;
  width: 100%;
  background: grey;
  opacity: 0.7;
  z-index: 0;
  position: absolute;
  top: 0px;
} */
h2,h3{
  /* font-family: 'myfontfamily' */
}
.layer2{
  height: 30%;
  width: 100%;
  background: #B388FF;
  opacity: 0.7;
  position: absolute;
  top: 0px;
}
.bg{
  /* height: 100%; */
  /* position: relative; */
}
.pageHead{
  height: 300px;
  width: 100%;
  z-index: 3;
  /* background-size: auto; */
  /* background-position: bottom */
}
.pageBody{
  position: absolute;
  width: 100%;
  /* height: 500px; */
  top: 20%;
}
.pageFoot{
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: 0

}
</style>
