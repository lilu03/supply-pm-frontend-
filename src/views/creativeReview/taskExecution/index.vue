<template>
  <div class="app-container">
    <el-form :inline="true" :model="formdata" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="formdata.time"
          type="daterange"
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          range-separator="至"
          start-placeholder="任务执行开始日期"
          end-placeholder="任务执行结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>          

      <el-form-item>
        <el-input v-model="formdata.taskId" placeholder="请输入任务id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formdata.exeStatus" placeholder="请选择任务状态" clearable>
          <el-option v-for="(item,i) in taskStatusList" :key="i" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%; margin-top: 10px;">
      <div v-for="(item, index) in columnsList" :key="index">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-if="item.prop=='exeStatus'"
          >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.remark " placement="top" v-show="scope.row.exeStatus===0">
              <p>{{item.formatter(scope.row[item.prop])}}</p>
            </el-tooltip>
            <p v-show="scope.row.exeStatus!=0">{{item.formatter(scope.row[item.prop])}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-else-if="item.formatter && item.prop!='exeStatus'"
          show-overflow-tooltip>
            <template slot-scope="scope">
              <p>{{item.formatter(scope.row[item.prop])}}</p>
            </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          v-else
          show-overflow-tooltip>
        </el-table-column>
      </div>
    </el-table>
    <pagination
      class="pagination"
      :total="total"
      :page.sync="pageNo"
      :limit.sync="pageSize"
      @pagination="getlist"
    />
  </div>
</template>
<script>
import { getTaskHistory } from '@/api/creativeReview'
import Pagination from '@/components/Pagination'
export default {
  name: 'taskExecution',
  components: { Pagination },
  data(){
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      formdata: {
        time:'',
        taskId:'',
        exeStatus:'',
      },
      taskStatusList: [
        {code: 0, name: '执行失败'},
        {code: 1, name: '执行成功'},
        {code: 2, name: '执行中'}
      ],
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      tableData:[],
      columnsList:[
        { prop: '', width: '1', align: 'center' },
        { prop: 'taskId', label: '任务ID' },
        { prop: 'exeStatus', label: '执行状态', formatter: this.exeStatusFormat  },
        { prop: 'exeTime', label: '执行时间' },
        { prop: 'successCount', label: '成功数量', width: '280' },
        { prop: 'taskCount', label: '任务计划数量', width: '280' },
      ]
    }
  },
   methods:{
     handleSearch(){
      this.pageNo=1;
      this.getlist();
     },
     getlist(){
       let param = {};
       for(let key in this.formdata){
         if(key =='time'){
            if(this.formdata[key]&&this.formdata[key].length>0){
              param.searchStart=Date.parse(this.formdata[key][0]);
              param.searchEnd=Date.parse(this.formdata[key][1]);
            }
         }else{
            if(this.formdata[key] ===''){
              
            }else{
              param[key]=Number(this.formdata[key])
            }
         }
       }
    
       param.pageNo= this.pageNo;
       param.pageSize= this.pageSize;
       getTaskHistory(param).then((res)=>{
          this.total=res.data.total;
          this.tableData=res.data.list;
       })
     },
     exeStatusFormat(cellval){
      return this.statusFormat(cellval,this.taskStatusList);
     },
     statusFormat(s,array){
      for (let i in array) {
        let item = array[i]
        if (s === item.code) {
          return item.name
        }
      }
      return ''
    }
   },
  mounted(){
    this.getlist()
  }
}
</script>
<style scoped>
  .pagination{
    float: right;
  }
</style>
