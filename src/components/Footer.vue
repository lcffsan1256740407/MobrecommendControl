<template>
<div>
  <van-tabbar v-model="active" active-color="#ff759c" inactive-color="#000">
    <van-tabbar-item icon="apps-o" @click="goToChannel">频道</van-tabbar-item>
    <van-tabbar-item icon="home-o" @click="goToList">建议书</van-tabbar-item>
    <van-tabbar-item icon="user-o" @click="goToMyInfo">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    goToChannel() {
      this.$router.replace({
        name: "channel",
      });
    },
    goToList() {
      this.$router.replace({
        name: "showlist",
      });
    },
    goToMyInfo() {
      this.$router.replace({
        name: "myinfo",
      });
    },
  },
};
</script>

<style scoped>
.van-tabbar{
  border-top: 1px solid silver;
}
</style>