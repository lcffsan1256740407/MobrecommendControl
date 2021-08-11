<template>
  <div>
    <van-search v-model="keywords" placeholder="请输入搜索关键词" />

    <van-card price="2.00" desc="描述信息" title="达尔文5号">
      <template #tags>
        <van-tag plain type="danger">姓名</van-tag>
        <van-tag plain type="danger">性别</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">编辑</van-button>
        <van-button size="mini">删除</van-button>
      </template>
    </van-card>
    <van-card price="2.00" desc="描述信息" title="达尔文5号">
      <template #tags>
        <van-tag plain type="danger">姓名</van-tag>
        <van-tag plain type="danger">性别</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">编辑</van-button>
        <van-button size="mini">删除</van-button>
      </template>
    </van-card>
    <van-card price="2.00" desc="描述信息" title="达尔文5号">
      <template #tags>
        <van-tag plain type="danger">姓名</van-tag>
        <van-tag plain type="danger">性别</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">编辑</van-button>
        <van-button size="mini">删除</van-button>
      </template>
    </van-card>

    <div class="add">+</div>

    <van-pagination
      v-model="currentPage"
      :total-items="24"
      :items-per-page="5"
    />
  </div>
</template>

<script>
export default {
  name: "ShowList",
  data() {
    return {
      keywords: "",
      currentPage: 1,
    };
  },
};
</script>

<style scoped>
.van-search {
  margin: 10px 0;
}
.van-card {
  width: 300px;
  background-color: white;
  box-shadow: 0 0 5px rgb(230, 229, 229);
  margin: 10px auto;
  border-radius: 5px;
}
.add {
  width: 300px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: white;
  box-shadow: 0 0 5px rgb(230, 229, 229);
  margin: 10px auto;
  font-size: 30px;
  color: silver;
  border-radius: 5px;
  transition: 0.25s;
}
.add:active {
  background-color: silver;
  color: white;
}
</style>