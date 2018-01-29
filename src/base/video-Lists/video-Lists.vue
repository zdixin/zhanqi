<template>
  <div class="videolist" :data="newdata">
    <div v-for="item in newdata">
    <div class="title"><p></p>{{item.title}}</div>
    <div class="box" v-for="item in item.lists" @click="selectItem(item)">
      <div class="videoBox">
        <div class="video"><img  v-lazy="item.bpic"></div>
        <p class="mask">{{item.title}}</p>
      </div>
      <div class="name">
        <p class="nickname">{{item.nickname}}</p><p class="num">{{item.online}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from "vuex"
  export default {
    data(){
      return {
        newdata:[]
      }
    },
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    created(){
      this._sliceArry()
    },
    methods:{
      _sliceArry(){
        this.newdata=this.data.slice(1,6)
        console.log(this.data)
      },
      //选择对应的每项
      selectItem(item){
        this.$router.push({
          path:`/recommend/${item.id}`
        });
        this.setPlayer(item);
      },
      ...mapMutations({
        setPlayer:"SET_PLAYER"
      })
    }
  }
</script>

<style>
  .box{
    padding: 3px;
  }
  .title{
    width: 100%;
    height: 35px;
    font-weight: bold;
    line-height: 35px;
    display: flex;
    padding-top: 6px;
  }
  .title p{
    margin:6px 3px;
    width: 6px;
    height: 25px;
    background: aqua;
  }
  .videoBox{
    width: 100%;
    position: relative;
  }
  .video,.video img{
    height: 100px;
  }
  .mask{
    height: 30px;
    line-height: 30px;
    text-indent: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    background: rgba(0,0,0,.4);
  }
  .name{
    font-size: 13px;
    display: flex;
    height: 35px;
    line-height: 35px;
    text-indent: 5px;
    color: #999;
  }
  .nickname{
    width: 100px;
    overflow: hidden;
  }
  .num{
    margin-left: 20px;
  }
  .videolist .sss .box{
    width: 50%;
    padding: 5px;
    box-sizing: border-box;
  }
  .videolist .sss .box .videoBox{
    width: 100%;
  }
  .videolist .sss .box .videoBox .video{
    width: 100%;
  }
  .videolist .sss .box .videoBox .video img{
    width: 100%;
  }
  .videolist .sss .box .videoBox .mask{
    width: 100%;
  }
</style>

