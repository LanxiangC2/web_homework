<template>
  <div class="bg">
    <!-- layer遮罩层 -->
    <!-- <div class="layer">
    </div> -->
    <!-- layer遮罩层2 -->
    <div class="layer2">
    </div>

    <div class="pageHead">
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
    </div>
    <div class="pageBody">
      <v-container grid-list-lg>
        <v-layout>
          <v-flex xs4>
            <v-card>
              <h2>论文引用榜</h2>
              <v-list>
                <template v-for="(article_data, index) in articles_data" >
                  <v-list-tile :key="article_data.name" v-if="index < 5">
                      <!-- <v-list-tile-avatar>
                        <v-icon>favorite_border</v-icon>
                      </v-list-tile-avatar> -->
                      <v-list-tile-content>
                        <v-list-tile-title>{{index+1}}.{{ article_data.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ article_data.subtitle }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <!-- <v-list-tile-action>
                        <v-btn>
                          <v-icon>download</v-icon>
                        </v-btn>
                      </v-list-tile-action> -->
                  </v-list-tile>
                  <v-divider avatar :key="index"></v-divider>
                </template>
              </v-list>
              <div>......</div>
              <!-- <v-layout row v-for="article_data in articles_data" :key="article_data.id">
                <v-flex>{{article_data.name}}</v-flex>
              </v-layout> -->
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card>
              <h2>精彩论文抢先看</h2>
              <v-list>
                <template v-for="(article_data, index) in articles_data" >
                  <v-list-tile :key="article_data.name">
                      <!-- <v-list-tile-avatar>
                        <v-icon>favorite_border</v-icon>
                      </v-list-tile-avatar> -->
                      <v-list-tile-content>
                        <v-list-tile-title>{{index+1}}.{{ article_data.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ article_data.subtitle }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <!-- <v-list-tile-action>
                        <v-btn>
                          <v-icon>download</v-icon>
                        </v-btn>
                      </v-list-tile-action> -->
                  </v-list-tile>
                  <v-divider avatar v-if="index < items.length" :key="index"></v-divider>
                </template>
              </v-list>
              <div>......</div>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card>
              <h2>论文热搜榜</h2>
              <v-list>
                <template v-for="(article_data, index) in articles_data" >
                  <v-list-tile :key="article_data.name">
                      <!-- <v-list-tile-avatar>
                        <v-icon>favorite_border</v-icon>
                      </v-list-tile-avatar> -->
                      <v-list-tile-content>
                        <v-list-tile-title>{{index+1}}.{{ article_data.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ article_data.subtitle }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <!-- <v-list-tile-action>
                        <v-btn>
                          <v-icon>download</v-icon>
                        </v-btn>
                      </v-list-tile-action> -->
                  </v-list-tile>
                  <v-divider avatar v-if="index < items.length" :key="index"></v-divider>
                </template>
              </v-list>
              <div>......</div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div class="pageFoot">
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
                <v-card dark class="primary" >
                  <div style="height: 60px; line-height: 60px">
                    <h2> 选定方向的实时热度推荐</h2>
                  </div>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card dark class="info">
                  <div style="height: 60px; line-height: 60px">
                    <h2>选定方向的地区热度显示</h2>
                  </div>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card dark class="success">
                  <div style="height: 60px; line-height: 60px">
                    <h2>选定方向的知名实验室介绍</h2>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: ['主题', '摘要', '单位', '作者', '篇名', '被引文献', '栏目信息'],
      searchkey: '主题'
    }
  },
  created () {
    // console.log(this.requirements.data_type)
  },
  computed: {
    articles_data () {
      return this.$store.getters.articles_data
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
h2{
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
