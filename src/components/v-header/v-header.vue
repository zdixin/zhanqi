<template>
  <div class="header">
    <p :class="bgs" @click="open">
      <router-link to="recommend" >直播</router-link>
    </p>
    <p @click="open1" :class="bgs1">
      <router-link to="video">视频</router-link>
    </p>
    <p @click="open2" :class="bgs2">
      <router-link to="game">游戏</router-link>
    </p>
    <p @click="open3" :class="bgs3">
      <router-link to="search">搜索</router-link>
    </p>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          index:1
        }
      },
        computed:{
          bgs(){
            return this.index==1?'bg':''
          },
          bgs1(){
            return this.index==2?'bg':''
          },
          bgs2(){
            return this.index==3?'bg':''
          },
          bgs3(){
            return this.index==4?'bg':''
          }
        },
      methods:{
        open(){
          this.index=1
        },
        open1(){
          this.index=2
          console.log(this.index)
        },
        open2(){
          this.index=3
          console.log(this.index)
        },
        open3(){
          this.index=4
          console.log(this.index)
        }
      }
    }
</script>

<style>
  *{
    padding:0;
    margin: 0;
  }
  .header{
    display:flex;
    height: 44px;
    background: wheat;
    z-index: 1000;
  }
  .header a{
    display: block;
  }
  .header p{
   width: 25%;
   height: 44px;
   text-align: center;
   line-height: 44px;
   font-size: 20px;
   font-weight: bold;
  }
 a{
   color: black;
   text-decoration: none;
 }
  .header .bg{
    height: 44px;
    background: orangered;
    color: white;
    border-radius: 5px;
  }

</style>
