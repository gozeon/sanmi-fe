<template>
  <el-main>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      :rules="rules"
      size="small"
    >
      <el-divider content-position="left">合约基础信息</el-divider>
      <el-form-item label="合约编号" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>

      <el-form-item label="客户姓名" prop="client_name">
        <el-input v-model="form.client_name"></el-input>
      </el-form-item>

      <el-form-item label="客户电话" prop="client_phone_1">
        <el-input v-model="form.client_phone_1" />
      </el-form-item>

      <el-form-item label="客户备用电话" prop="client_phone_2">
        <el-input v-model="form.client_phone_2" />
      </el-form-item>

      <el-form-item label="客户微信号" prop="client_wechat">
        <el-input v-model="form.client_wechat" />
      </el-form-item>

      <el-form-item label="客户地址" prop="client_address">
        <el-input type="textarea" v-model="form.client_address" :rows="2" />
      </el-form-item>

      <el-form-item label="地上楼层数" prop="above_floor">
        <el-radio-group v-model="form.above_floor">
          <el-radio :label="1">平层或错层</el-radio>
          <el-radio :label="2">二层</el-radio>
          <el-radio :label="3">三层</el-radio>
          <el-radio :label="4">四层</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="地下楼层数" prop="under_floor">
        <el-radio-group v-model="form.under_floor">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1">负一层</el-radio>
          <el-radio :label="2">负二层</el-radio>
          <el-radio :label="3">负三层</el-radio>
          <el-radio :label="4">负四层</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="居室数量" prop="bedroom_num">
        <el-radio-group v-model="form.bedroom_num">
          <el-radio :label="1">一室</el-radio>
          <el-radio :label="2">二室</el-radio>
          <el-radio :label="3">三室</el-radio>
          <el-radio :label="4">四室</el-radio>
          <el-radio :label="5">五室</el-radio>
          <el-radio :label="6">六室</el-radio>
          <el-radio :label="7">七室</el-radio>
          <el-radio :label="8">八室</el-radio>
          <el-radio :label="9">九室</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="客厅数量" prop="living_room_num">
        <el-radio-group v-model="form.living_room_num">
          <el-radio :label="1">一厅</el-radio>
          <el-radio :label="2">二厅</el-radio>
          <el-radio :label="3">三厅</el-radio>
          <el-radio :label="4">四厅</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="卫生间数量" prop="rest_room_num">
        <el-radio-group v-model="form.rest_room_num">
          <el-radio :label="1">一卫</el-radio>
          <el-radio :label="2">二卫</el-radio>
          <el-radio :label="3">三卫</el-radio>
          <el-radio :label="4">四卫</el-radio>
          <el-radio :label="5">五卫</el-radio>
          <el-radio :label="6">六卫</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="客户来源" prop="client_source">
        <el-select v-model="form.client_source" placeholder="客户来源">
          <el-option label="介绍人介绍" :value="1"></el-option>
          <el-option label="公司分配" :value="2"></el-option>
          <el-option label="装饰公司介绍" :value="3"></el-option>
          <el-option label="陌生拜访" :value="4"></el-option>
          <el-option label="网路获客" :value="5"></el-option>
          <el-option label="自然到访" :value="6"></el-option>
          <el-option label="老客户介绍" :value="7"></el-option>
          <el-option label="其他" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="成交总金额(元)" prop="price">
        <el-input-number
          v-model="form.price"
          :controls="false"
          :precision="2"
        />
      </el-form-item>

      <el-form-item label="赠品" prop="gift">
        <el-select v-model="form.gift" placeholder="赠品">
          <el-option label="无" :value="0"></el-option>
          <el-option label="床品" :value="1"></el-option>
          <el-option label="电动窗帘电机一个" :value="2"></el-option>
          <el-option label="换洗纱帘或窗帘一套" :value="3"></el-option>
          <el-option label="靠包" :value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工期" prop="work_time">
        <el-select v-model="form.work_time" placeholder="工期">
          <el-option label="20天，正常工期" :value="1"></el-option>
          <el-option label="加急14天，需原价出售" :value="2"></el-option>
          <el-option label="加急7天，需原价的1.5倍" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="onSubmit('Admin.Curtain.New')"
          >保存并录入窗帘</el-button
        >
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
        number: [{ required: true, message: '必填项', trigger: 'blur' }],
        client_name: [{ required: true, message: '必填项', trigger: 'blur' }],

        client_phone_1: [
          {
            required: true,
            pattern: /^(13|14|15|17|18|19)[0-9]{9}$/,
            message: '请输入正确手机号',
            trigger: 'blur',
          },
        ],
        client_phone_2: [
          {
            required: true,
            pattern: /^(13|14|15|17|18|19)[0-9]{9}$/,
            message: '请输入正确手机号',
            trigger: 'blur',
          },
        ],
        client_wechat: [{ required: true, message: '必填项', trigger: 'blur' }],

        client_address: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        above_floor: [{ required: true, message: '必填项', trigger: 'blur' }],
        under_floor: [{ required: true, message: '必填项', trigger: 'blur' }],

        bedroom_num: [{ required: true, message: '必填项', trigger: 'blur' }],
        living_room_num: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        rest_room_num: [{ required: true, message: '必填项', trigger: 'blur' }],

        client_source: [{ required: true, message: '必填项', trigger: 'blur' }],
        price: [{ required: true, message: '必填项', trigger: 'blur' }],
        gift: [{ required: true, message: '必填项', trigger: 'blur' }],
        work_time: [{ required: true, message: '必填项', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.loadOptions()
  },
  methods: {
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
    onSubmit(next) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios
            .post('/contract', {
              ...this.form,
            })
            .then(({ data }) => {
              if (data?.msg) {
                this.$message.error(data.msg)
                return
              }

              this.$message.success('操作成功')
              this.$emit('done', data)
              this.visible = false
              this.form = {}

              if (next) {
                this.$router.push({ name: next, query: { id: data?.data } })
              }
            })
            .catch((e) => {
              this.$message.error(e.message)
            })
        }
      })
    },
  },
}
</script>
