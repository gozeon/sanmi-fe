<template>
  <el-main>
    <el-divider content-position="left">合约信息</el-divider>
    <template v-if="houseInfo">
      <el-row :gutter="20">
        <el-col :span="10" :push="2"> 合约编号：{{ houseInfo.number }} </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="22" :push="2">
          <el-collapse accordion>
            <el-collapse-item title="房间窗帘信息">
              <el-table :data="houseInfo.curtain" size="mini">
                <el-table-column
                  prop="room_name"
                  label="房间名称"
                ></el-table-column>
                <el-table-column
                  prop="material"
                  label="材料"
                  :formatter="materialFmt"
                ></el-table-column>
                <el-table-column
                  prop="dangling"
                  label="悬挂方式"
                  :formatter="danglingFmt"
                ></el-table-column>
                <el-table-column
                  prop="open_way"
                  label="打开方式"
                  :formatter="open_wayFmt"
                ></el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </template>

    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
      <el-divider content-position="left">基本信息</el-divider>

      <el-form-item label="房间名称" prop="room_name">
        <el-input v-model="form.room_name"></el-input>
      </el-form-item>

      <el-form-item label="材料" prop="material">
        <el-radio-group v-model="form.material">
          <el-radio :label="1">布</el-radio>
          <el-radio :label="2">纱</el-radio>
          <el-radio :label="3">布+纱</el-radio>
          <el-radio :label="4">成品帘</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="悬挂方式" prop="dangling">
        <el-radio-group v-model="form.dangling">
          <el-radio :label="1">S钩</el-radio>
          <el-radio :label="2">打孔</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="布料种类" prop="fabric_kind">
        <el-radio-group v-model="form.fabric_kind">
          <el-radio :label="1">定高2.8米</el-radio>
          <el-radio :label="2">定宽1.4米</el-radio>
          <el-radio :label="3">定宽2.8米</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="打开方式" prop="open_way">
        <el-radio-group v-model="form.open_way">
          <el-radio :label="1">对开</el-radio>
          <el-radio :label="2">单开</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="宽(单位: 米)" prop="width">
        <el-input-number
          v-model="form.width"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="高(单位: 米)" prop="height">
        <el-input-number
          v-model="form.height"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="拼接方式" prop="join_way">
        <el-radio-group v-model="form.join_way">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">方式一</el-radio>
          <el-radio :label="2">方式二</el-radio>
          <el-radio :label="3">方式三</el-radio>
          <el-radio :label="4">方式四</el-radio>
          <el-radio :label="5">方式五</el-radio>
          <el-radio :label="6">方式六</el-radio>
          <el-radio :label="7">方式七</el-radio>
          <el-radio :label="8">方式八</el-radio>
          <el-radio :label="9">方式九</el-radio>
          <el-radio :label="10">方式十</el-radio>
          <el-radio :label="11">方式十一</el-radio>
          <el-radio :label="12">方式十二</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="currentShow.cloth_main_no"
        label="主布编号"
        prop="cloth_main_no"
      >
        <el-input v-model="form.cloth_main_no"></el-input>
      </el-form-item>

      <el-form-item
        v-if="currentShow.cloth_sub1_no"
        label="配布1编号"
        prop="cloth_sub1_no"
      >
        <el-input v-model="form.cloth_sub1_no"></el-input>
      </el-form-item>

      <el-form-item
        v-if="currentShow.cloth_sub2_no"
        label="配布2编号"
        prop="cloth_sub2_no"
      >
        <el-input v-model="form.cloth_sub2_no"></el-input>
      </el-form-item>

      <el-form-item
        v-if="currentShow.cloth_lining_no"
        label="衬布编号"
        prop="cloth_lining_no"
      >
        <el-input v-model="form.cloth_lining_no"></el-input>
      </el-form-item>

      <el-form-item
        v-if="currentShow.cloth_yarn_no"
        label="纱布编号"
        prop="cloth_yarn_no"
      >
        <el-input v-model="form.cloth_yarn_no"></el-input>
      </el-form-item>

      <el-form-item label="褶皱倍数" prop="drape_multiple">
        <el-radio-group v-model="form.drape_multiple">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1.6">1.6倍</el-radio>
          <el-radio :label="1.8">1.8倍</el-radio>
          <el-radio :label="2">2倍</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="花边编号" prop="lace_no">
        <el-input v-model="form.lace_no"></el-input>
      </el-form-item>

      <el-form-item label="花边车缝方式" prop="lace_way">
        <el-radio-group v-model="form.lace_way">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">横向车缝</el-radio>
          <el-radio :label="2">竖向车缝</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="工艺特殊要求" prop="craft_desc">
        <el-input type="textarea" v-model="form.craft_desc" :rows="2" />
      </el-form-item>

      <el-divider content-position="left">窗幔信息</el-divider>
      <el-form-item label="窗幔" prop="curtain_scarf">
        <el-radio-group v-model="form.curtain_scarf">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">一字型</el-radio>
          <el-radio :label="2">U字型</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="form.curtain_scarf"
        label="窗帘盒深(单位: 米)"
        prop="curtain_scarf_deep"
      >
        <el-input-number
          v-model="form.curtain_scarf_deep"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        v-if="form.curtain_scarf"
        label="编号"
        prop="curtain_scarf_no"
      >
        <el-input v-model="form.curtain_scarf_no"></el-input>
      </el-form-item>

      <el-divider content-position="left">杆轨信息</el-divider>

      <el-form-item label="布帘" prop="rail_cloth_type">
        <el-radio-group v-model="form.rail_cloth_type">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">直轨</el-radio>
          <el-radio :label="2">直杆</el-radio>
          <el-radio :label="3">L型杆轨</el-radio>
          <el-radio :label="4">超薄轨</el-radio>
          <el-radio :label="5">弯轨</el-radio>
          <el-radio :label="6">电动开合</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="布帘编号" prop="rail_cloth_no">
        <el-input v-model="form.rail_cloth_no"></el-input>
      </el-form-item>

      <el-form-item
        v-if="form.material === 2 || form.material === 3"
        label="纱帘"
        prop="rail_yarn_type"
      >
        <el-radio-group v-model="form.rail_yarn_type">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">直轨</el-radio>
          <el-radio :label="2">直杆</el-radio>
          <el-radio :label="3">L型杆轨</el-radio>
          <el-radio :label="4">超薄轨</el-radio>
          <el-radio :label="5">弯轨</el-radio>
          <el-radio :label="6">电动开合</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="form.material === 2 || form.material === 3"
        label="纱帘编号"
        prop="rail_yarn_no"
      >
        <el-input v-model="form.rail_yarn_no"></el-input>
      </el-form-item>

      <el-form-item label="安装方式" prop="rail_set_way">
        <el-radio-group v-model="form.rail_set_way">
          <el-radio :label="1">侧装</el-radio>
          <el-radio :label="2">顶装</el-radio>
          <el-radio :label="3">法兰</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="安装位置" prop="rail_set_posi">
        <el-radio-group v-model="form.rail_set_posi">
          <el-radio :label="1">框内</el-radio>
          <el-radio :label="2">框外</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="form.rail_cloth_type === 6 || form.rail_yarn_type === 6"
        label="电池类型"
        prop="rail_battery_type"
      >
        <el-radio-group v-model="form.rail_battery_type">
          <el-radio :label="1">锂电池</el-radio>
          <el-radio :label="2">插电</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="电动升降（和高度相关）" prop="rail_electric_lift">
        <el-radio-group v-model="form.rail_electric_lift">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="form.rail_cloth_type === 3 || form.rail_yarn_type === 3"
        label="L型左尺寸"
        prop="rail_left_size"
      >
        <el-input-number
          v-model="form.rail_left_size"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        v-if="form.rail_cloth_type === 3 || form.rail_yarn_type === 3"
        label="L型右尺寸"
        prop="rail_right_size"
      >
        <el-input-number
          v-model="form.rail_right_size"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :min="1"
          :max="1000"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="备注" prop="rail_remark">
        <el-input type="textarea" v-model="form.rail_remark" :rows="2" />
      </el-form-item>

      <el-divider content-position="left">附件</el-divider>

      <el-form-item label="安装位置照片" prop="image_url">
        <el-upload
          class="avatar-uploader"
          action="/api/file/upload"
          :headers="authHeader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image_url" :src="form.image_url" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(false)">确定</el-button>
        <el-button type="primary" @click="onSubmit(true)">保存并添加</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
export default {
  data: function () {
    return {
      visible: false,
      houseInfo: {},
      form: {
        image_url: '',
      },
      roleList: [],
      rules: {
        room_name: [{ required: true, message: '必填项', trigger: 'blur' }],
        material: [{ required: true, message: '必填项', trigger: 'blur' }],
        dangling: [{ required: true, message: '必填项', trigger: 'blur' }],
        fabric_kind: [{ required: true, message: '必填项', trigger: 'blur' }],
        open_way: [{ required: true, message: '必填项', trigger: 'blur' }],

        width: [{ required: true, message: '必填项', trigger: 'blur' }],
        height: [{ required: true, message: '必填项', trigger: 'blur' }],
        join_way: [{ required: true, message: '必填项', trigger: 'blur' }],

        cloth_main_no: [{ required: true, message: '必填项', trigger: 'blur' }],
        cloth_sub1_no: [{ required: true, message: '必填项', trigger: 'blur' }],
        cloth_sub2_no: [{ required: true, message: '必填项', trigger: 'blur' }],
        // cloth_lining_no: [{ required: true, message: '必填项', trigger: 'blur' }],
        cloth_yarn_no: [{ required: true, message: '必填项', trigger: 'blur' }],

        drape_multiple: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        lace_no: [{ required: true, message: '必填项', trigger: 'blur' }],
        lace_way: [{ required: true, message: '必填项', trigger: 'blur' }],

        curtain_scarf: [{ required: true, message: '必填项', trigger: 'blur' }],
        curtain_scarf_deep: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        curtain_scarf_no: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],

        rail_cloth_type: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        rail_cloth_no: [{ required: true, message: '必填项', trigger: 'blur' }],
        rail_yarn_type: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        rail_yarn_no: [{ required: true, message: '必填项', trigger: 'blur' }],

        rail_set_way: [{ required: true, message: '必填项', trigger: 'blur' }],
        rail_set_posi: [{ required: true, message: '必填项', trigger: 'blur' }],
        rail_electric_lift: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        rail_battery_type: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],

        image_url: [{ required: true, message: '请上传图片', trigger: 'blur' }],
      },
    }
  },
  computed: {
    authHeader() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    },
    currentShow() {
      // 主布编号
      let cloth_main_no = false
      // 配布1编号
      let cloth_sub1_no = false
      // 配布2编号
      let cloth_sub2_no = false
      // 衬布编号
      let cloth_lining_no = true
      // 纱布编号
      let cloth_yarn_no = false

      // 布+对，单开+无+主布编号
      if (
        this.form.material === 1 &&
        (this.form.open_way === 1 || this.form.open_way === 2) &&
        this.form.join_way === 0
      ) {
        cloth_main_no = true
      }

      // 布+对开+拼接1，2，5，6，10，11，12+主布编号+配布1编号
      if (
        this.form.material === 1 &&
        this.form.open_way === 1 &&
        (this.form.join_way === 1 ||
          this.form.join_way === 2 ||
          this.form.join_way === 5 ||
          this.form.join_way === 6 ||
          this.form.join_way === 10 ||
          this.form.join_way === 11 ||
          this.form.join_way === 12)
      ) {
        cloth_main_no = true
        cloth_sub1_no = true
      }

      // 布+对开+拼接3，4+主布编号+配布1，2编号
      if (
        this.form.material === 1 &&
        this.form.open_way === 1 &&
        (this.form.join_way === 3 || this.form.join_way === 4)
      ) {
        cloth_main_no = true
        cloth_sub1_no = true
        cloth_sub2_no = true
      }

      // 布+单开+拼接7+主布编号+配布1编号
      if (
        this.form.material === 1 &&
        this.form.open_way === 2 &&
        this.form.join_way === 7
      ) {
        cloth_main_no = true
        cloth_sub1_no = true
      }

      // 布+对开+拼接8，9+主布编号
      if (
        this.form.material === 1 &&
        this.form.open_way === 1 &&
        (this.form.join_way === 8 || this.form.join_way === 9)
      ) {
        cloth_main_no = true
      }

      // 有纱的时候 加纱帘编号
      if (this.form.material === 2 || this.form.material === 3) {
        cloth_yarn_no = true
      }

      return {
        cloth_main_no,
        cloth_sub1_no,
        cloth_sub1_no,
        cloth_sub2_no,
        cloth_lining_no,
        cloth_yarn_no,
      }
    },
  },
  created() {
    this.loadOptions()
    this.getHouseInfo()
  },
  methods: {
    materialFmt(row, column, cellValue, index) {
      return ['', '布', '纱', '布+纱', '成品帘'][cellValue]
    },
    danglingFmt(row, column, cellValue, index) {
      return ['', 'S钩', '打孔'][cellValue]
    },
    open_wayFmt(row, column, cellValue, index) {
      return ['', '对开', '单开'][cellValue]
    },
    loadOptions() {
      this.axios
        .get('/user/role')
        .then(({ data }) => {
          if (data?.msg) {
            this.$message.error(msg)
            return
          }

          this.roleList = data?.data
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    onSubmit(repeat = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.axios
            .post('/curtain', {
              ...this.form,
              contract_id: this.houseInfo?.id,
            })
            .then(({ data }) => {
              if (data?.msg) {
                this.$message.error(data.msg)
                return
              }

              this.$message.success('操作成功')
              if (repeat) {
                location.reload()
              } else {
                this.$router.push({
                  name: 'Admin.Curtain',
                })
              }
            })
            .catch((e) => {
              this.$message.error(e.message)
            })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      const { baseUrl, filePath } = res?.data
      this.form.image_url = baseUrl + filePath
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getHouseInfo() {
      const houseId = this.$route.query?.id
      this.axios
        .get(`/contract/${houseId}`)
        .then(({ data }) => {
          if (data?.msg) {
            this.$message.error(msg)
            return
          }
          this.houseInfo = { ...data.data }
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
