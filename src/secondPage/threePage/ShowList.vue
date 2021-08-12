<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      @input="searchFn"
    />

    <!-- 列表展示区域 -->
    <van-card
      :price="item.premium"
      :desc="`保额:${item.coverage}元`"
      :title="item.insuranceName"
      v-for="(item, index) of listArray"
      :key="index"
    >
      <template #tags>
        <van-tag plain type="danger">{{ item.applicantName }}</van-tag>
        <van-tag plain type="danger">{{ item.applicantMale }}</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" size="mini" @click="handleComplete(item.id)" v-show="item.proposalState == 1">完善</van-button>
        <van-button type="info" size="mini" @click="handleEdit(item.id)" v-show="item.proposalState == 2">编辑</van-button>
        <van-button type="danger" size="mini" @click="handleDelete(item.id)">删除</van-button>
      </template>
    </van-card>

    <!-- 添加按钮 -->
    <div class="add" @click="handleAdd">+</div>

    <van-pagination
      v-model="currentPage"
      :total-items="total"
      :items-per-page="5"
      @change="change"
    />
  </div>
</template>

<script>
import { bookListRequest , deleteRequest } from "../../requestFn";

export default {
  name: "ShowList",
  data() {
    return {
      keywords: "",
      currentPage: 1,
      listArray: [],
      total: "",
    };
  },
  methods: {
    // 搜索
    searchFn() {
      this.currentPage = 1;
      this.change();
    },
    // 切换页码
    change() {
      bookListRequest(this.currentPage, this.keywords).then((res) => {
        this.total = res.content.total;
        this.listArray = res.content.list;
        this.listArray.forEach((item) => {
          item.applicantMale = item.applicantMale == 1 ? "男" : "女";
        });
      });
    },
    // 删除
    handleDelete(id) {
      deleteRequest(id).then((res) => {
        this.change();
      });
    },
    // 添加
    handleAdd(){
      this.$router.replace({
        name:'add'
      })
    },
    // 完善
    handleComplete(id){
      this.$router.replace({
        name:'complete',
        query:{
          id
        }
      })
    },
    // 编辑
    handleEdit(id){
      this.$router.replace({
        name:'editdetail',
        query:{
          id
        }
      })
    }
  },
  mounted() {
    // 查询建议书列表第一页(默认设置成一页最多5条)
    bookListRequest(1).then((res) => {
      this.total = res.content.total;
      this.listArray = res.content.list;
      this.listArray.forEach((item) => {
        item.applicantMale = item.applicantMale == 1 ? "男" : "女";
      });
    });
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
}
</style>