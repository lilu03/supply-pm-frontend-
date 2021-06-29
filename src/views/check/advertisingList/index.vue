<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-add">
        <el-input
          v-model="userId"
          placeholder="请输入广告位ID或名称"
          suffix-icon="el-input__icon el-icon-search"
          class="filter-input"
          @keyup.enter.native="fetchData"
          clearable
        ></el-input>

        <el-button class="filter-item" type="primary" @click="fetchData">搜 索</el-button>
      </div>
    </div>
    <el-table :data="dataList" class="table" style="margin-top: 20px;" highlight-current-row>
      <el-table-column align="left" prop="report_date" label="广告位ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>

      <el-table-column align="center" prop="app_id" label="广告位名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column align="right" prop="app_id" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleCreateApp(scope.row.id)" type="text" size="medium">审核</el-button>
          <!-- <i class="el-icon-line"></i> -->
          <!-- <el-button type="text" icon="el-icon-star-on" size="medium"></el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      class="pagination"
      :total="total"
      :page.sync="queryFormat.pageNo"
      :limit.sync="queryFormat.pageSize"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { Management } from "@/api/advertising";

export default {
  components: { Pagination },
  data() {
    return {
      queryFormat: {
        pageSize: 10,
        pageNo: 1,
        queryField: "03f441fde36e40b8930d4f7210b933f2",
      },
      dataList: [
        {
          id: "广告位id",
          name: "广告位名称",
        },
      ],
      userId: "",
      total: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // @Event 获取列表
    fetchData() {
      Management({
        idOrName: this.userId,
        page: this.queryFormat.pageNo,
        size: this.queryFormat.pageSize,
        status: 1,
      }).then((res) => {
        let resp = res.data;
        //列表
        this.dataList = resp.pageItemList;
        //total总数
        this.total = resp.total;
      });
    },

    // @Event 查询账户详情
    handleCreateApp(id) {
      this.$router.push({
        path: "/check/advertisingEdit",
        query: { id },
      });
    },
  },
  computed: {},
};
</script>
<style scoped lang="scss">
.filter-container {
  overflow: hidden;
}

label {
  font-weight: 400;
}

.pagination {
  float: right;
  padding: 0;
  margin: 0;
}

.table {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}

.filter-item {
  width: 100px;
  height: 36px;
  margin-left: 15px;
}

.filter-input {
  width: 260px;
}

.el-icon-line {
  margin-left: 5px;
  margin-right: 5px;
  width: 1px;
  height: 12px;
  background: #e9e9e9;
}
</style>
