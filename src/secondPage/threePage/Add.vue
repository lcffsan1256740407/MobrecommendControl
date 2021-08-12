<template>
  <div id="add">
    <!-- 选择险种 -->
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="select"
        :options="insuranceList"
        :title="select ? insuranceList.text : '请选择险种'"
        @input="choiceType(select)"
      />
    </van-dropdown-menu>

    <!-- 选择保额 -->
    <div class="coverage">
      <span>保额:</span>
      <van-radio-group v-model="radio" direction="horizontal">
        <van-radio
          :name="index"
          shape="square"
          v-for="(item, index) of coveragePremiumList"
          :key="index"
        >
          {{ coveragePremiumList[index].coverage }}
        </van-radio>
      </van-radio-group>
    </div>

    <!-- 展示保费 -->
    <div class="premium">
      <span>保费:</span>
      <input type="text" disabled v-model="premium" />
    </div>

    <!-- 点击保存按钮 -->
    <div class="btn">
      <van-button type="info" @click="save">保存</van-button>
    </div>
  </div>
</template>

<script>
import { typeRequest, moneyRequest, saveRequest } from "../../requestFn";

export default {
  name: "Add",
  data() {
    return {
      select: false,
      radio: 0,
      premium: "",
      //   险种清单
      insuranceList: [],
      //   险种对应的保额保费
      coveragePremiumList: [],
    };
  },
  methods: {
    //选择不同险种确定保额保费
    choiceType(value) {
      moneyRequest(value).then((res) => {
        this.coveragePremiumList = res.content.coveragePremiumList;
        this.premium = this.coveragePremiumList[this.radio].premium;
      });
    },

    //保存按钮
    save() {
        if(this.select){
            //保存建议书
            let id = this.select;
            let typeName = this.insuranceList[this.select - 1].text;
            let coverage = this.coveragePremiumList[this.radio].coverage;
            let premium = this.premium;
      
            saveRequest(id, typeName, coverage, premium).then((res) => {
              //跳转到完善页面
              this.$router.replace({
                name: "complete",
                query: {
                  id: res.content.proposalId,
                },
              });
            });
        }else{
            alert("请先选择险种")
        }
    },
  },
  watch: {
    radio() {
      this.premium = this.coveragePremiumList[this.radio].premium;
    },
  },
  mounted() {
    // 开局就查询保险种类
    typeRequest().then((res) => {
      this.insuranceList = res.content.insuranceList;
      this.insuranceList.forEach((item) => {
        if (item.insuranceName) {
          item.text = item.insuranceName;
          delete item.insuranceName;
        }
        if (item.id) {
          item.value = item.id;
          delete item.id;
        }
      });
    });
  },
};
</script>

<style scoped>
#add {
  padding: 50px;
  padding-top: 150px;
}
.coverage,
.premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 5px rgb(235, 231, 231);
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>