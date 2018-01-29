<template>
  <div class="video-detail" :data="playerDetail">
    <div class="videobox">
      <!--<img class="bgimg" v-lazy="playerDetail.spic">-->
      <!--<video class="v1">-->
      <!---->
      <!--</video>-->
      <video-player  class="v2" :options="playerOptions">

      </video-player>
    </div>
    <div class="title">
      <div class="chat active" @click="_selectChat" ref="chat">聊天</div>
      <div class="chat" @click="_getNewvideo" ref="live">主播</div>
    </div>
    <div class="chartbox" ref="chatbox" >
      <span class="nickname">zdxzdxz:</span>
      <span class="conter">围观围个观围个围个观围个围个观围个观围个观围个观</span>
    </div>
    <div class="zhubo" ref="zhubo" style="display: none;">
      <div class="header">
        <img v-lazy="`${playerDetail.avatar}-medium`" alt="">
        <div class="detailbox">
          <p class="name">{{playerDetail.nickname}}</p>
          <p class="nowplay">正在直播：<span>{{playerDetail.gameName}}</span></p>
        </div>
        <p class="like">关注</p>
      </div>
      <div class="select">
        <p>最新视频</p>
        <p>热门推荐</p>
      </div>
      <div class="selectbox">
        <div class="item" v-for="item in news">
          <div class="videobox">
            <img class="bgimg1" :src="item.spic">
            <video class="v2" :src="item.playUrl" controls="controls" autoplay="autoplay" playsinline="true"></video>
          </div>
          <div class="videonick">
            <p class="name2">{{item.title}}</p>
            <span class="s1">{{item.updatedAt}}</span><span class="s2">{{item.playCnt}}</span>
          </div>
          <div v-show="news.length==0">暂无视频</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import axios from "axios"
  import {url,params} from "../../api/getPlaydetail"
  import {urla,paramsa} from "../../api/getNewvideo"
  import {videoPlayer} from "vue-video-player"
  // import videojs from "video.js"

  // window.videojs=videojs
    export default {
      data(){
        return {
          playerDetail:[],
          news:[],
          playerOptions: {
            autoplay: true, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            // loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: "application/x-mpegURL",
              // src: `http://alhls.cdn.zhanqi.tv/zqlive/${this.playerDetail.videoId}.m3u8`
              src:`http://alhls.cdn.zhanqi.tv/zqlive/30409_oPNVb.m3u8`
            }],
            controlBar: {
              // timeDivider: false,
              // durationDisplay: false
            },
            // poster: `${this.playerDetail.spic}`,
            width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试',
          }
        }

      },
      mounted(){
        this._getPlayer();
      },
      computed:{
        ...mapGetters(["player"])
      },
      methods:{
        _getPlayer(){
          if(!this.player.id){
            this.$router.push('/recommend');
            return;
          }
          this.params=this.player.code
          axios.get(url,{
            params:{
              id:this.params
            }
          }).then((data)=>{
              this.playerDetail=data.data.data;
          })
        },
        _getNewvideo(){

          axios.get(urla,{
            params:{
              id:this.playerDetail.uid
            }
          }).then((data)=>{
            this.news=data.data.data.data
            console.log(this.news)
          })
          this.$refs.chatbox.style.display="none"
          this.$refs.zhubo.style.display="block"
          this.$refs.chat.classList.remove('active')
          this.$refs.live.classList.add('active')
        },
        _selectChat(){
          this.$refs.chatbox.style.display="block"
          this.$refs.zhubo.style.display="none"
          this.$refs.chat.classList.add('active')
          this.$refs.live.classList.remove('active')
        }

      },
      components:{
        videoPlayer
      }
    }
</script>

<style>
  .video-detail{
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
  }
  .videobox{
    position: relative;
  }
  .bgimg{
    position: absolute;
    width: 100%;
    height: 210px;
  }
  .v1{
    width: 100%;
    height: 210px;
  }
  .title{
    height: 44px;
    width: 100%;
  }
  .title .chat{
    width: 50%;
    text-align: center;
    line-height: 35px;
    border-bottom: 1px solid #ccc;
  }
  .chartbox{
    width: 100%;
  }
  .nickname{
    color: #999;
  }
  .nickname,.conter{
    padding: 2px;
  }
  .active{
    color: crimson;
  }
  .zhubo{
    width: 100%;
    /*height: 100%;*/

  }
  .zhubo .header{
    height: 80px;
    padding: 5px;
    background: white;
  }
  .zhubo .header img{
    height: 70px;
    width: 70px;
    border-radius:50%;
    margin-right: 5px;
  }
  .zhubo .detailbox .name{
    font-size: 14px;
    width: 90%;
    height: 30px;
    line-height: 30px;
    margin-top: 5px;
  }
  .zhubo .detailbox .nowplay{
    color: #999;
    font-size: 9px;
    width: 150px;
    height: 30px;
    line-height: 30px;
  }
  .zhubo .detailbox .nowplay span{
    color: aquamarine;
    margin-right: 20px;
  }
  .header .like{
    font-size: 12px;
    height: 20px;
    width: 50px;
    background: aqua;
    color: white;
    text-align: center;
    line-height: 20px;
    margin-left: 40px;
    border-radius: 10px;
    margin-top: 10px;
  }
  .select{
    height: 40px;
  }
  .select p{
    float: left;
    width: 50%;
    text-align: center;
    border-top: 1px solid #ccc;
    line-height: 40px;
  }
  .v2{
    width: 50%;
  }
  .selectbox .item{
    width: 50%;
    float: left;
    padding: 10px;
    box-sizing: border-box;
  }
  .videonick span{
    font-size: 10px;
    color: #999;
  }
  .videonick .name2{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    display: inline-block;
  }
  .bgimg1{
    width: 100%;
    height: 100px;
  }
  .videonick .s1{
    display: inline-block;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .videonick .s2{
    float: right;
  }
</style>
