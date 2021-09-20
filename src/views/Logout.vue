<template>
  <el-card shadow="always" :class="'login'">
    <div slot="header">
      <span>您已退出登录</span>
    </div>
    <el-link type="primary" @click="onSubmit">返回首页</el-link>
  </el-card>
</template>
<script>
export default {
  created: function () {
    localStorage.removeItem("token");
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 500px;
  margin: 10% auto;
}
</style>
