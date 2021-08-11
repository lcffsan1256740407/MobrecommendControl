<template>
  <div id="list">
    <!-- 头部导航栏 -->
    <van-sticky>
      <Header/>
    </van-sticky>
    <!-- 页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "List",
  components: { Header },
  mounted() {
    this.$router.replace({
      name: "showlist",
    });
  },
};
</script>

<style scoped>
#list {
  padding-bottom: 100px;
}
Header {
  position: fixed;
  top: 0;
}
</style>