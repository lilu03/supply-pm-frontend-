<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-add">
        <el-input v-model="userId" placeholder="请输入账号ID或名称" suffix-icon="el-input__icon el-icon-search"
                  class="filter-input" @keyup.enter.native="fetchData"></el-input>
        <el-button class="filter-item" type="primary" @click="fetchData">搜 索</el-button>
      </div>
    </div>
    <el-table :data="dataList" class="table" style="margin-top: 20px;" highlight-current-row>
      <el-table-column align="left"  prop="report_date" label="账号ID">
        <template slot-scope="scope">{{ scope.row.pubId }}</template>
      </el-table-column>
      <el-table-column align="center"  prop="app_id" label="账号名称">
        <template slot-scope="scope">
          {{ scope.row.accountName }}
        </template>
      </el-table-column>
      <el-table-column align="right" prop="app_id" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleCreateApp(scope.row.pubId)" type="text" size="medium">审核</el-button>
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
  import Pagination from '@/components/Pagination'
  import { getPubList } from "@/api/account";
  export default {
    components: { Pagination },
    data() {
      return {
        queryFormat: {
          pageSize: 10,
          pageNo: 1,
          queryField: '03f441fde36e40b8930d4f7210b933f2',
          auditStatus:0
        },
        dataList: [
          {
            accountName:'账号id',
            pubId:'账号名称'
          }
        ],
        userId: '',
        total: 0
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      // @Event 获取列表
      fetchData() {
        if (this.userId !== "") {
          this.queryFormat.queryField = this.userId;
        }

        if (this.userId === "") {
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
        this.$router.push({
          path: '/check/accountEdit', query: { id: id } 
        })
      }
    },
    computed: {}
  }
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
    background: #E9E9E9;
  }
</style>
