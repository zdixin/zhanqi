<template>
  <div class="loading" >
    <img class="loadimg" src="./loading.gif"/>
    <p class="title">正在加载……</p>
  </div>
</template>

<script>
    export default {}
</script>

<style>
  .loading{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-20px;
  }
  .loadimg{
    height: 40px;
    width: 40px;
  }
  .loading .title{
      font-size: 12px;
      margin: 0;
      padding: 0;
  }
</style>
