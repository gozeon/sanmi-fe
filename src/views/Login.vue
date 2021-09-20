<template>
  <el-card shadow="always" :class="'login'">
    <div slot="header">
      <span>账号登录</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          @keyup.enter.native="onSubmit"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data: function () {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 1,
            max: 80,
            message: "长度在 1 到 80 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 80,
            message: "长度在 1 到 80 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // document.body.style.background = "#e3e3e3";
    console.log(this.$route);
    console.log(this.$router);
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios
            .post("/user/login", {
              ...this.form,
            })
            .then(({ data }) => {
              console.log(
                "🚀 ~ file: Login.vue ~ line 66 ~ .then ~ data",
                data
              );
              const { token, msg } = data;
              if (msg) {
                this.$message.error(msg);
                return;
              }

              localStorage.setItem("token", token);
              const nextUrl = this.$route.query?.nextUrl;

              if (nextUrl != null) {
                this.$router.push(String(nextUrl));
              } else {
                // this.$router.push({
                //   name: "Home",
                // });
                this.$router.go(-1);
              }
            })
            .catch((e) => {
              console.log(
                "🚀 ~ file: Login.vue ~ line 89 ~ this.$refs.form.validate ~ e",
                e
              );

              this.$message.error(e.message);
            });
        }
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
