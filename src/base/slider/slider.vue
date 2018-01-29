<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span :class="['dot',{'active':index==currentPageIndex}]" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>
<script>
  import BScroll from "better-scroll"
  export default {
    data(){
      return {
        dots:[],   //小圆点的个数
        currentPageIndex:0
      }
    },
    props:{
      loop:{
        type:Boolean,
        default:true
      },
      autoplay:{
        type:Boolean,
        default:true
      },
      inrterval:{
        type:Number,
        default:3000
      }
    },
    mounted(){
      setTimeout(()=>{
        this._setSliderWidth();
        this._initSlider();
        this._initDots();
        if(this.autoplay){
          this._play();
        }
      },30)
      window.addEventListener('resize',()=>{  //监听屏幕尺寸改变
        if(!this.slider){
          return
        }
        this._setSliderWidth(true);   //重新计算宽度
        this.slider.refresh();
      })
      this.$refs.slider.addEventListener('touchstart',()=>{
        if(this.autoplay){
          clearTimeout(this.timer)
        }
      })
      this.$refs.slider.addEventListener('touchend',()=>{
        if(this.autoplay){
          clearTimeout(this.timer);
          this._play();
        }
      })
    },
    methods:{
      //初始化轮播图
      _initSlider(){
        this.slider = new BScroll(this.$refs.slider,{
          snap:{loop:this.loop,threshold:0.1,speed:400},
          scrollX:true,  //横向滚动
          momentum:true,  //滑动时，图片跟着滚动
          click:true   //允许阻止默认点击事件
        })
        this.slider.on('scrollEnd',()=>{
          let pageIndex = this.slider.getCurrentPage().pageX;  //pageX表示第几页。
          if(this.loop){
            pageIndex-=1;
          }
          this.currentPageIndex = pageIndex;
          if(this.autoplay){
            clearInterval(this.timer);
            this._play();
          }
        })
      },
      //计算轮播轮播图的宽度
      _setSliderWidth(isResize){
        this.childrens=this.$refs.sliderGroup.children;
        let width=0; //定义一个宽度
        let sliderWidth = this.$refs.slider.clientWidth;
        for(let i= 0;i<this.childrens.length;i++){
          let child=this.childrens[i];
          child.classList.add('slider-item');
          child.style.width = sliderWidth + 'px';
          width+=sliderWidth;
        }
        if(this.loop&&!isResize){
          width+=2*sliderWidth;
        }
        this.$refs.sliderGroup.style.width=width+'px';
      },
      //初始化小圆点
      _initDots(){
        if(this.loop){
          this.dots=new Array(this.childrens.length-2);
        }else {
          this.dots =new Array(this.childrens.length);
        }
      },
      //自动轮播
      _play(){
        let pageIndex = this.currentPageIndex+1;
        if(this.loop){
          pageIndex+=1;
        }
        this.timer = setTimeout(()=>{
          this.slider.goToPage(pageIndex,0,400)
        },this.inrterval)
      }
    }

  }
</script>

<style>
  *{
    margin: 0px;
    padding: 0px;
  }
  .slider{
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .slider-group{
    position: relative;
    left: 0;
    top: 0;
  }
  .slider-item{
    width: 100%;
    float: left;
  }
  .slider-item img{
    width: 100%;
  }
  .dots{
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -45px;
  }
  .dot{
    float: left;
    width: 10px;
    height: 10px;
    border-radius:50%;
    background: #999;
    margin-right: 3px;
  }
  .active{
    background: white;
  }
</style>
