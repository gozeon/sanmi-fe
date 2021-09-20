<template>
  <el-main>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-divider content-position="left">基本信息</el-divider>
      <el-form-item label="材料">
        <el-radio-group v-model="form.a">
          <el-radio label="布"></el-radio>
          <el-radio label="纱"></el-radio>
          <el-radio label="布+纱"></el-radio>
          <el-radio label="成品帘"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="固定宽或高">
        <el-radio-group v-model="form.b">
          <el-radio label="宽"></el-radio>
          <el-radio label="高"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="宽或高(单位: 米)">
        <el-input-number
          v-model="form.c"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="打开方式">
        <el-radio-group v-model="form.d">
          <el-radio label="对开"></el-radio>
          <el-radio label="单开"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-divider content-position="left">杆轨信息</el-divider>

      <el-form-item label="杆类型">
        <el-radio-group v-model="form.e">
          <el-radio label="直杆"></el-radio>
          <el-radio label="L杆"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="轨类型">
        <el-radio-group v-model="form.f">
          <el-radio label="直轨"></el-radio>
          <el-radio label="弯轨"></el-radio>
          <el-radio label="超薄轨"></el-radio>
          <el-radio label="电动轨道"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
export default {
  data: function () {
    return {
      visible: false,
      form: {},
      roleList: [],
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 30,
            message: "长度在 8 到 30 个字符",
            trigger: "blur",
          },
        ],

        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确邮箱",
            trigger: "blur",
          },
        ],

        roleId: [{ required: true, message: "请设置角色", trigger: "blur" }],
      },
    };
  },
  created() {
    this.loadOptions();
  },
  methods: {
    loadOptions() {
      this.axios
        .get("/user/role")
        .then(({ data }) => {
          if (data?.msg) {
            this.$message.error(msg);
            return;
          }

          this.roleList = data?.data;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios
            .post("/user", {
              ...this.form,
            })
            .then(({ data }) => {
              if (data?.msg) {
                this.$message.error(data.msg);
                return;
              }

              this.$message.success("操作成功");
              this.$emit("done", data);
              this.visible = false;
              this.form = {};
            })
            .catch((e) => {
              this.$message.error(e.message);
            });
        }
      });
    },
  },
};
</script>
