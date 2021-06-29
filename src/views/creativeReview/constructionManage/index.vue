<template>
  <div class="app-container">
    <el-form :inline="true" :model="formdata" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="formdata.time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="送审开始日期"
          end-placeholder="送审结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          clearable
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formdata.searchKey" placeholder="请输入账号id或名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formdata.os" placeholder="请选择操作系统" clearable>
          <el-option label="Ios" value="ios"></el-option>
          <el-option label="Android" value="android"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formdata.displySence" placeholder="请选择广告类型" clearable>
          <el-option :label="item.name" :value="item.code" v-for="(item,i) in displySenceList" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formdata.taskStatus" placeholder="请选择任务状态" clearable>
          <el-option :label="item.name" :value="item.code" v-for="(item,i) in taskStatusList" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新建送审任务</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{ textAlign: 'center' }"
      style="width: 100%; margin-top: 10px;">
      <div v-for="(item, index) in columnsList" :key="index">
        <el-table-column
          v-if="item.prop==='startDate'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <p>{{scope.row.startDate.split(' ')[0]}} - {{scope.row.endDate.split(' ')[0]}}</p>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.prop==='sendHour'"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <p>{{item.formatter(scope.row.sendHour,scope.row.sendMinute)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.formatter"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <p>{{item.formatter(scope.row[item.prop])}}</p>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.buttons"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button :disabled="btnItem.showStatus&&btnItem.showStatus.indexOf(scope.row.taskStatus)>-1" :key="j" @click="btnItem.onclick(scope.row)" type="text" size="small" v-for="(btnItem,j) in item.buttons">{{ btnItem.label }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
        >
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
import { getDisplayScene, getTaskList, deleteTask, updateTask } from '@/api/creativeReview'
import Pagination from '@/components/Pagination'

export default {
  name: 'task-execution',
  components: { Pagination },
  data() {
    return {
      total: 0,
      pageNo: 1,
      pageSize: 10,
      formdata: {
        time: '',
        searchKey: '',
        displySence: '',
        taskStatus: '',
        os: ''
      },
      taskStatusList: [
        { code: 0, name: '暂停' },
        { code: 1, name: '启用' }
      ],
      displySenceList: [],
      oslist: [
        { code: 'ios', name: 'Ios' },
        { code: 'android', name: 'Android' }
      ],
      
      tableData: [],
      columnsList: [
        { prop: '', width: '1', align: 'center' },
        { prop: 'id', label: '送审任务ID', width: '150' },
        { prop: 'startDate', label: '送审日期', width: '350' },
        { prop: 'pubId', label: '账号ID', width: '350' },
        { prop: 'pubName', label: '账户名称', width: '180' },
        { prop: 'os', label: '操作系统', width: '180', formatter: this.osFormat },
        { prop: 'displySence', label: '广告形式', width: '280', formatter: this.displySenceFormat },
        { prop: 'adCount', label: '预审数量', width: '150' },
        { prop: 'sendHour', label: '执行时间', width: '200', formatter:this.sendHourFormat },
        { prop: 'taskStatus', label: '任务执行状态', width: '280', formatter: this.taskStatusFormat },
        { prop: 'actions', label: '操作', width: '280', buttons: [
          { label: '启用', onclick: this.handleEnable, showStatus: [1] },
          { label: '暂停', onclick: this.handledisEnable, showStatus: [0] },
          { label: '查看', onclick: this.handleViewPage },
          { label: '编辑', onclick: this.handleEdit },
          { label: '删除', onclick: this.handleDelect }
        ] }
      ]
    }
  },
  mounted() {
    this.getDisplaySceneList()
    this.getlist()
  },
  methods: {
    handleSearch() {
      this.pageNo = 1
      this.getlist()
    },
    getlist() {
      const param = {}
      for (const key in this.formdata) {
        if (key === 'time') {
          if (this.formdata[key]&&this.formdata[key].length > 0) {
            param.searchStart = Date.parse(this.formdata[key][0])
            param.searchEnd = Date.parse(this.formdata[key][1])
          }
        } else {
          if (this.formdata[key] === '') {
          } else {
            param[key] = this.formdata[key]
          }
        }
      }
      param.pageNo = this.pageNo
      param.pageSize = this.pageSize
      this.getListData(param)
    },
    getListData(param) {
      getTaskList(param).then((res) => {
        this.total = res.data.total
        this.tableData = res.data.list
      })
    },
    getDisplaySceneList() {
      getDisplayScene().then((res) => {
        this.displySenceList = res.data
      })
    },
    taskStatusFormat(cellval) {
      return this.statusFormat(cellval, this.taskStatusList)
    },

    displySenceFormat(cellval) {
      return this.statusFormat(cellval, this.displySenceList)
    },
    osFormat(cellval) {
      return this.statusFormat(cellval, this.oslist)
    },
    statusFormat(s, array) {
      for (const i in array) {
        const item = array[i]
        if (s == item.code) {
          return item.name
        }
      }
      return ''
    },
    sendHourFormat(hour,min){
      let mins=String(min).length>1?min:`0${min}`
      let hours=hour.split(',')
      let hourStr=[];
      hours.forEach((item,i)=>{
        hourStr.push(`${item}:${mins}`);
      })
      let str=hourStr.join(',');
      return str
    },
    handleDelect(param) {
      if(!this.compareTime(param)){
        this.$message({
            type: 'warning',
            message: '执行任务已结束,无法操作'
        })
        return false
      }
      const id = param.id
      const _this = this
      _this.$confirm(`确定要删除ID为${id}的送审任务吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTask({ id: id }).then((res) => {
          if (res.code === 200) {
            _this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this.pageNo = 1
            _this.getlist()
          } else {
            _this.$message({
              type: 'success',
              message: res.msg
            })
          }
        })
      })
    },
    handleEnable(row) {
      if(!this.compareTime(row)){
        this.$message({
            type: 'warning',
            message: '执行任务已结束,无法操作'
        })
        return false
      }
      const param = {
        id: row.id,
        startDateSt: row.startDateSt,
        endDateSt: row.endDateSt,
        taskStatus: 1
      }
      updateTask(param).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '启用成功'
          })
          this.handleSearch()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handledisEnable(row) {
      if(!this.compareTime(row)){
        this.$message({
            type: 'warning',
            message: '执行任务已结束,无法操作'
        })
        return false
      }
      const param = {
        id: row.id,
        startDateSt: row.startDateSt,
        endDateSt: row.endDateSt,
        taskStatus: 0
      }
      updateTask(param).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '暂停成功'
          })
          this.handleSearch()
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleAdd() {
      this.$router.push({ path: '/creativeReview/edit', query: { type: 'add' }})
    },
    handleEdit(row) {
      if(!this.compareTime(row)){
        this.$message({
            type: 'warning',
            message: '执行任务已结束,无法操作'
        })
        return false
      }
      this.$router.push({ path: '/creativeReview/edit', query: { type: 'edit', id: row.id }})
    },
    handleViewPage(row) {
      this.$router.push({ path: '/creativeReview/edit', query: { type: 'view', id: row.id }})
    },
    compareTime(param){
        const endDay = param.endDate.split(' ')[0];
        const nowtime = new Date();
        const endDate={
          year : endDay.split('-')[0],
          month: endDay.split('-')[1],
          day: endDay.split('-')[2],
          hour: param.sendHour.split(','),
          minute:param.sendMinute,
        }
        const now =new Date(); 
        const nowDate = {
          year:now.getFullYear(),
          month:now.getMonth() + 1,
          day:now.getDate(),
          hour:now.getHours(),
          minute:now.getMinutes()
        }
        if(endDate.year>nowDate.year){
          return true
        }else if(nowDate.year==endDate.year){
          if(endDate.month>nowDate.month){
            return true
          }else if(nowDate.month==endDate.month){
            if(endDate.day>nowDate.day){
              return true
            }else if(nowDate.day==endDate.day){
              let bigHour=[];
              let equalHour =[];
              endDate.hour.forEach((item)=>{
                if(Number(item)>Number(nowDate.hour)){
                  bigHour.push(item)
                }else if(Number(item)==Number(nowDate.hour)){
                  equalHour.push(item)
                }
              })
              if(bigHour.length>0){
                return true
              }else if(equalHour.lengtn>0){
                if(Number(endDate.minute)>Number(nowDate.minute)){
                  return true
                }else{
                  return false
                }
              }else{
                return false
              }
            }else{
              return false
            }
          }else{
            return false
          }
        }else{
          return false
        }
    }
  }
}
</script>
<style scoped>
  .pagination{
    float: right;
  }
</style>
