<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    this.$router.replace({
      name:'showlist'
    })
  }
}
</script>

<style>

</style>
