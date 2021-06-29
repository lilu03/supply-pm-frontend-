<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-add">

        <el-date-picker
          v-model="value1"
          value-format="yyyy-MM-dd"
          style="width:260px"
          type="daterange"
          @change="changeTime"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <el-input v-model="form.id" class="filter-input" placeholder="请输入搜索ID" @keyup.native.enter="fetchData"></el-input>

        <el-button class="filter-item" type="primary" @click="fetchData">搜 索</el-button>
      </div>
    </div>
    <el-table
      empty-text="暂无数据"
      v-loading="listLoading"
      :data="list"
      class="table"
      element-loading-text="加载中"
      style="margin-top: 20px;"
      highlight-current-row
    >
      <el-table-column align="left" prop="operateOn" label="时间">
      </el-table-column>
      <el-table-column align="center" prop="operateBy" label="操作者">
      </el-table-column>
      <!-- <el-table-column align="center" prop="system" label="类型">
      </el-table-column> -->
      <el-table-column align="right" prop="os" label="操作内容">
        <!-- <template slot-scope="scope">{{ scope.row.operateDesc }}</template> -->
        <template slot-scope="scope">
           <div v-html="scope.row.operateDesc"></div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      class="pagination"
      :total="total"
      :page.sync="form.page"
      :limit.sync="form.size"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
  import {operationList} from '@/api/operation'
  import Pagination from '@/components/Pagination'

  export default {
    components: { Pagination },
    data() {
      return {
        listLoading: false,
        list: [],
        form:{
          id:'',
          module:'',
          operateBy:'',
          start:'',
          end:'',
          page:1,
          size:10
        },
        total: 0,
        value1: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //列表
      fetchData(){
        let title=this.form
        title.id=title.id || this.$route.query.id 
        if( title.id!=undefined){
          operationList(title).then(res=>{
            this.list=res.data.pageItemList
            this.total=res.data.total
          })
        }
        // else{
        //   this.$message("请输入搜索ID")
        //   return
        // }
      },
      changeTime(val){
        this.form.start=val[0]
        this.form.end=val[1]
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
    margin-left: 15px;
  }
</style>
