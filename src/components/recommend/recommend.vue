<template>
    <div class="recommend" ref="recommend">
      <scroll ref="sc" :data="recommends">
        <div>
          <div class="slider-wrapper" v-if="recommends.length">
            <slider>
              <div v-for="item in recommends">
                <a>
                  <img :src="item.spic">
                </a>
              </div>
            </slider>
          </div>
        <video-list :data="videos" v-if="videos.length"></video-list>
        <video-lists :data="videos" v-if="videos.length"></video-lists>
        </div>
      </scroll>
      <router-view></router-view>
      <loading v-show="!videos.length"></loading>
    </div>

</template>

<script>
  import axios from "axios"
  import Slider from '../../base/slider/slider'
  import VideoList from '../../base/video-List/video-List'
  import VideoLists from '../../base/video-Lists/video-Lists'
  import Scroll from "../../base/scroll/scroll"
  import Loading from "../../base/loading/loading"
  export default {
    data(){
      return {
        recommends:[],
        videos:[]
      }
    },
      created(){
        this._getRecommend();
        this._getVideo();
      },
      mounted(){
      setTimeout(()=>{
        this.$refs.sc.$el.style.height=`${document.documentElement.clientHeight-44}px`
      },30)

      },
      methods:{
        _getRecommend(){
          axios.get("http://localhost:9999/api/getRecommend").then((res)=>{
            this.recommends=res.data.data

          })
        },
        _getVideo(){
          axios.get("http://localhost:9999/api/getVideo").then((res)=>{
            this.videos=res.data.data
          })
        }
      },
    components:{
      Slider,
      VideoList,
      VideoLists,
      Loading,
      Scroll
    }
    }
</script>

<style>
  .recommend{
    height: 100%;
    overflow: hidden;
    background: white;
  }
</style>
