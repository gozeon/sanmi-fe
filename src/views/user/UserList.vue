<template>
  <el-main>
    <div>
      <new-user @done="loadData"></new-user>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="role.display_name" label="角色"> </el-table-column>
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
import NewUser from "./NewUser.vue";
export default {
  components: {
    NewUser,
  },
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
        .get("/user")
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
