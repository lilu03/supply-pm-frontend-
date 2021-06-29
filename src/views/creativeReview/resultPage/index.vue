<template>
  <div class="app-container">
      <el-form ref="form" :model="formData" inline>
        <el-form-item>
          <el-date-picker
            clearable
            v-model="formData.time"
            type="daterange"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="送审开始日期"
            end-placeholder="送审结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formData.auditStatus"
            clearable
            placeholder="请选择审核状态"
          >
            <el-option
                v-for="(item, index) in statusOptions"
                :key="index"
                :label="item.en_name"
                :value="item.code"
            />
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formData.isApi"
            clearable
            placeholder="请选择审核方式"
          >
            <el-option
                v-for="(item, index) in auditTypeList"
                :key="index"
                :label="item.name"
                :value="item.code"
            />
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formData.adType"
            clearable
            placeholder="请选择广告类型"
          >
            <el-option
                v-for="(item, index) in displySenceList"
                :key="index"
                :label="item.name"
                :value="item.code"
            />
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.creativeId" placeholder="请输入创意ID" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.pubKey" placeholder="请输入账号ID或名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.searchKey" placeholder="请输入关键字" clearable></el-input>
        </el-form-item>
        <el-button type="primary" @click="handlesearch">搜索</el-button>
      </el-form>
      <div>
        <el-table 
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column label="创意ID" width="200">
            <template slot-scope="scope">{{scope.row.creativeId}}</template>
          </el-table-column> 
          <el-table-column label="广告标题" width="300">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>      
          <el-table-column label="广告描述" width="500">
            <template slot-scope="scope">{{scope.row.adDesc}}</template>
          </el-table-column>      
          <el-table-column label="预览" width="240">
            <template slot-scope="scope">
              <a :href="scope.row.imgUrl" target="_blank">
                <img style="width: 120px" :src="scope.row.imgUrl" alt />
              </a>
            </template>
          </el-table-column>
          <el-table-column label="落地页" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <a :href="scope.row.landUrl" target="_blank">点击查看</a>
              </el-button>
              <br />
              <el-button
                type="text"
                @click="handleViewLink(scope.row.landUrl,scope.row.fallback)"
                size="small"
              >
                <a target="_blank">查看链接</a>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="广告类型" width="150">
            <template slot-scope="scope">{{statusFormat(scope.row.adType)}}</template>
          </el-table-column>  
          <el-table-column label="广告源" width="150">
            <template slot-scope="scope">{{scope.row.adSource===0?'rtb':scope.row.adSource===1?'perf':''}}</template>
          </el-table-column>  
          <el-table-column label="开发者审核状态" width="120">
            <template slot-scope="scope">{{renderStatus(scope.row.auditStatus)}}</template>
          </el-table-column>
          <el-table-column label="拒绝原因" width="180">
            <template slot-scope="scope">{{scope.row.refuseReason}}</template>
          </el-table-column>
          <el-table-column label="审核方式" width="180">
            <template slot-scope="scope">{{scope.row.isApi?'API送审':'自主平台'}}</template>
          </el-table-column>
          <el-table-column label="账号ID" width="220">
            <template slot-scope="scope">{{scope.row.publisherId}}</template>
          </el-table-column>
          <el-table-column label="账户名称" width="200">
            <template slot-scope="scope">
              <a class="text-c" @click="handelSinginClick(scope.row.publisherId,scope.row.publisherName)" v-if="scope.row.canJump">{{scope.row.publisherName}}</a>
              <span v-else>{{scope.row.publisherName}}</span>
            </template>
          </el-table-column>
        </el-table>
        <pagination
                class="pagination"
                style="margin-top: 21px"
                :total="totalCategory"
                :page.sync="pageNo"
                :limit.sync="pageSize"
                @pagination="getlist"
              />
      </div>
      <el-dialog title="查看链接" width="55%" :visible.sync="dialogLink">
      <div v-if="landingPage">
        <div class="title">Deeplink URL：</div>
        <div id="demoInput" style="padding: 0 30px">{{ landingPage }}</div>
      </div>
      <div v-if="fallbackUrl">
        <div class="title">
          {{
            landingPage == "" && fallbackUrl ? "Landing URL：" : "Fallback URL"
          }}
        </div>
        <div id="demoInput1" style="padding: 0 30px">{{ fallbackUrl }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogLink = false"
          style="width: 110px; height: 36px"
          >取 消</el-button
        >
        <el-button v-if="landingPage" type="primary" @click="handleCopyClick"
          >复制Deeplink链接</el-button
        >
        <el-button
          v-if="fallbackUrl"
          type="primary"
          @click="handleCopyCategoryClick"
          >复制{{
            landingPage == "" && fallbackUrl ? "Landing" : "Fallback"
          }}链接</el-button
        >
      </span>
    </el-dialog>
  </div>
    
</template>

<script>
import { getSendCreatives,getDisplayScene } from "@/api/creativeReview";
import Pagination from "@/components/Pagination";
import { environment } from "@/utils/index";
import {
  getToken,
  getTokenType,
  removeAccountName,
  removeToken,
  removeTokenType,
} from "@/utils/auth";

export default {
  components: { Pagination },
  data() {
    return{
      formData:{
        searchKey:'',
        auditStatus:'',
        time:[],
        pubKey:'',
        adType:'',
        creativeId:'',
        isApi:''
      },
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
      statusOptions:[
        {
          code: "1",
          en_name: "待审核",
        },
        {
          code: "2",
          en_name: "通过",
        },
        {
          code: "3",
          en_name: "拒绝",
        },
      ],
      tableData:[],
      pretime:'',
      pageNo:1,
      pageSize:10,
      totalCategory:0,
      fallbackUrl:'',
      landingPage:'',
      dialogLink:false,
      displySenceList:[],
      auditTypeList:[
        {code:'0',name:'自主平台'},
        {code:'1',name:'API送审'}
      ]
    }
  },
  methods:{
    renderStatus(val){
      if(val==1){
        return '待审核'
      }else if(val==2){
        return '通过'
      }else if(val==3){
        return '拒绝'
      }
    },
    statusFormat(s){
      for (let i in this.displySenceList) {
        let item = this.displySenceList[i]
        if (s == item.code) {
          return item.name
        }
      }
      return ''

     },
    handlesearch(){
      this.pageNo=1;
      this.getlist();
    },
    handleViewLink(val, fallbackUrl) {
      this.dialogLink = true;
      this.landingPage = val;
      this.fallbackUrl = fallbackUrl;
    },
    getTimes() {
      this.pretime = moment().format('HH:mm:ss')//hour + ":" + minutes + ":" + seconds;
      const startDate = `${moment().subtract(30, 'day').format('YYYY-MM-DD')} 00:00:00`
      const endDate = moment().format('YYYY-MM-DD HH:mm:ss')
      this.formData.time = [startDate, endDate]
    },
    handleCopyClick() {
      const dom = document.querySelector("#demoInput");
      const input = document.createElement("input");
      input.setAttribute("value", this.landingPage);
      dom.appendChild(input);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      dom.removeChild(input);
      this.dialogLink = false;
    },
    handleCopyCategoryClick() {
      const dom = document.querySelector("#demoInput1");
      const input = document.createElement("input");
      input.setAttribute("value", this.fallbackUrl);
      dom.appendChild(input);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      dom.removeChild(input);
      this.dialogLink = false;
    },
    getDisplaySceneList(){
       getDisplayScene().then((res) => {
         this.displySenceList=res.data
      });
     },
     handelSinginClick(id,name) {
      let herf = "";
      let token = getToken();
        let token_type = getTokenType();
        if (location.host == "10.114.137.73") {
          window.open(
            // supplyCi测试
            `http://10.114.137.70/#/login?token=${token}&token_type=${token_type}&pubAccountId=${id}&accountName=${name}`
          );
          return;
        }
        if (environment() == "dev") {
          removeAccountName();
          removeToken();
          removeTokenType();
          // 本地地址
          window.open(
            `http://10.14.44.68:3006/#/login?token=${token}&token_type=${token_type}&pubAccountId=${id}&accountName=${name}`
          );
        } else {
          window.open(
            `http://pub.inmobi.cn/#/login?token=${token}&token_type=${token_type}&pubAccountId=${id}&accountName=${name}`
          );
        }
    },
  
    getlist(){
       let param = {};
       for(let key in this.formData){
         if(key =='time'){
            if(this.formData[key]&&this.formData[key].length>0){
              param.searchStart=Date.parse(this.formData[key][0]);
              param.searchEnd=Date.parse(this.formData[key][1]);
            }
         }else{
            if(this.formData[key] ===''){
              
            }else{
              if(key=='auditStatus'||key=='adType'){
                param[key]=Number(this.formData[key])
              } else if(key == 'isApi'){
                param[key]=this.formData[key]==='0'?false:true;
              }else{
                param[key]=this.formData[key]
              }
              
            }
         }
       }
       param.publisherId=this.pubId;
       param.pageNo= this.pageNo;
       param.pageSize= this.pageSize;
       getSendCreatives(param).then((res)=>{
         if(res.code==200){
          this.totalCategory=res.data.total;
          this.tableData=res.data.list;
         }
       })
     },
  },
  mounted(){
    this.getDisplaySceneList();
    // this.getTimes()
    this.getlist();
  }

}
</script>
<style scoped>
.tag{
  display: inline-block;
  padding: 8px;
  border: 1px solid #999;
  margin: 5px;
  border-radius: 15px;
  color:#666;
  cursor: pointer;
}
.normail{
  background: #fff;
}
.selected{
  background: rgb(234, 241, 254);
}
.text-c {
  font-size: 16px;
  color: #1f67f3;
}
.pagination{
  float: right;
}

</style>

