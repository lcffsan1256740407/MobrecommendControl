<template>
  <div>
    <!-- 头部导航栏 -->
    <Header />
    <!-- 页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "List",
  components: { Header },
};
</script>

<style>
</style>