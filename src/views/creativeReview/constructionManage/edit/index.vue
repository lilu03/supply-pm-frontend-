<template>
  <div>
    <el-form :model="formdata" :rules="rules" ref="ruleForm" label-width="240px">
      <el-col :span="24" style="padding: 10px 10px">
        <h3>{{pageType=='add'?'新建送审任务':pageType=='view'?'查看送审任务':'编辑送审任务'}}</h3>
      </el-col>
      <el-form-item label="送审日期:" prop="time">
        <el-date-picker
            v-model="formdata.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            :disabled="pageType==='view'"
            >
          </el-date-picker>
      </el-form-item>
      <el-form-item label="送审开发者:" prop="pubId">
        <el-select v-model="formdata.pubId" placeholder="请选择送审开发者" @change="getAdLocation" :disabled="pageType!='add'">
          <el-option :label="item.name" :value="item.pubId" v-for="(item,i) in publisherList" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告位:" prop="placementId">
        <el-select v-model="formdata.placementId" placeholder="请选择广告位" @change="changePlacementId" :disabled="pageType!='add'">
          <el-option :label="item.pName" :value="item.id" v-for="(item,i) in adLocation" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作系统:" prop="os">
        <el-select v-model="formdata.os" placeholder="请选择操作系统" disabled>
          <el-option :label="item.name" :value="item.code" v-for="(item,i) in osList" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告形式:">
        <el-select v-model="formdata.displySence" placeholder="请选择广告形式" disabled>
          <el-option :label="item.name" :value="item.code" v-for="(item,i) in adTypeList" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="送审广告源:">
        <span class="require-span">*</span>
      <div>
          <div>
              <el-select v-model="formdata.adSource" placeholder="请选择广告源" :disabled="forReviewList.length>0||pageType!='add'">
                <el-option :label="item.name" :value="item.code" v-for="(item,i) in adSourceTag" :key="i"></el-option>
              </el-select>
              <el-select v-model="formdata.priority" placeholder="请选择优先级" :validate-event="false" :disabled="pageType!='add'">
                <el-option :label="item" :value="item" v-for="(item,i) in priorityList" :key="i"></el-option>
              </el-select>
              <el-input v-model="formdata.adgroupId" placeholder="请输入广告组ID" v-show="formdata.adSource==='1'" :disabled="pageType!='add'"></el-input>
              <el-select v-model="formdata.admasterName" placeholder="请输入广告主名称" v-show="formdata.adSource==='0'" :disabled="pageType!='add'">
                <el-option :label="item" :value="item" v-for="(item,i) in dspIdList" :key="i"></el-option>
              </el-select>
              <el-button @click="addDsp" :disabled="pageType!='add'">添加</el-button>
          </div>
          <p class="tip" v-if="!formdata.adSource&&sourcetipmsg">{{sourcetipmsg}}</p>
          <p class="tip" v-if="!formdata.priority&&priortipmsg">{{priortipmsg}}</p>
          <p class="tip" v-if="tipmsg">{{tipmsg}}</p>
          <el-tag
            v-for="(tag,i) in forReviewList"
            :key="i"
            :closable="pageType =='add'"
            type=""
            @close="handleClose(tag)"
            >
            {{renderTag(tag)}}
          </el-tag>
      </div>
      </el-form-item>
      <el-form-item label="预审数量:" prop="adCount">
        <el-input 
          v-model="formdata.adCount"
          oninput="if(value > 5000 || value < 1 ){value = ''}"
          onkeyup="value=value.replace(/[^\d]/g,'');"
          placeholder="请输入1-5000的正整数"
          :disabled="pageType==='view'"
        ></el-input>
      </el-form-item>
      <el-form-item label="执行时间:" prop="sendtime">
        <span class="requireTime-span">*</span>
        <div>
          <el-select v-model="formdata.sendHour" multiple placeholder="可多选执行时间-小时" :disabled="pageType==='view'" :validate-event="false">
            <el-option
              v-for="item in hourList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          :
          <el-input 
          :disabled="pageType==='view'"
          placeholder="请输入执行时间-分钟" 
          v-model="formdata.sendMinute"
          oninput="if(value > 59 || value < 0 ){value = ''}"
          onkeyup="value=value.replace(/[^\d]/g,'');"
          :validate-event="false"
          ></el-input>
        </div>

      </el-form-item>
      <el-form-item v-show="pageType!='view'">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click='handleSave'>保存</el-button>
      </el-form-item>
      <el-form-item v-show="pageType=='view'">
        <el-button @click="handleCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAuditPublishers,getAllDspIds,getDisplayScene, getPubAuditWithPlacements, createSendTask, getTaskList, updateTask } from '@/api/creativeReview'
export default {
  name:'edit',
  data(){
    var validateDsp = (rule,value,cb)=>{
      console.log(value,'val')
      if(this.forReviewList.length>0){
        cb()
      }else{
        cb('请添加送审广告源')
      }
    }
    var validateSendTime=(rule,value,cb)=>{
      if(this.formdata.sendHour.length==0){
        cb('请选择执行时间-小时')
      } else if(!this.formdata.sendMinute){
        cb('请选择执行时间-分钟')
      }else{
        cb()
      }
    }
    return {
      formdata:{
        time:'',
        pubId:'',
        adSource:'',//广告源
        priority:'',//优先级
        admasterName:'',//广告主
        adCount:'',//预审数量
        sendHour:[],
        sendMinute:'',
        placementId:'',
        dspIds:1,
      },
      rules:{
        time:[
          { required: true, message: '请选择送审时间', trigger: 'blur' },
        ],
        pubId:[
          { required: true, message: '请选择开发者', trigger: 'blur' },
        ],
        placementId:[
          { required: true, message: '请选择广告位', trigger: 'blur' },
        ],
        adCount:[
          { required: true, message: '请输入预审数量', trigger: 'blur' }
        ],
        sendtime:[
          { validator: validateSendTime,trigger:'blur' },
        ]
      },
      pickerOptions: {
						disabledDate(time) {
							return time.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
						}
			},
      adTypeList:[],//广告形式list
      publisherList:[],//开发者list
      adSourceTag:[
        {
          code:'1',name:'perf'
        },
        {
          code:'0',name:'rtb'
        }
      ],//广告源list
      adLocation:[],//广告位
      osList:[
        {code:'ios',name:'Ios'},
        {code:'android',name:'Android'},
      ],
      forReviewList:[
        // {adSource:'',priority:'',adgroupId:'',admasterName:''}
      ],
      priorityList:[1,2,3,4,5,6,7,8,9,10],
      dspIdList:[],
      hourList:['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
      tipmsg:'',
      priortipmsg:'',
      sourcetipmsg:'',
      PubAuditWithPlacements:[],//广告位数据
      pageType:'add',
    }
  },
  methods:{
    getPublistList(){
      getAuditPublishers().then((res) => {
        if(res.code==200){
          this.publisherList=res.data;
        }
      });
    },
    getDspIdsList(){
      getAllDspIds().then((res)=>{
       if(res.code==200){
         this.dspIdList=res.data;
       }
      })
    },
    getDisplaySceneList(){
       getDisplayScene().then((res) => {
         if(res.code==200){
         this.adTypeList=res.data
        }
      });
    },
    getAdLocation(val,type){
      if(!type){
        this.formdata.placementId='';
        this.formdata.os='';
        this.formdata.displySence='';
      }
      this.PubAuditWithPlacements.forEach((item,i)=>{
            if(item.pubId==val){
              this.adLocation=item.placements;
            }
      })
    },
    queryPubAuditWithPlacements(){
      getPubAuditWithPlacements().then((res)=>{
        if(res.code==200){
          this.PubAuditWithPlacements=res.data;
        }
      })
    },
    changePlacementId(val){
      this.adLocation.forEach((item,i)=>{
        if(val==item.id){
          console.log(item)
          this.formdata.os=item.remarkObj.os;
          this.formdata.displySence=String(item.remarkObj.display)
        }
      })
    },
    addDsp(){
      if(this.formdata.adSource===''){
        this.sourcetipmsg="请选择广告源"
        return
      }else if(!this.formdata.priority){
        this.priortipmsg="请选择优先级"
        return
      }else{
        if(this.formdata.adSource==='1'){
          const val=this.forReviewList.find((item,i)=>{
            return item.adSource==='1'&&item.priority==this.formdata.priority
          })
          if(val){
            this.tipmsg="perf优先级不可以重复"
            return
          }else{
            this.tipmsg=""
          }
        }else if(this.formdata.adSource==='0'){
          const val=this.forReviewList.find((item,i)=>{
            return item.adSource==='0'&&item.priority==this.formdata.priority
          })
          if(val){
            this.tipmsg="rtb优先级不可以重复"
            return
          }else{
            this.tipmsg=""
          }
        }
      }
      this.forReviewList.push({adSource:this.formdata.adSource,priority:this.formdata.priority,adgroupId:this.formdata.adgroupId,admasterName:this.formdata.admasterName})
      this.formdata.priority='';
      this.formdata.adgroupId='';
      this.formdata.admasterName='';
      this.sourcetipmsg='';
      this.priortipmsg='';
    },
    renderTag(tag){
      if(tag.adSource==='1'&&tag.adgroupId){
        return `广告源:perf,优先级:${tag.priority},广告组ID:${tag.adgroupId}`
      }else if(tag.adSource==='1'&&!tag.adgroupId){
        return `广告源:perf,优先级:${tag.priority}`
      }else if(tag.adSource==='0'&&tag.admasterName){
        return `广告源:rtb,优先级:${tag.priority},广告主名称:${tag.admasterName}`
      }else if(tag.adSource==='0'&&!tag.admasterName){
        return `广告源:rtb,优先级:${tag.priority}`
      }
    },
    sortByKey(array,key){
      return array.sort(function(a,b){
          var x = a[key];
          var y = b[key];
          return((x>y)?1:((x<y)?-1:0));
      })
    },
    handleSave(){
      if(this.forReviewList.length===0){
        this.$message({
          message: '请点击添加送审广告源',
          type: 'warning'
        });
        return false
      }
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
            let param={
              pubId:this.formdata.pubId,
              placementId:this.formdata.placementId,
              adCount:this.formdata.adCount,
              startDateSt:this.formdata.time[0],
              endDateSt:this.formdata.time[1],
              sendHour:this.formdata.sendHour.join(','),
              sendMinute:this.formdata.sendMinute,
              adSource:Number(this.formdata.adSource),
            }
            if(Number(this.formdata.adSource)===1){
              let data=this.forReviewList;
              // let arr = this.sortByKey(data,'priority');
              let arrgroup=[];
              data.forEach((item,i)=>{
                arrgroup.push({groupIds:item.adgroupId,order:item.priority})
              })
              param.groupIds=JSON.stringify(arrgroup);
            }else if(Number(this.formdata.adSource)===0){
              let data=this.forReviewList;
              // let arr = this.sortByKey(data,'priority');
              let arrdspIds=[];
              data.forEach((item,i)=>{
                arrdspIds.push({dspId:item.admasterName,order:item.priority})
              })
              param.dspIds=JSON.stringify(arrdspIds)
            }
            if(this.pageType=='add'){
              createSendTask(param).then((res)=>{
                if(res.code=='200'){
                  this.$message({
                    message: '新建成功',
                    type: 'success'
                  });
                  this.$router.push({path:'/creativeReview/constructionManage'})
                }
              }).catch((res)=>{
                this.$message({
                    message: res.msg,
                    type: 'error'
                  });
              })
            }else if(this.pageType=='edit'){
              param.id=this.$route.query.id;
              updateTask(param).then((res)=>{
                if(res.code==200){
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  });
                  this.$router.push({path:'/creativeReview/constructionManage'})
                }
              }).catch((res)=>{
                this.$message({
                    message: res.msg,
                    type: 'error'
                  });
              })
            }
          } else {
            return false;
          }
      })
    },
    handleCancel(){
      this.$router.push({path:'/creativeReview/constructionManage'})
    },
    handleClose(tag) {
      this.forReviewList.forEach((item,i)=>{
        if(item.adSource==tag.adSource&&item.priority==tag.priority&&item.admasterName==tag.admasterName&&item.adgroupId==tag.adgroupId){
          this.forReviewList.splice(i,1);
        }
      })
    },

  },
  beforeRouteEnter(to,form,next){
    console.log(to,'to')
    if(to.query.type=='add'){
      document.title = '新建送审任务'
    }else if(to.query.type=='edit'){
      document.title = '编辑送审任务'
    }else if(to.query.type=='view'){
      document.title = '查看送审任务'
    }
    next()
  },
  mounted(){
    this.pageType=this.$route.query.type;
    this.getPublistList();
    this.getDspIdsList();
    this.getDisplaySceneList();
    this.queryPubAuditWithPlacements();
    this.$nextTick(()=>{
      this.$refs['ruleForm'].clearValidate('dspIds')
    })
    if(this.$route.query.type=='edit'||this.$route.query.type=='view'){
        getTaskList({id:this.$route.query.id}).then((res)=>{
          if(res.code==200){
            let obj = res.data.list.length>0?res.data.list[0]:{};
            if(obj==={}){
              return false
            }
              this.formdata={
                time:[obj.startDate.split(' ')[0],obj.endDate.split(' ')[0]],
                os:obj.os,
                pubId:obj.pubId,
                placementId:obj.placementId,
                adCount:obj.adCount,
                sendHour:obj.sendHour.split(','),
                sendMinute:String(obj.sendMinute),
                displySence:String(obj.displySence),
                adSource:String(obj.adSource)
              }
            let arr=[];
            if(obj.adSource===1){
              JSON.parse(obj.groupIds).forEach((item,i)=>{
                arr.push({adSource:'1',priority:item.order,adgroupId:item.groupIds,admasterName:''})
              })
            }else if(obj.adSource===0){
              JSON.parse(obj.dspIds).forEach((item,i)=>{
                arr.push({adSource:'0',priority:item.order,adgroupId:'',admasterName:item.dspId})
              })
            }
            this.forReviewList=arr;
            setTimeout(()=>{
              this.getAdLocation(obj.pubId,'edit');
            },1000)
          }
        })
    }
  }
}
</script>
<style scoped>
h3 {
  color: #111111;
  margin-left: 30px;
}

.el-form-item {
  margin-bottom: 20px;
}
.el-input{
  width: 220px;
}
.tip{
  color: red;
  font-size: 12px;
  margin: 0;
  height: 20px;
}
.el-tag{
  margin-right: 5px;
}
.require-span{
  position: absolute;
  font-size: 14px;
  color: #F56C6C;
  top: 0;
  left: -95px;
}
.requireTime-span{
  position: absolute;
  font-size: 14px;
  color: #F56C6C;
  top: 0;
  left: -81px;
}
</style>
