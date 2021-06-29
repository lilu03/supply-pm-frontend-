<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-add">
        <el-input
          v-model="userId_value"
          placeholder="请输入账号ID或名称"
          suffix-icon="el-input__icon el-icon-search"
          class="filter-input"
          clearable
          @keyup.enter.native="fetchData"
        ></el-input>

        <el-button class="filter-item" type="primary" @click="fetchData">搜 索</el-button>
      </div>
    </div>
    <el-table :data="dataList" class="table" style="margin-top: 20px;" highlight-current-row>
      <el-table-column align="left" prop="report_date" label="账户名称">
        <template slot-scope="scope">{{ scope.row.accountName }}</template>
      </el-table-column>
      <el-table-column align="center" prop="app_id" label="操作记录">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="medium">{{ scope.row.pubId }}</el-button> -->
          <el-button type="text" size="medium" @click="operate(scope.row.pubId)">操作记录</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="os" label="审核状态">
        <template slot-scope="scope">{{ scope.row.auditStatus }}</template>
      </el-table-column>
      <el-table-column align="right" prop="app_id" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleCreateApp(scope.row.pubId)" type="text" size="medium">详情</el-button>
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
import { getPubList } from "@/api/account";

export default {
  components: { Pagination },
  data() {
    return {
      queryFormat: {
        pageSize: 10,
        pageNo: 1,
      },
      dataList: [],
      userId_value: "",
      total: 0,
      userId: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // @Event 获取列表
    fetchData() {
      if (this.userId_value !== "") {
        this.queryFormat.queryField = this.userId_value;
      }

      if (this.userId_value === "") {
        this.queryFormat.queryField = "";
      }

      getPubList(this.queryFormat).then((res) => {
        if (res.code === 200) {
          this.dataList = res.data.list;
          this.queryFormat.pageSize = res.data.pageSize;
          this.total = res.data.total;
        }
      });
    },

    // @Event 查询账户详情
    handleCreateApp(id) {
      this.$router.push({ path: "/home/edit2", query: { id: id } });
    },

    operate(id){
      this.$router.push({
        path:'/operation',
        query:{id}
      })
    }
  },
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
  margin-bottom: 40px;
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
