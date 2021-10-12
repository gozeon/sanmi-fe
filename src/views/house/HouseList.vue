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
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="number" label="合约编号"></el-table-column>
      <el-table-column prop="client_name" label="客户姓名" width="100px">
      </el-table-column>
      <el-table-column prop="client_phone_1" label="客户电话" width="100px">
      </el-table-column>
      <el-table-column prop="client_phone_2" label="客户备用电话" width="120px">
      </el-table-column>
      <el-table-column prop="client_wechat" label="客户微信号" width="100px">
      </el-table-column>
      <el-table-column prop="client_address" label="客户地址">
      </el-table-column>
      <el-table-column prop="above_floor" label="地上楼层"> </el-table-column>
      <el-table-column prop="under_floor" label="地下楼层"> </el-table-column>

      <el-table-column prop="bedroom_num" label="居室数量"> </el-table-column>
      <el-table-column prop="living_room_num" label="客厅数量">
      </el-table-column>
      <el-table-column prop="rest_room_num" label="卫生间数量" width="100px">
      </el-table-column>

      <el-table-column prop="client_source" label="客户来源"> </el-table-column>
      <el-table-column prop="price" label="成交金额(元)" width="120px">
      </el-table-column>
      <el-table-column prop="gift" label="礼品"> </el-table-column>

      <el-table-column
        prop="create_at"
        label="创建时间"
        width="140px"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="update_at"
        label="修改时间"
        width="140px"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column
        prop="delete_at"
        label="删除时间"
        width="140px"
        :formatter="dateFormat"
      >
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.row)"
          >
            <el-button
              slot="reference"
              type="text"
              icon="el-icon-delete"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
import { format } from "date-fns";
export default {
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    dateFormat(row, column, cellValue, index) {
      if (cellValue) {
        return format(new Date(cellValue), "yyyy-MM-dd HH:mm:ss");
      }
      return cellValue;
    },
    loadData() {
      this.axios
        .get("/contract")
        .then(({ data }) => {
          if (data?.msg) {
            this.$message.error(msg);
            return;
          }

          this.tableData = data?.data;
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    handleDelete(scope) {
      this.axios
        .delete(`/user/${scope?.id}`)
        .then(({ data }) => {
          if (data?.msg) {
            this.$message.error(msg);
            return;
          }

          this.$message.success("操作成功");

          this.loadData();
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
  },
};
</script>
