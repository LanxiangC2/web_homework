<template>
  <v-container grid-list-lg>
    <h2 style="font-family: 'myfontfamily2'; color: black">论文介绍</h2>
    <v-layout row wrap fill-height align-center>
      <v-flex xs4>
        <v-card class="mx-auto"  color="#26c6da" dark >
          <v-card-title>
            <span class="title font-weight-light">作者简介</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{author.author_introduce}}
          </v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-avatar color="grey darken-3">
                <v-img v-if="author.author_img"
                  :src="author.author_img"
                  class="elevation-6"
                  alt="无"
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  <div>{{author.author_name}} / {{author.author_country}} &nbsp;&nbsp;&nbsp; 热度值 {{author.author_temperature}}</div>
                </v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card class="mx-auto"  color="#26c6da" dark >
          <v-card-title>
            <span class="title font-weight-light">论文名</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{paper.paper_name}}
          </v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-content>
                <v-list-tile-title></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex xs8>
        <v-card class="mx-auto"  color="#26c6da" dark >
          <v-card-title>
            <span class="title font-weight-light">摘要</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{paper.desc}}
          </v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-content>
                <v-list-tile-title></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs4>
        <v-card class="mx-auto"  color="#26c6da" dark >

          <v-card-text class="font-weight-bold">
            <div class="text-xs-left"><span style="background:grey; font-weight: normal">&nbsp;&nbsp;其他信息&nbsp;&nbsp;</span></div>
            <div><span>方向</span>：{{paper.research_direction}}</div>
            <div><span>发布时间</span>：{{paper.publish_time}}</div>
            <div><span>引用次数</span>：{{paper.quote}}</div>
            <div><span>期刊名</span>：{{paper.Journal}}</div>
            <div><span>期刊数据库</span>：{{paper.JournalDatabase}}</div>
            <div><span>下载次数</span>：{{paper.download_number}}</div>
            <div><span>文章热度</span>：{{paper.JournalDatabase}}</div>
            <div><span>期刊复合影响因子</span>：{{paper.composite_factor}}</div>
            <div><span>期刊综合影响因子</span>：{{paper.Comprehensive_factor}}</div>
            <v-divider color='white' class='my-2'></v-divider>
            <div class="text-xs-left"><span style="background:grey; font-weight: normal">&nbsp;&nbsp;评分&nbsp;&nbsp;</span></div>
            <div class="text-xs-center">
              <v-rating v-model="rating" color="secondary"></v-rating>
            </div>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
    <v-divider color='white'></v-divider>
    <h2 style="font-family: 'myfontfamily2'; color: black; text-align: left"><span style="background: white">下载链接</span></h2>
    <v-layout>
      <v-flex xs12>
        <v-card color="#26c6da" class="link">
          <p class='ma-1' style="text-align: left"><a :href="paper.downloadLink" target="_blank"><span style="color: 'white">{{paper.downloadLink}}</span></a></p>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider color='white'></v-divider>
    <h2 style="font-family: 'myfontfamily2'; color: black; text-align: left"><span style="background: white">精彩评论</span></h2>
    <v-layout wrap v-for="(comment,index) in comments" :key="index">
      <v-flex xs2 class="avatar">
        <v-avatar color="indigo" size="48px">
          <v-icon dark>account_circle</v-icon>
        </v-avatar>
        <div class="white--text" style="height: 24px;line-height: 24px;overflow: hidden; text-overflow: ellipsis">{{comment.name}}</div>
      </v-flex>
      <v-flex xs10 class="comment">
        <v-textarea solo :value='comment.message' rows='3' disabled>
        </v-textarea>
      </v-flex>
    </v-layout>
    <v-divider color='white'></v-divider>
    <v-layout wrap>
      <v-flex xs12>
        <v-textarea rows='5' solo placeholder="请输入您的精彩评论" clearable v-model="mycomment"></v-textarea>
      </v-flex>
      <v-flex class="submit">
        <v-btn @click="submit()">提交</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    comments: [
      {id: 1, name: '云中一抹浅浅的笑weeeeeeeeeeeeee', message: '论文不错'},
      {id: 2, name: '爱在西元前', message: '作者太厉害了'},
      {id: 3, name: '媚者无疆', message: '学到了学到了'},
      {id: 4, name: '画江湖', message: '大佬大佬'}
    ],
    mycomment: '',
    rating: 0
  }),
  computed: {
    paper () {
      return this.$store.getters.paper
    },
    author () {
      return this.$store.getters.authorData
    }
  },
  created () {
    var paperId = sessionStorage.getItem('paper_id')
    var authorId = sessionStorage.getItem('author_id')
    // console.log(paperId)
    // 获取文章
    axios.get('/paper/' + paperId + '/')
      .then(res => {
        this.$store.dispatch('retrievePaper', res.data)
        // console.log(this.$store.state.paper)
      })
    // 获取作者信息
    axios.get('/author/' + authorId + '/')
      .then(res => {
        this.$store.dispatch('retrieveAuthor', res.data)
        console.log(this.$store.state.authorData)
      })
  },
  mounted () {
  },
  methods: {
    submit () {
      this.comments.push({name: '罗小黑', message: this.mycomment})
      this.mycomment = ''
    }
  }
}
</script>
<style scoped>
.comment{
  /* margin-top: 20px  */
}
.avatar{
  margin-top: 10px
}
.submit{
  margin-top: -30px
}
.link{
  overflow: auto
}
a{
  color: white
}
a:hover{
  color: grey
}
</style>
