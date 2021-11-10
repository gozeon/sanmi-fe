<template>
  <el-main>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :header-cell-style="{ background: '#f5f7fa' }"
    >
      <el-table-column
        prop="room_name"
        label="房间名称"
        fixed="left"
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
        prop="fabric_kind"
        label="布料种类"
        :formatter="fabric_kindFmt"
      ></el-table-column>
      <el-table-column
        prop="open_way"
        label="打开方式"
        :formatter="open_wayFmt"
      ></el-table-column>

      <el-table-column prop="width" label="宽(单位: 米)"></el-table-column>
      <el-table-column prop="height" label="高(单位: 米)"></el-table-column>
      <el-table-column
        prop="join_way"
        label="拼接方式"
        :formatter="join_wayFmt"
      ></el-table-column>

      <el-table-column prop="cloth_main_no" label="主布编号"></el-table-column>
      <el-table-column prop="cloth_sub1_no" label="配布1编号"></el-table-column>
      <el-table-column prop="cloth_sub2_no" label="配布2编号"></el-table-column>
      <el-table-column
        prop="cloth_lining_no"
        label="衬布编号"
      ></el-table-column>
      <el-table-column prop="cloth_yarn_no" label="纱布编号"></el-table-column>

      <el-table-column prop="drape_multiple" label="褶皱倍数"></el-table-column>
      <el-table-column prop="lace_no" label="花边编号"></el-table-column>
      <el-table-column
        prop="lace_way"
        label="花边车缝方式"
        :formatter="lace_wayFmt"
      ></el-table-column>
      <el-table-column prop="craft_desc" label="工艺特殊要求"></el-table-column>

      <el-table-column
        prop="curtain_scarf"
        label="窗幔"
        :formatter="curtain_scarfFmt"
      ></el-table-column>
      <el-table-column
        prop="curtain_scarf_deep"
        label="窗帘盒深(单位: 米)"
      ></el-table-column>
      <el-table-column prop="curtain_scarf_no" label="编号"></el-table-column>

      <el-table-column
        prop="rail_cloth_type"
        label="布帘"
        :formatter="railFmt"
      ></el-table-column>
      <el-table-column prop="rail_cloth_no" label="布帘编号"></el-table-column>
      <el-table-column
        prop="rail_yarn_type"
        label="纱帘"
        :formatter="railFmt"
      ></el-table-column>
      <el-table-column prop="rail_yarn_no" label="纱帘编号"></el-table-column>
      <el-table-column
        prop="rail_set_way"
        label="安装方式"
        :formatter="rail_set_wayFmt"
      ></el-table-column>

      <el-table-column
        prop="rail_set_posi"
        label="安装位置"
        :formatter="rail_set_posiFmt"
      ></el-table-column>
      <el-table-column
        prop="rail_battery_type"
        label="电池类型"
        :formatter="rail_battery_typeFmt"
      ></el-table-column>

      <el-table-column
        prop="rail_electric_lift"
        label="电动升降（和高度相关）"
        :formatter="rail_electric_liftFmt"
      ></el-table-column>
      <el-table-column
        prop="rail_left_size"
        label="L型左尺寸"
      ></el-table-column>
      <el-table-column
        prop="rail_right_size"
        label="L型右尺寸"
      ></el-table-column>

      <el-table-column prop="rail_remark" label="备注"></el-table-column>

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
      ></el-table-column>
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
    materialFmt(row, column, cellValue, index) {
      return ['', '布', '纱', '布+纱', '成品帘'][cellValue]
    },
    danglingFmt(row, column, cellValue, index) {
      return ['', 'S钩', '打孔'][cellValue]
    },
    fabric_kindFmt(row, column, cellValue, index) {
      return ['', '定高2.8米', '定宽1.4米', '定宽2.8米'][cellValue]
    },
    open_wayFmt(row, column, cellValue, index) {
      return ['', '对开', '单开'][cellValue]
    },
    join_wayFmt(row, column, cellValue, index) {
      return cellValue ?? '无'
    },
    lace_wayFmt(row, column, cellValue, index) {
      return ['无', '横向车缝', '竖向车缝'][cellValue]
    },
    curtain_scarfFmt(row, column, cellValue, index) {
      return ['无', '一字型', 'U字型'][cellValue]
    },
    railFmt(row, column, cellValue, index) {
      return ['无', '直轨', '直杆', 'L型杆轨', '超薄轨', '弯轨', '电动开合'][
        cellValue
      ]
    },
    rail_set_wayFmt(row, column, cellValue, index) {
      return ['', '侧装', '顶装', '法兰'][cellValue]
    },
    rail_set_posiFmt(row, column, cellValue, index) {
      return ['', '框内', '框外'][cellValue]
    },
    rail_battery_typeFmt(row, column, cellValue, index) {
      return ['', '锂电池', '插电'][cellValue]
    },
    rail_electric_liftFmt(row, column, cellValue, index) {
      return ['', '是', '否'][cellValue]
    },

    loadData() {
      this.axios
        .get('/curtain')
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
