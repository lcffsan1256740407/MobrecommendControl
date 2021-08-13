<template>
  <div class="error">
    <!-- 通用错误 -->
    <van-empty image="error" description="404网页不存在" />
  </div>
</template>

<script>
export default {
  name: "Error404",
};
</script>

<style scoped>
.error{
    padding-top: 150px;
}
</style>