<template>
  <div class="home-page">
    <!-- 内容区域 -->
    <router-view></router-view>
    <!-- 底部标签栏 -->
    <Footer/>
  </div>
</template>

<script>
import Footer from "../components/Footer"

export default {
  name: "HomePage",
  components:{Footer},
  data() {
      return {

      }
  },
  mounted(){
    console.log("wuh")
      this.$router.replace({
          name:'myinfo'
      })
  }
};
</script>

<style>
</style>