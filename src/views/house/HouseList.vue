<template>
  <el-main>
    <router-link :to="{ name: 'Admin.House.New' }">
      <el-button size="mini" type="primary">新建</el-button>
    </router-link>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{ background: '#f5f7fa' }"
    >
      <el-table-column prop="id" label="ID" fixed="left"></el-table-column>
      <el-table-column
        prop="number"
        label="合约编号"
        fixed="left"
        width="100px"
      ></el-table-column>
      <el-table-column prop="client_name" label="客户姓名" width="100px">
      </el-table-column>
      <el-table-column prop="client_phone_1" label="客户电话" width="120px">
      </el-table-column>
      <el-table-column prop="client_phone_2" label="客户备用电话" width="120px">
      </el-table-column>
      <el-table-column prop="client_wechat" label="客户微信号" width="120px">
      </el-table-column>
      <el-table-column prop="client_address" label="客户地址" width="220px">
      </el-table-column>
      <el-table-column prop="above_floor" label="地上楼层"> </el-table-column>
      <el-table-column prop="under_floor" label="地下楼层"> </el-table-column>

      <el-table-column prop="bedroom_num" label="居室数量"> </el-table-column>
      <el-table-column prop="living_room_num" label="客厅数量">
      </el-table-column>
      <el-table-column prop="rest_room_num" label="卫生间数量" width="100px">
      </el-table-column>

      <el-table-column
        prop="client_source"
        label="客户来源"
        :formatter="sourceFormat"
        width="120px"
      >
      </el-table-column>
      <el-table-column prop="price" label="成交金额(元)" width="120px">
      </el-table-column>
      <el-table-column
        prop="gift"
        label="礼品"
        :formatter="giftFormat"
        width="120px"
      >
      </el-table-column>

      <el-table-column
        prop="create_at"
        label="创建时间"
        width="180px"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="update_at"
        label="修改时间"
        width="180px"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="delete_at"
        label="删除时间"
        width="180px"
        :formatter="dateFormat"
      >
      </el-table-column>

      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-tooltip slot="reference" effect="dark" content="删除">
              <el-button
                type="text"
                icon="el-icon-delete"
                :style="{ color: 'red' }"
              ></el-button>
            </el-tooltip>
          </el-popconfirm>

          <el-tooltip effect="dark" content="新建窗帘">
            <el-button
              type="text"
              icon="el-icon-plus"
              @click="
                $router.push({
                  name: 'Admin.Curtain.New',
                  query: { id: scope.row.id },
                })
              "
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
import { format } from 'date-fns'
export default {
  components: {},
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    dateFormat(row, column, cellValue, index) {
      if (cellValue) {
        return format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss')
      }
      return cellValue
    },
    sourceFormat(row, column, cellValue, index) {
      return [
        '介绍人介绍',
        '公司分配',
        '装饰公司介绍',
        '陌生拜访',
        '网路获客',
        '自然到访',
        '老客户介绍',
        '其他',
      ][+cellValue]
    },
    giftFormat(row, column, cellValue, index) {
      return ['无', '床品', '电动窗帘电机一个', '换洗纱帘或窗帘一套', '靠包'][
        +cellValue
      ]
    },
    loadData() {
      this.axios
        .get('/contract')
        .then(({ data }) => {
          if (data?.msg) {
            this.$message.error(msg)
            return
          }

          this.tableData = data?.data
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
    handleDelete(scope) {
      this.axios
        .delete(`/user/${scope?.id}`)
        .then(({ data }) => {
          if (data?.msg) {
            this.$message.error(msg)
            return
          }

          this.$message.success('操作成功')

          this.loadData()
        })
        .catch((e) => {
          this.$message.error(e.message)
        })
    },
  },
}
</script>
