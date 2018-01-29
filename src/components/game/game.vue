<template>
  <div class="game">
    <scroll ref="sc" :data="game">
      <div>
        <div class="gamebox" v-for="item in game" @click="select(item)">
          <img :src="item.spic">
          <p>{{item.name}}</p>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
    <loading v-show="!game.length"></loading>
  </div>
</template>

<script>
  import {url,params} from "../../api/getGame"
  import axios from "axios"
  import Scroll from "../../base/scroll/scroll"
  import Loading from "../../base/loading/loading"
  import {mapMutations} from "vuex"
    export default {
      data(){
        return {
          game:[]
        }
      },
      created(){
        this._getGame()
      },
      mounted(){
        this.$refs.sc.$el.style.height=`${document.documentElement.clientHeight-44}px`
      },
      methods:{
        _getGame(){
          axios.get(url,{params}).then((res)=>{
            this.game=res.data.data.games
            console.log(this.game)
          })
        },
        select(item){
          this.$router.push(
            {
              path:`/game/${item.id}`
            })
          this.getGamedetail(item)
        },
        ...mapMutations({
          getGamedetail:"SET_GAME_DETAIL"
        })
      },
      components:{
        Scroll,
        Loading
      }
    }
</script>

<style>
  .game{
    overflow: hidden;
  }
  .gamebox{
    width: 33.333%;
    display: inline-block;
    padding: 10px;
    box-sizing: border-box;
    background:#ebf0f3;
  }
  .gamebox img{
    width: 100%;
  }
  .gamebox p{
    text-align: center;
  }
</style>
