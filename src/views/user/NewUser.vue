<template>
  <span>
    <el-button size="mini" type="primary" @click="visible = true"
      >新建</el-button
    >
    <el-dialog title="新建" append-to-body :visible.sync="visible">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input
            v-model="form.name"
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            @keyup.enter.native="onSubmit"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="form.email"
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="roleId">
          <el-select v-model="form.roleId">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.display_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
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
