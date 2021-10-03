<template>
  <el-main>
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
      <el-divider content-position="left">基本信息</el-divider>
      <el-form-item label="房间名称">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="材料">
        <el-radio-group v-model="form.a">
          <el-radio label="布"></el-radio>
          <el-radio label="纱"></el-radio>
          <el-radio label="布+纱"></el-radio>
          <el-radio label="成品帘"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="悬挂方式">
        <el-radio-group v-model="form.d">
          <el-radio label="S钩"></el-radio>
          <el-radio label="打孔"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="布料种类">
        <el-radio-group v-model="form.dd">
          <el-radio label="定高2.8米"></el-radio>
          <el-radio label="定宽1.4米"></el-radio>
          <el-radio label="定宽2.8米"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="打开方式">
        <el-radio-group v-model="form.d">
          <el-radio label="对开"></el-radio>
          <el-radio label="单开"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="宽(单位: 米)">
        <el-input-number
          v-model="form.c"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="高(单位: 米)">
        <el-input-number
          v-model="form.cc"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="拼接方式">
        <el-radio-group v-model="form.ee">
          <el-radio label="无"></el-radio>
          <el-radio label="方式一"></el-radio>
          <el-radio label="方式二"></el-radio>
          <el-radio label="方式三"></el-radio>
          <el-radio label="方式四"></el-radio>
          <el-radio label="方式五"></el-radio>
          <el-radio label="方式六"></el-radio>
          <el-radio label="方式七"></el-radio>
          <el-radio label="方式八"></el-radio>
          <el-radio label="方式九"></el-radio>
          <el-radio label="方式十"></el-radio>
          <el-radio label="方式十一"></el-radio>
          <el-radio label="方式十二"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="褶皱倍数">
        <el-radio-group v-model="form.ddd">
          <el-radio label="2倍"></el-radio>
          <el-radio label="1.8倍"></el-radio>
          <el-radio label="1.6倍"></el-radio>
          <el-radio label="无"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="花边编号"> <el-input></el-input></el-form-item>
      <el-form-item label="花边车缝方式">
        <el-radio-group v-model="form.ddd">
          <el-radio label="横向车缝"></el-radio>
          <el-radio label="竖向车缝"></el-radio>
          <el-radio label="无"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="工艺特殊要求">
        <el-input type="textarea" v-model="form.f" :rows="2" />
      </el-form-item>

      <el-divider content-position="left">窗幔信息</el-divider>
      <el-form-item label="窗幔">
        <el-radio-group v-model="form.ddd">
          <el-radio label="无"></el-radio>
          <el-radio label="一字型"></el-radio>
          <el-radio label="U自行倍"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="窗帘盒深(单位: 米)">
        <el-input-number
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="编号">
        <el-input></el-input>
      </el-form-item>

      <el-divider content-position="left">杆轨信息</el-divider>

      <el-form-item label="布帘">
        <el-radio-group v-model="form.e">
          <el-radio label="无"></el-radio>
          <el-radio label="直轨"></el-radio>
          <el-radio label="直杆"></el-radio>
          <el-radio label="L型杆轨"></el-radio>
          <el-radio label="超薄轨"></el-radio>
          <el-radio label="弯轨"></el-radio>
          <el-radio label="电动开合"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="布帘编号">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="纱帘">
        <el-radio-group v-model="form.ee">
          <el-radio label="无"></el-radio>
          <el-radio label="直轨"></el-radio>
          <el-radio label="直杆"></el-radio>
          <el-radio label="L型杆轨"></el-radio>
          <el-radio label="超薄轨"></el-radio>
          <el-radio label="弯轨"></el-radio>
          <el-radio label="电动开合"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="纱帘编号">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="安装方式">
        <el-radio-group v-model="form.ee">
          <el-radio label="侧装"></el-radio>
          <el-radio label="顶装"></el-radio>
          <el-radio label="法兰"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="安装位置">
        <el-radio-group v-model="form.ee">
          <el-radio label="框内"></el-radio>
          <el-radio label="框外"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="电池类型">
        <el-radio-group v-model="form.e">
          <el-radio label="锂电池"></el-radio>
          <el-radio label="插电"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="电动升降（和高度相关）">
        <el-radio-group v-model="form.e">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="L型左尺寸">
        <el-input-number
          v-model="form.cc"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="L型右尺寸">
        <el-input-number
          v-model="form.cc"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.f" :rows="2" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加一项</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>

      <el-divider content-position="left">附件</el-divider>

      <el-form-item label="安装位置照片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
        ></el-upload>
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
