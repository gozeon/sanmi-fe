<template>
  <el-main>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-divider content-position="left">合约基础信息</el-divider>
      <el-form-item label="合约编号">
        <el-input v-model="form.a"></el-input>
      </el-form-item>

      <el-form-item label="客户姓名">
        <el-input v-model="form.b"></el-input>
      </el-form-item>

      <el-form-item label="客户电话">
        <el-input-number v-model="form.c" :controls="false" />
      </el-form-item>

      <el-form-item label="客户备用电话">
        <el-input-number v-model="form.d" :controls="false" />
      </el-form-item>

      <el-form-item label="客户微信号">
        <el-input v-model="form.e" />
      </el-form-item>

      <el-form-item label="客户地址">
        <el-input type="textarea" v-model="form.f" :rows="2" />
      </el-form-item>

      <el-form-item label="客户地上楼层数">
        <el-radio-group v-model="form.g">
          <el-radio label="平层或错层"></el-radio>
          <el-radio label="二层"></el-radio>
          <el-radio label="三层"></el-radio>
          <el-radio label="四层"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="客户地下楼层数">
        <el-radio-group v-model="form.h">
          <el-radio label="无"></el-radio>
          <el-radio label="负一层"></el-radio>
          <el-radio label="负二层"></el-radio>
          <el-radio label="负三层"></el-radio>
          <el-radio label="负四层"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="居室数量">
        <el-radio-group v-model="form.i">
          <el-radio label="一室"></el-radio>
          <el-radio label="二室"></el-radio>
          <el-radio label="三室"></el-radio>
          <el-radio label="四室"></el-radio>
          <el-radio label="五室"></el-radio>
          <el-radio label="六室"></el-radio>
          <el-radio label="七室"></el-radio>
          <el-radio label="八室"></el-radio>
          <el-radio label="九室"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="客厅数量">
        <el-radio-group v-model="form.m">
          <el-radio label="一厅"></el-radio>
          <el-radio label="二厅"></el-radio>
          <el-radio label="三厅"></el-radio>
          <el-radio label="四厅"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="卫生间数量">
        <el-radio-group v-model="form.n">
          <el-radio label="一卫"></el-radio>
          <el-radio label="二卫"></el-radio>
          <el-radio label="三卫"></el-radio>
          <el-radio label="四卫"></el-radio>
          <el-radio label="五卫"></el-radio>
          <el-radio label="六卫"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="客户来源">
        <el-select v-model="form.p" placeholder="客户来源">
          <el-option label="介绍人介绍" value="介绍人介绍"></el-option>
          <el-option label="公司分配" value="公司分配"></el-option>
          <el-option label="装饰公司介绍" value="装饰公司介绍"></el-option>
          <el-option label="陌生拜访" value="陌生拜访"></el-option>
          <el-option label="网路获客" value="网路获客"></el-option>
          <el-option label="自然到访" value="自然到访"></el-option>
          <el-option label="老客户介绍" value="老客户介绍"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="成交总金额(元)">
        <el-input-number v-model="form.pp" :controls="false" :precision="2" />
      </el-form-item>

      <el-form-item label="赠品">
        <el-select v-model="form.q" placeholder="赠品">
          <el-option label="无" value="其他"></el-option>
          <el-option label="床品" value="床品"></el-option>
          <el-option
            label="电动窗帘电机一个"
            value="电动窗帘电机一个"
          ></el-option>
          <el-option
            label="换洗纱帘或窗帘一套"
            value="换洗纱帘或窗帘一套"
          ></el-option>
          <el-option label="靠包" value="靠包"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工期">
        <el-select v-model="form.r" placeholder="工期">
          <el-option label="20天，正常工期" value="20天，正常工期"></el-option>
          <el-option
            label="加急14天，需原价出售"
            value="加急14天，需原价出售"
          ></el-option>
          <el-option
            label="加急7天，需原价的1.5倍"
            value="加急7天，需原价的1.5倍"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button type="primary" @click="onSubmit">窗帘录入</el-button>
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
