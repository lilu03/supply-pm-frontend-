<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-add">
        <el-input
          v-model="userId"
          placeholder="请输入广告位ID或名称"
          suffix-icon="el-input__icon el-icon-search"
          class="filter-input"
          clearable
          @keyup.enter.native="fetchData(userId)"
        ></el-input>

        <el-button class="filter-item" type="primary" @click="fetchData(userId)">搜 索</el-button>
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
      <el-table-column align="left" prop="report_date" label="广告位名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" prop="app_id" label="广告位ID">
        <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
        <template slot-scope="scope">
          <a
            style="color: #1F67F3"
            @click="handleDetail(scope.row.id)"
            type="text"
            size="medium"
          >{{ scope.row.id }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="os" label="设置">
        <template slot-scope="scope">
          <el-button
            @click="handleCreateApp(scope.row.id)"
            type="text"
            size="medium"
          >{{ scope.row.setting }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="os" label="状态">
        <template slot-scope="scope">{{ scope.row.isTestPlacement==0?'正式':'测试' }}</template>
      </el-table-column>
      <el-table-column align="center" prop="os" label="审核">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column align="right" prop="os" label="记录">
        <template slot-scope="scope">
          <el-button type="text" size="medium" @click="operate(scope.row.id)">操作记录</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column align="right" prop="os" label="记录">
        <el-button type="text" icon="el-icon-star-on" size="medium"></el-button>
      </el-table-column>-->
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
import { Management, getPlacementStatus } from "@/api/advertising";
export default {
  components: { Pagination },
  data() {
    return {
      pagerCount: 5,
      queryFormat: {
        pageSize: 10,
        pageNo: 1,
        total: 0,
      },
      listLoading: false,
      list: [
        {
          name: "广告位名称",
          id: "广告位Id",
          // setting: '设置',
          isTestPlacement: "状态",
          status: "审核",
          // record1: '记录',
        },
      ],
      userId: "",
      total: 4,
      result: "",
    };
  },
  created() {
    this.placementStatus(); //状态字典
    this.fetchData();
  },
  methods: {
    handlePlacementFilter() {},
    //table列表
    fetchData() {
      Management({
        idOrName: this.userId,
        page: this.queryFormat.pageNo,
        size: this.queryFormat.pageSize,
      }).then((res) => {
        let resp = res.data;
        //列表
        this.list = resp.pageItemList;
        this.list.map((res) => {
          res["setting"] = "设置";
          res["record1"] = "操作记录";
          for (let i in this.result) {
            // console.log(i,result[i])
            if (res["status"] == i) {
              res["status"] = this.result[i];
            }
          }
        });
        //total总数
        this.total = resp.total;
      });
    },
    //获取广告位状态字典
    placementStatus() {
      getPlacementStatus().then((res) => {
        this.result = res.data;
      });
    },
    handleCreateApp(id) {
      this.$router.push({
        path: '/advertising/edit2',
        query:{id:id}
      })
    },
    handleDetail(id){
      this.$router.push({
        path: '/advertising/detail',
        query:{id:id}
      })
    },
    operate(id){
      this.$router.push({
        path:'/operation',
        query:{id}
      })
    }

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
</style>

