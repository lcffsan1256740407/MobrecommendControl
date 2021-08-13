<template>
  <div id="editdetail">
    <van-form @submit="go">
      <div class="insure">
        <!-- 险种展示 -->
        <h3>险种信息</h3>
        <div class="premium">
          <span>险种:</span>
          <input type="text" disabled :value="proposal.insuranceName" />
        </div>

        <!-- 选择保额 -->
        <div class="coverage">
          <span>保额:</span>
          <van-radio-group
            v-if="proposal.coverage"
            v-model="proposal.coverage"
            direction="horizontal"
            @change="chocieMoney"
          >
            <van-radio
              :name="item.coverage"
              shape="square"
              v-for="(item, index) of coveragePremiumList"
              :key="index"
            >
              {{ item.coverage }}
            </van-radio>
          </van-radio-group>
        </div>

        <!-- 展示保费 -->
        <div class="premium">
          <span>保费:</span>
          <input v-if="arry[0].premium" type="text" disabled :value="`${arry[0].premium} 元`" />
        </div>
      </div>
      <!-- 投保人 -->
      <div class="send">
        <h3>投保人</h3>
        <div class="sendName">
          <span>姓名:</span>
          <van-field
            v-model="proposal.applicantName"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '姓名不能为空' }]"
          />
        </div>

        <div class="sendSex">
          <span style="width: 85px">性别:</span>
          <van-radio-group
            v-model="proposal.applicantMale"
            direction="horizontal"
          >
            <van-radio :name="1" shape="square"> 男 </van-radio>
            <van-radio :name="0" shape="square"> 女 </van-radio>
          </van-radio-group>
        </div>

        <div class="sendNumber">
          <span>身份证:</span>
          <van-field
            v-model="proposal.applicantIdNo"
            placeholder="请输入身份证号"
            name="listNumber"
            :rules="[{ validator: listNumber, message: '错误的身份证号' }]"
          />
        </div>
      </div>

      <!-- 被投保人 -->
      <div class="accept">
        <h3>被投保人</h3>
        <div
          class="acceptMan"
          v-for="(item, index) of proposalInsureds"
          :key="index"
        >
          <!-- 展示区域 -->
          <van-cell @click="item.isEdit = true">
            <span>姓名: {{ item.insuredName }}</span
            ><br />
            <span>性别: {{ item.insuredMale == 1 ? "男" : "女" }}</span
            ><br />
            <span>身份证: {{ item.insuredIdNo }}</span>
          </van-cell>

          <!-- 编辑区域 -->
          <van-popup
            v-model="item.isEdit"
            position="bottom"
            :style="{ height: '50%' }"
            :close-on-click-overlay="false"
          >
            <div>
              <span>姓名:</span>
              <van-field
                v-model="item.insuredName"
                placeholder="请输入姓名"
                name="listNameVali"
                :rules="[{ validator: listNameVali, message: '错误的姓名' }]"
              />
            </div>

            <div>
              <span>性别:</span>
              <van-radio-group
                v-model="item.insuredMale"
                direction="horizontal"
              >
                <van-radio name="1" shape="square"> 男 </van-radio>
                <van-radio name="0" shape="square"> 女 </van-radio>
              </van-radio-group>
            </div>

            <div>
              <span>身份证号:</span>
              <van-field
                v-model="item.insuredIdNo"
                placeholder="请输入身份证号"
                name="listNumber"
                :rules="[{ validator: listNumber, message: '错误的身份证号' }]"
              />
            </div>

            <!-- 确认,删除按钮 -->
            <div>
              <div class="sure" @click="itemSave(item)">确认</div>
              <div class="delete" @click="itemDelete(index)">删除</div>
            </div>
          </van-popup>
        </div>

        <!-- 添加按钮 -->
        <van-cell class="add" @click="showPopup">+</van-cell>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '50%' }"
          :close-on-click-overlay="false"
        >
          <div>
            <span>姓名:</span>
            <van-field
              v-model="addData.insuredName"
              placeholder="请输入姓名"
              name="listNameVali"
              class="names"
              :rules="[{ validator: listNameVali, message: '错误的姓名' }]"
            />
          </div>

          <div>
            <span>性别:</span>
            <van-radio-group
              v-model="addData.insuredMale"
              direction="horizontal"
            >
              <van-radio name="1" shape="square"> 男 </van-radio>
              <van-radio name="0" shape="square"> 女 </van-radio>
            </van-radio-group>
          </div>

          <div>
            <span>身份证号:</span>
            <van-field
              placeholder="请输入身份证号"
              name="listNumber"
              v-model="addData.insuredIdNo"
              :rules="[{ validator: listNumber, message: '错误的身份证号' }]"
            />
          </div>

          <!-- 确认,取消按钮 -->
          <div>
            <div class="sure" @click="handleAdd">添加</div>
            <div class="delete" @click="show = false">取消</div>
          </div>
        </van-popup>
      </div>

      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { detailRequest, moneyRequest , saveAllRequest } from "../../requestFn";

export default {
  name: "EditDetail",
  data() {
    return {
      // 投保人信息
      proposal: { coverage: "", premium: "" },
      //   被投保人信息
      proposalInsureds: [],
      //   保额
      coveragePremiumList: [],
      //   准确的保费
      arry: [{ coverage: "", premium: "" }],
      show: false,
      isName: true,
      isNumber: true,
      radio: 1,
      addData: {
        insuredName: "",
        insuredMale: 1,
        insuredIdNo: "",
      },
    };
  },
  methods: {
    // 保额变动引起保费变动
    chocieMoney() {
      // 获取准确的保费
      let arry = this.coveragePremiumList.filter((item) => {
        return item.coverage == this.proposal.coverage;
      });
      this.arry = arry;
      this.proposal.coverage = this.arry[0].coverage;
      this.proposal.premium = this.arry[0].premium;
    },
    // 跳出添加页面
    showPopup() {
      this.show = true;
      this.$nextTick(() => {
        document
          .getElementsByClassName("names")[0]
          .getElementsByTagName("input")[0]
          .focus();
      });
    },
    // 添加按钮
    handleAdd() {
      if (this.isName && this.isNumber) {
        this.show = false;
        this.proposalInsureds.push({
          insuredName: this.addData.insuredName,
          insuredMale: this.addData.insuredMale,
          insuredIdNo: this.addData.insuredIdNo,
          isEdit: false,
        });
      }
    },
    // 删除item按钮
    itemDelete(index) {
      this.proposalInsureds.splice(index, 1);
    },
    // 保存item按钮
    itemSave(item) {
      if (this.isName && this.isNumber) {
        item.isEdit = false;
      }
    },
    // 校验item的姓名
    listNameVali(item, msg) {
      if (item != "") {
        this.isName = true;
        return true;
      } else {
        msg.message = "姓名不可为空";
        this.isName = false;
        return false;
      }
    },
    // 校验item的身份证号
    listNumber(item, msg) {
      if (item != "") {
        let reg =
          /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (reg.test(item)) {
          this.isNumber = true;
          return;
        } else {
          msg.message = "身份证号格式错误";
          this.isNumber = false;
          return false;
        }
      }
      msg.message = "身份证号不可为空";
      this.isNumber = false;
      return false;
    },
    // 保存修改详情页信息
    go() {
      if (this.proposalInsureds.length == 0) {
        this.$toast("至少有一名被保人")
      } else {
        // 发送修改建议书请求
        this.proposalInsureds.forEach((item) => {
          delete item.id;
        });
        saveAllRequest(this.proposal, this.proposalInsureds).then((res) => {
          this.$router.replace({
            name: "showlist",
          });
        });
      }
    },
  },
  mounted() {
    detailRequest(this.$route.query.id).then((res) => {
      console.log(res);
      // 获取投保人及保险信息
      this.proposal = res.content.proposal;
      // 获取被投保人信息
      this.proposalInsureds = res.content.proposalInsureds;
      // 往被投保人信息里面添加响应式属性isEdit
      this.proposalInsureds.forEach((item) => {
        this.$set(item, "isEdit", false);
      });

      // 获取保额保费
      moneyRequest(res.content.proposal.insuranceId).then((res) => {
        // 获取保额
        this.coveragePremiumList = res.content.coveragePremiumList;
        // 获取准确的保费
        let arry = res.content.coveragePremiumList.filter((item) => {
          return item.coverage == this.proposal.coverage;
        });
        this.arry = arry;
      });
    });

    
  },
};
</script>

<style scoped>
.van-form {
  padding: 35px;
}
.insure > div {
  display: flex;
  align-items: center;
  padding: 15px 20px;
}
.send {
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
}
h3 {
  margin-left: 20px;
}
.send > div {
  display: flex;
  align-items: center;
  padding: 15px 20px;
}
.send > div span {
  width: 100px;
}
.accept .van-cell {
  box-shadow: 0 0 5px silver;
  margin: 10px 0;
}
.add {
  width: 305px;
  height: 100px;
  background-color: white;
  box-shadow: 0 0 5px rgb(230, 229, 229);
  margin: 10px auto;
  font-size: 30px;
  color: silver;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.van-popup > div {
  display: flex;
  align-items: center;
  padding: 10px;
}
.van-popup > div span {
  width: 100px;
}
.sure,
.delete {
  padding: 10px 30px;
  color: white;
  background-color: skyblue;
  margin: 5px;
}
</style>