<template>
  <div id="login-page">
    <div class="login-content">
      <div class="userImg">
        <img
          src="https://ali-imgs.acfun.cn/kos/nlav10360/static/common/widget/header/img/acfunlogo.11a9841251f31e1a3316.svg"
        />
      </div>

      <div class="userMain">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="账号"
            label="账号"
            placeholder="请输入账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
            left-icon="manager"
            colon
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            left-icon="lock"
            colon
          />
          <div class="others-power">
            <span>帮助手册</span>
            <span>忘记密码</span>
            <span>点击注册</span>
          </div>

          <div style="margin: 36px 0">
            <van-button block native-type="submit" color="#fa5061"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginRequest } from "../requestFn";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      loginRequest(this.username, this.password).then((res) => {
        if(res.code == -1){
          this.$toast({ message: "账号或密码错误", icon: "https://s1.aigei.com/src/img/gif/d3/d3869054b6b7466ab42389e195aff14c.gif?imageMogr2/auto-orient/thumbnail/!149x149r/gravity/Center/crop/149x149/quality/85/&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:Ic-9Plm9qkIik4OrlZ5oWllzi7w=",});
        }else{
          this.$toast({ message: "登录成功", icon: "https://s1.aigei.com/src/img/gif/16/16ff1a54523d4b209507fe571d5d5865.gif?imageMogr2/auto-orient/thumbnail/!149x149r/gravity/Center/crop/149x149/quality/85/&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:7dj1zpvtUaNxvvZnF4jzjv9kFZ0=",});
          this.$router.replace({
            name:'home'
          })
        }
      });
    },
  },
};
</script>

<style scoped>
#login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../imgs/login.jpeg");
  background-size: cover;
}
.login-content {
  width: 300px;
  height: 550px;
  padding: 0 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.6);
}

.userImg img {
  width: 127px;
  margin: 50px 0;
}
.userMain .van-cell {
  margin: 10px 0;

  background-color: transparent;
  border-bottom: 1px solid silver;
}
.others-power {
  font-size: 12px;
  color: silver;
  margin: 10px 16px;

  display: flex;
  justify-content: flex-end;
}
.others-power span:nth-child(1) {
  flex-grow: 1;
}
.others-power span:nth-child(2) {
  margin-right: 5px;
}
</style>