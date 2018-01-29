<template>
  <div class="gamevideos">
    <scroll ref="sc" :listenScoll="true" :data="rooms">
      <div ref="boxHeight">
        <div class="box" v-for="item in rooms" @click="select(item)">
          <div class="videoBox">
            <div class="video"><img  v-lazy="item.bpic"></div>
            <p class="mask">{{item.title}}</p>
          </div>
          <div class="name">
            <p class="nickname">{{item.nickname}}</p><p class="num">{{item.online}}</p>
          </div>
        </div>
        <div class="Loginmode" @click="Loginmode()">点击加载更多</div>
      </div>
      <router-view></router-view>
    </scroll>
    <loading v-show="!rooms.length"></loading>
  </div>
</template>

<script>
  import axios from "axios"
  import {url,params} from "../../api/getgameVideo"
  import Scroll from "../../base/scroll/scroll"
  import Loading from "../../base/loading/loading"
  import {mapMutations} from  "vuex"
  import {mapGetters} from "vuex"
  export default {
    components: {Scroll},
    data(){
      return {
        rooms:[],
        page:1
      }
    },

    created(){
      this._getNowplay()
    },
    mounted(){
      this.$refs.sc.$el.style.height=`${document.documentElement.clientHeight}px`

    },
    methods:{
      _getNowplay(){
        axios.get(url,{params:{
          id:this.game.id
        }}).then((res)=>{
          page:this.page,
          this.rooms=res.data.data.rooms
        })
      },
      Loginmode(){
        this.page=this.page+1
        axios.get(url,{params:{
            page:this.page,
            id:this.game.id
          }}).then((res)=>{
          this.rooms=this.rooms.concat(res.data.data.rooms)
        })
      },
      select(item){
        this.$router.push(
          {
            path:`/game/${this.game.id}/${item.id}`
          }
        )
        this.getGameDetail(item)
      },
      ...mapMutations({
        getGameDetail:"SET_PLAYER"
      })
    },
    computed:{
      ...mapGetters(["game"])
    },
    components:{
      Scroll,
      Loading
    }
  }
</script>

<style>
  .gamevideos{
    background: white;
    overflow: hidden;
    position: absolute;
    top:0;
    width: 100%;
  }
  .gamevideos .box{
    width: 50%;
    padding: 5px;
    box-sizing: border-box;
  }
  .gamevideos .videoBox .video{
    width: 100%;
  }
  .gamevideos .videoBox .video img{
    width: 100%;
  }
  .gamevideos .videos img{
    width:100%;
  }
  .gamevideos .mask{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-indent: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    background: rgba(0,0,0,.4);
  }
  .gamevideos .Loginmode{
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: deepskyblue;
    font-size: 16px;
    text-align: center;
  }
</style>
