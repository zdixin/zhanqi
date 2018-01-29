<template>
  <div class="videos">
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
  import {url,params} from "../../api/getNowplay"
  import Scroll from "../../base/scroll/scroll"
  import Loading from "../../base/loading/loading"
  import {mapMutations} from  "vuex"
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
        this.$refs.sc.$el.style.height=`${document.documentElement.clientHeight-44}px`
      },
        methods:{
          _getNowplay(){
            axios.get(url,{
              params:{
                page:this.page
              }
            }).then((res)=>{
              this.rooms=res.data.data.rooms
            })
          },
          Loginmode(){
            this.page=this.page+1;
            axios.get(url,{
              params:{
                page:this.page
              }
            }).then((res)=>{
              this.rooms=this.rooms.concat(res.data.data.rooms);
              console.log(this.rooms)
            })
          },
          select(item){
            this.$router.push({
              path:`/video/${item.id}`
            })
            this.setPlayer(item);
          },
          ...mapMutations(
            {
              setPlayer:"SET_PLAYER"
            }
          )
        },
      computed:{

      },
      components:{
        Scroll,
        Loading
      }
    }
</script>

<style>
  .videos{
    overflow: hidden;
    width: 100%;
  }
  .videos img{
    width:100%;
  }
  .videos .box{
    width: 50%;
    padding: 5px;
    box-sizing: border-box;
  }
  .mask{
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
  .videos .Loginmode{
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: deepskyblue;
    font-size: 16px;
    text-align: center;
  }
</style>
