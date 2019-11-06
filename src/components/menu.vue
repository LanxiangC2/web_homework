<template>
  <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      absolute
      temporary
    >
      <v-list class="pa-1 primary" dark>
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561220741323&di=f01d2a9ec5660ae82ee1497473f0d369&imgtype=0&src=http%3A%2F%2Fd.ifengimg.com%2Fw600%2Fp0.ifengimg.com%2Fpmop%2F2018%2F0628%2FAD37B2936BD0D32FE88157FBE121B4ACCD8B61CA_size61_w682_h657.jpeg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>菜单栏</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list dense >
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          router :to="item.route"
          class="my-2 mx-2"
        >
          <v-list-tile-action>
            <v-icon >{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import Bus from '../assets/Bus'
export default {

  data () {
    return {
      drawer: null,
      items: [
        {title: '场景管理', icon: 'question_answer', route: '/scene/'},
        {title: '节点管理', icon: 'dashboard', route: '/nodes/'},
        {title: '任务配置', icon: 'build', route: '/tasks/'},
        {title: '任务管理', icon: 'receipt', route: '/taskManagement/'}
      ],
      mini: false,
      right: null
    }
  },
  watch: {
  },
  created () {
    Bus.$on('openMenu', msg => {
      this.drawer = !this.drawer
    })
  }
}
</script>
