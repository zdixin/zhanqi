import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import VueLazyload from 'vue-lazyload'
import videoPlayer from 'vue-video-player'

require ('videojs-contrib-hls');

Vue.use(VueResource)

// videoPlayer.config({
//   youtube:true,
//   switcher:true,
//   hls:true
// })

Vue.use(videoPlayer)

Vue.use(VueLazyload,{
  loading:require('./common/img/logo.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
