<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-add">
        <el-input
          v-model="userId"
          placeholder="请输入应用ID或名称"
          suffix-icon="el-input__icon el-icon-search"
          class="filter-input"
          clearable
          @keyup.enter.native="fetchData"
        ></el-input>

        <el-button class="filter-item" type="primary" @click="fetchData">搜 索</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      class="table"
      element-loading-text="加载中"
      style="margin-top: 20px;"
      highlight-current-row
    >
      <el-table-column align="left" prop="report_date" label="应用名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="app_id" label="操作记录">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="operate(scope.row.appId)">操作记录</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" prop="os" label="操作" class="right-tbn">
        <template slot-scope="scope">
          <el-button @click="handleCreateApp(scope.row.id)" type="text" size="medium">详情</el-button>
        </template>
        <i class="el-icon-line"></i>
        <el-button type="text" icon="el-icon-star-on" size="medium"></el-button>
        <!-- <i class="el-icon-star-on"></i> -->
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
import {Management} from "@/api/useSetting"
export default {
  components: { Pagination },
  data() {
    return {
      pagerCount: 5,
      queryFormat: {
        pageSize: 10,
        pageNo: 1,
        queryField: "03f441fde36e40b8930d4f7210b933f2",
      },
      listLoading: false,
      list: [
        {name: "wps",operation: "王小虎",},
      ],
      userId: "",
      total: 4,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // @Event 获取列表
    fetchData() {
      Management({idOrName:this.userId,page:this.queryFormat.pageNo,size:this.queryFormat.pageSize}).then(res=>{
        // console.log(res.data,99)
        let resp=res.data;
        //列表
        this.list=resp.pageItemList;
        this.list.map(res=>{
          res['operation']='操作记录'
        });
        //total总数
        this.total=resp.total;

      })
    },
    operate(id){
      this.$router.push({
        path:'/operation',
        query:{id}
      })
    },

    handlePlacementFilter() {},

    handleCreateApp(id) {
      this.$router.push({
        path: "/useSetting/edit2",
        query:{id:id}
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
