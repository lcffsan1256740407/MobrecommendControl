<template>
<div id="header">
  <van-nav-bar title="AcFun" @click-left="onClickLeft">
    <template #left>
      <van-icon name="arrow-left" size="16" color="black"/>
    </template>
  </van-nav-bar>
</div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    onClickLeft() {
      this.$router.replace({
        name: "list",
      });
    },
  },
};
</script>

<style scoped>
#header >>> .van-nav-bar__title {
  font-size: 20px;
  font-weight: bolder;
  color: rgb(253, 76, 93);
}
</style>