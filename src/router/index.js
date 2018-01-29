import Vue from 'vue'
import Router from 'vue-router'



import Recommend from "../components/recommend/recommend"
import Video from "../components/video/video"
import Game from "../components/game/game"
import Search from "../components/search/search"
import VideoDetail from "../components/video-detail/video-detail"
import gameVideo from "../components/gameVideo/gameVideo"

Vue.use(Router)
export default new Router({
  routes:[
    {
      path:"/",
      redirect:"/recommend"
    },
    {
      path:"/recommend",
      component:Recommend,
      children:[
        {
          path:":id",
          component:VideoDetail
        }
      ]
    },
    {
      path:"/video",
      component:Video,
      children:[
        {
          path:":id",
          component:VideoDetail
        }
      ]
    },
    {
      path:"/game",
      component:Game,
      children:[
        {
          path:":id",
          component:gameVideo,
          children:[
            {
              path:":id",
              component:VideoDetail
            }

          ]
        }
      ]
    },
    {
      path:"/search",
      component:Search
    }
  ]
})
