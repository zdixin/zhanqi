<template>
  <div>
  <div class="videolist" :data="data">
    <div class="title"><p></p>{{data[0].title}}</div>
    <div class="bigbox" ref="bigbox">
      <div class="boxitems" ref="boxitems">
        <div class="box" v-for="item in data[0].lists" @click="selectItem(item)">
          <div class="videoBox">
            <div class="video"><img  v-lazy="item.bpic"></div>
            <p class="mask">{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import {mapMutations} from "vuex"

  export default {
      props:{
        data:{
          type:Array,
          default:[]
        }
      },
      mounted(){
        this._nowinit();
        this._initScroll();
      },
      methods:{
       //初始化
        _initScroll(){
          new BScroll(this.$refs.bigbox,{
            snap:{speed:400},
            scrollX:true,  //横向滚动
            momentum:true,  //滑动时，图片跟着滚动
            click:true   //允许阻止默认点击事件
          })
        },
        //计算宽度
        _nowinit(){
          this.children = this.$refs.boxitems.children;
          let width =0;
          for(let i=0;i<this.children.length;i++){
            let itemWidth = this.children[0].clientWidth;
            let child = this.children[i];
            width+=itemWidth;
          }
          this.$refs.boxitems.style.width=width+'px';
        },
        //点击选择每项
        selectItem(item){
          this.$router.push({
            path:`/recommend/${item.id}`
          });
          this.setPlayer(item);
        },
        ...mapMutations(
          {
            setPlayer:"SET_PLAYER"
          }
        )
      }
    }
</script>

<style>
  .bigbox{
    position: relative;
    overflow: hidden;
    height: 100px;
  }
  .box{
    padding: 3px;
    display: inline-block;
  }
  .boxitems{
    position: absolute;
    left: 0;
    top: 0;
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
    width:178px;
    height: 100px;
  }
  .mask{
    width: 178px;
    height: 30px;
    line-height: 30px;
    text-indent: 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: white;
    background: rgba(0,0,0,.4);
  }
</style>
