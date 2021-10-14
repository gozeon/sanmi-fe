<template>
  <el-main>
    <div>
      <new-role @done="loadData"></new-role>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{ background: '#f5f7fa' }"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="display_name" label="显示名字"> </el-table-column>
      <el-table-column
        prop="create_at"
        label="创建时间"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="update_at"
        label="修改时间"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="delete_at"
        label="删除时间"
        :formatter="dateFormat"
      >
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
import { format } from 'date-fns'
import NewRole from './NewRole.vue'
export default {
  components: {
    NewRole,
  },
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
    loadData() {
      this.axios
        .get('/user/role')
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
  },
}
</script>
