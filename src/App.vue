<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import vHeader from "./components/v-header/v-header"
export default {
    components:{
      vHeader
    }
}
</script>

<style>

</style>
