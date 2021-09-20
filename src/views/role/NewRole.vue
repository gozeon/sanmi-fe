<template>
  <span>
    <el-button size="mini" type="primary" @click="visible = true"
      >新建</el-button
    >
    <el-dialog title="新建" append-to-body :visible.sync="visible">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="名字" prop="name">
          <el-input
            v-model="form.name"
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>

        <el-form-item label="显示名" prop="displayName">
          <el-input
            v-model="form.displayName"
            @keyup.enter.native="onSubmit"
          ></el-input>
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
            required: true,
            pattern: /[a-zA-Z]/,
            message: "请使用英文字母",
            trigger: "blur",
          },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        displayName: [
          {
            required: true,
            message: "请输入显示名字",
            trigger: "blur",
          },
          {
            required: true,
            pattern: /[\u4e00-\u9fa5]/,
            message: "请使用中文",
            trigger: "blur",
          },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios
            .post("/user/role", {
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
