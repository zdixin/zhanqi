<template>
    <div class="search">
      <div class="search-box">
        <div class="search-input"><input ref="input" type="text" /></div>
        <p class="search-btn" @click="_getSearch(),_getSearchlive()">搜索</p>
      </div>
      <div v-show="this.zhubo.length!=0">
      <div class="play-list-box">
        <div class="list">
          <div class="title">主播</div>
          <div v-for="item in zhubo">
          <div class="list-item-box">
            <img :src="`${item.avatar}-small`">
            <div class="nickbox">
              <span class="nickname">{{item.nickname}}</span>
              <span class="love">{{item.docTag.follows}}人订阅</span>
            </div>
          </div>
          </div>
          <div class="list-item-box">
            <p class="mode" @click="_getSearchs()">查看更多相关主播</p>
          </div>
        </div>
      </div>

      <div class="play-list-box" v-show="this. Live.length!=0">
        <div class="list">
          <div class="title">直播</div>

          <div class="list-item-box2">
            <div class="box" v-for="item in Live">
              <div class="videoBox">
                <div class="video"><img :src="item.spic"></div>
                <p class="mask">{{item.title}}</p>
              </div>
              <div class="name">
                <p class="nickname">{{item.nickname}}</p><p class="num">{{item.docTag.online}}</p>
              </div>
            </div>
          </div>
          <div class="list-item-box">
            <p class="mode">查看更多相关主播</p>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
  import {url,params} from "../../api/getSearch"
  import axios from "axios"
    export default {
      data(){
          return {
            zhubo:[],
            page:1,
            vaule:null,
            Live:[]
          }
      },
      created(){

      },
      mounted(){

      },
      methods:{
        _getSearch(){
          this.value = this.$refs.input.value;
          if(this.value.length==0){
            return
          }
          axios.get(url,{
            params:{
              q:this.value,
              nums:2,
              t:"anchor"
            }
          }).then((res)=>{
            this.zhubo= res.data.data
          })
        },
        _getSearchlive(){
          this.value = this.$refs.input.value;
          if(this.value.length==0){
            return
          }
          axios.get(url,{
            params:{
              q:this.value,
              nums:2,
              t:"live"
            }
          }).then((res)=>{
            this.Live=res.data.data
          })
        },
        _getSearchs(){
          this.value = this.$refs.input.value;
          this.page=this.page+1;
          axios.get(url,{
            params:{
              q:this.value,
              page:this.page,
              nums:10,
              t:"anchor"
            }
          }).then((res)=>{
            this.zhubo=res.data.data
          })
        },
        // //过滤特殊符号
        // _changeFont(item){
        //   console.log(item);
        // }
      },
      watch:{
        value(newval){
            this.page=1;
        }
      }
    }
</script>

<style>
  .search .search-box{
    width: 100%;
    height: 44px;
    padding: 10px 10px 0 10px;
    border-bottom: 1px solid #999999;
    border-top: 1px solid #999999;
  }
  .search .search-box .search-input{
    border-radius: 28px;
    height: 28px;
    width: 75%;
    border: 1px solid #cccccc;
    display: inline-block;
  }
  .search .search-box .search-input input{
    border: none;
    width: 85%;
    margin-left: 15px;
    outline: none;
    height: 20px;
  }
  .search .search-box .search-btn{
    color: deepskyblue;
    float: right;
    height: 35px;
    width: 50px;
    text-align: center;
    line-height: 30px;
    margin-right: 5%;
    font-weight: bold;
  }
  .search .play-list-box{
    width: 100%;
    padding-left: 5%;
  }
  .search .play-list-box .list .title{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: normal;
    border-bottom: 1px solid #ccc;
  }
  .search .list-item-box{
    height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .search .list-item-box img{
    height:40px;
    width:40px;
    float: left;
    margin-right: 10px;
    margin-top: 10px;
  }
  .search .list-item-box .nickbox{
    float: left;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .search .list-item-box .nickbox .nickname{
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .search .list-item-box .nickbox .love{
    color: #999999;
    font-size: 14px;
  }
  .search .list-item-box .mode{
    color: cornflowerblue;
    font-size: 16px;
    line-height: 60px;
    text-indent: 15px;
    clear: left;
  }
  .play-list-box .list-item-box2 .box{
    border-bottom: 1px solid #cccccc;
    width: 50%;
    display: inline-block;
    padding: 5px;
    box-sizing: border-box;
  }
  .play-list-box .list-item-box2 .box .videoBox{
    position: relative;
    width: 100%;
  }
  .play-list-box .list-item-box2 .videoBox img{
    width: 100%;
  }
  .play-list-box .list-item-box2 .videoBox .mask{
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: white;
    width: 100%;
  }
  .play-list-box .list-item-box2 .box .name{
    width: 100%;
  }
  .play-list-box .list-item-box2 .box .name .nickname{
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    float: left;
    font-size: 14px;
    color: #999999;
  }
  .play-list-box .list-item-box2 .box .name .num{
    float: right;
    font-size: 14px;
    color: #999999;
  }
</style>
