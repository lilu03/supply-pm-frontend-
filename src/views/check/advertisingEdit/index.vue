<template>
  <div>
    <el-row style="overflow: hidden">
      <div style="padding: 10px 10px">
        <h3>账户信息：</h3>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">账户ID：</span
        ><span class="text-b">{{ publisher.pubId }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">账户名称：</span
        ><span class="text-b">{{ publisher.accountName }}</span>
      </div>

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <div style="padding: 10px 10px">
        <h3>应用信息：</h3>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">App ID：</span
        ><span class="text-b">{{ app.appId }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">应用名称：</span
        ><span class="text-b">{{ app.name }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">Bundle ID：</span
        ><span class="text-b">{{ app.bundleId }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">App URL：</span
        ><span class="text-b">{{ app.appMarketUrl }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">操作系统：</span
        ><span class="text-b">{{ platformIds }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">状态：</span
        ><span class="text-b">{{ app.isTestApp == 1 ? "测试" : "正式" }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">行业：</span
        ><span class="text-b"
          >{{ app.primaryIndustryName }}-{{ app.secondaryIndustryName }}</span
        >
      </div>

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <div style="padding: 10px 10px">
        <h3>广告位信息：</h3>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">广告位 ID：</span
        ><span class="text-b">{{ placement.id }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">广告位名称：</span
        ><span class="text-b">{{ placement.name }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">广告位类型：</span
        ><span class="text-b">{{ placement.type }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">模版比例：</span
        ><span class="text-b">{{ placement.aspectRatio }}</span>
      </div>

      <div style="padding: 10px 10px">
        <span class="text-a">广告素材：</span>
        <span
          class="text-c"
          v-for="(item, index) in creativeTypeLists"
          :key="index"
        >
          {{ item }}
        </span>
      </div>

      <div style="padding: 10px 10px" v-if="placement.feedStyle">
        <span class="text-a">渲染类型：</span
        ><span class="text-b">{{ placement.feedStyle }}</span>
      </div>

      <div style="padding: 10px 10px" v-if="placement.displayScene">
        <span class="text-a">展示场景：</span
        ><span class="text-b">{{ placement.displayScene }}</span>
      </div>
      <div style="padding: 10px 10px" v-if="img">
        <span class="text-a">广告位截图：</span
        ><span class="text-b"><img :src="img" width="300px" alt="" /></span>
      </div>

      <!-- 审核确定及驳回 -->
      <el-col :span="24" style="padding: 30px 205px 80px">
        <el-button size="small" class="btn" @click="dialogVisible = true"
          >驳回</el-button
        >
        <el-button type="primary" size="small" class="btn" @click="saveConfig"
          >通过</el-button
        >
      </el-col>
      <el-dialog
        title="驳回理由（单选框跟内容必填）:"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <el-radio-group v-model="radio" style="margin-bottom: 15px">
          <el-radio
            :label="item.code"
            v-for="(item, index) in ejectCode"
            :key="index"
            >{{ item.ct }}</el-radio
          >
        </el-radio-group>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入驳回内容"
          v-model="textareaMain"
        >
        </el-input>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="CancelCon">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>
<script>
import {
  findPlacement,
  getAppPlatform,
  getAppStatus,
  getAdType,
  reviewPass,
  reviewReject,
  getRejectCode,
  getCreativeType,
  getDisplayScene,
  getLayoutStyle,
  getImg,
} from "@/api/useSetting";
export default {
  data() {
    return {
      img: "",
      checkList: ["Ferf", "Brand", "RTB", "Rem"],
      numRecycle: "1",
      dialogVisible: false, //驳回框是否显示
      textareaMain: "", //驳回内容
      radio: "", //驳回单选框内容
      ejectCode: [], //驳回单选框可选择的值
      //账户信息
      publisher: {
        pubId: "",
        accountName: "",
      },
      //应用信息
      app: {
        appId: "",
        name: "",
        bundleId: "",
        appMarketUrl: "",
        platformId: "",
        isTestApp: "",
        primaryIndustryName: "",
        secondaryIndustryName: "",
      },
      platformIds: "",
      //广告位信息
      placement: {
        id: "",
        name: "",
        type: "",
        aspectRatio: "",
        creativeTypeList: [],
      },
      creativeTypeLists: [],
    };
  },
  watch: {},
  created() {
    this.findDetail();
    //驳回状态码
    getRejectCode().then((res) => {
      let arr = [];
      let obj = res.data;
      for (let prop in obj) {
        arr.push({
          code: prop,
          ct: obj[prop],
        });
      }
      this.ejectCode = arr;
    });
    // //创意素材
    // getCreativeType().then(res=>{
    //   // console.log(res)
    //   let title=[]
    //   for(var i=0;i<res.data.length;i++){
    //     for(var j=0;j<this.placement.creativeTypeList.length;j++){
    //       if(res.data[i].code==j){
    //         title.push(res.data[i].name)
    //       }
    //     }
    //   }
    //   this.creativeTypeLists=title
    // })
  },
  methods: {
    getImgByPath(path) {
      path &&
        getImg({
          path: decodeURI(path),
        })
          .then((res) => {
            this.img = "data:image/png;base64," + res;
          })
          .catch((res) => {});
    },
    //细节-每条数据接口
    findDetail() {
      findPlacement({ id: this.$route.query.id }).then((res) => {
        this.publisher = res.data.publisher;
        //操作系统字典
        getAppPlatform().then((ress) => {
          ress.data.forEach((el) => {
            if (res.data.app.platformId == el.id) {
              this.platformIds = el.name;
            }
          });
        });
        this.getImgByPath(res.data.placement.displayScreenshotUrl);
        //状态字典
        // getAppStatus().then(resz=>{
        //   res.data.app.isTestApp=resz.data[res.data.app.isTestApp]
        // });
        //广告类型
        getAdType().then((resg) => {
          resg.data.forEach((el) => {
            if (res.data.placement.type == el.id) {
              res.data.placement.type = el.name;
            }
          });
        });
        getLayoutStyle().then((resg) => {
          resg.data.forEach((el) => {
            if (res.data.placement.feedStyle == el.code) {
              res.data.placement.feedStyle = el.name;
            }
          });
        });
        getDisplayScene().then((resg) => {
          resg.data.forEach((el) => {
            if (res.data.placement.displayScene == el.code) {
              res.data.placement.displayScene = el.name;
            }
          });
        });
        //创意素材
        getCreativeType().then((resc) => {
          let title = [];
          for (var i = 0; i < resc.data.length; i++) {
            for (
              var j = 0;
              j < res.data.placement.creativeTypeList.length;
              j++
            ) {
              if (resc.data[i].code == res.data.placement.creativeTypeList[j]) {
                title.push(resc.data[i].name);
              }
            }
          }
          this.creativeTypeLists = title;
        });
        this.app = res.data.app;
        this.placement = res.data.placement;
      });
    },
    //保存接口
    saveConfig() {
      reviewPass({
        id: this.$route.query.id,
      }).then((res) => {
        if (res.code === 200) {
          this.$router.push({ path: "/check/advertisingList" });
        }
      });
    },
    //审计驳回接口
    CancelCon() {
      // console.log(this.radio,'this.ejectCode')
      if (this.radio == "" || this.textareaMain == "") {
        this.$message({
          message: "驳回单选框跟内容必填",
        });
        return;
      }
      reviewReject({
        id: this.$route.query.id,
        rejectCode: this.radio,
        rejectComm: this.textareaMain,
      }).then((res) => {
        if (res.code === 200) {
          // console.log(res.data)
          this.radio = "";
          this.textareaMain = "";
          this.$router.push({ path: "/check/advertisingList" });
        }
      });
      this.dialogVisible = false;
    },
  },
};
</script>
<style scoped>
h3 {
  color: #111111;
  margin-left: 30px;
}

.text-a {
  float: left;
  width: 200px;
  height: 30px;
  padding-left: 20px;
  margin-left: 100px;
  line-height: 30px;
  text-align: right;
  /* display: block; */
  font-size: 16px;
  color: #333333;
}


.text-b {
  /* float: left; */
  width: 300px;
  height: 30px;
  padding-left: 5px;
  line-height: 30px;
  text-align: left;
  /* display: block; */
  font-size: 16px;
  color: #333333;
}
.img-text{
  width: 300px;
  
}
.text-c {
  /* float: left; */
  /* width: 300px; */
  height: 30px;
  padding-left: 5px;
  line-height: 30px;
  text-align: left;
  /* display: block; */
  font-size: 16px;
  color: #333333;
}

.img {
  float: left;
  width: 120px;
  height: 120px;
  border: 1px solid #5a5e66;
}

.imgAga {
  float: left;
  width: 120px;
  height: 120px;
  border: 1px solid #5a5e66;
  margin-left: 20px;
}

.btn {
  width: 110px;
}
</style>
