<template>
  <div>
    <el-row style="overflow: hidden;">
      <div style="padding: 10px 10px;">
        <h3>财务信息：</h3>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a"><span v-if="accountTypeName=='企业账号' ">对公</span>银行名称：</span>
        <span class="text-b">{{pubPayment.bankName}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a"><span v-if="accountTypeName=='企业账号' ">对公</span>开户省市：</span>
        <span class="text-b">{{pubPayment.state}}/{{pubPayment.city}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a"><span v-if="accountTypeName=='企业账号' ">对公</span>开户支行：</span>
        <span class="text-b">{{pubPayment.branchName}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a"><span v-if="accountTypeName=='企业账号' ">对公</span>银行账号：</span>
        <span class="text-b">{{pubPayment.accountNumber}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">CNAPS Code 联行号：</span>
        <span class="text-b">{{pubPayment.cnapsCode}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">Swift Code 国际电汇码：</span>
        <span class="text-b">{{pubPayment.swiftCode}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">发票类型：</span>
        <!-- <span class="text-b">{{pubPayment.invoiceType}}</span> -->
        <el-radio v-model="pubPayment.invoiceType" class="text-b" label="1">增值税专用发票</el-radio>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">发票内容：</span>
        <!-- <span class="text-b">{{pubPayment.invoiceTitle}}</span> -->
        <el-radio-group class="text-b" v-model="pubPayment.invoiceTitle">
          <el-radio :label="1">广告费</el-radio>
          <el-radio :label="2">信息技术服务费</el-radio>
        </el-radio-group>
      </div>

      <el-row v-if="accountTypeName=='企业账号' ">
        <el-col :span="24" style="border:1px solid #D8DCE6; margin: 50px 20px 20px 20px;"></el-col>
      </el-row>

    <div v-if="accountTypeName=='企业账号' ">
      <div style="padding: 10px 10px;">
        <h3>企业信息：</h3>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">公司名称：</span>
        <span class="text-b">{{pubCompany.companyName}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">统一信用代码：</span>
        <span class="text-b">{{pubCompany.unifiedCreditCode}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">法定代表人姓名：</span>
        <span class="text-b">{{pubCompany.legalRepresentName}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">主营应用所属行业：</span>
        <span class="text-b">{{pubCompany.industry}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">主营应用举例：</span>
        <span class="text-b">{{pubCompany.mainlyAppName}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">注册地址：</span>
        <span class="text-b">{{pubCompany.addressLine}}</span>
      </div>

      <div style="padding: 10px 10px;">
        <span class="text-a">营业执照：</span>
        <img :src="pubCompany.businessLicense" alt="暂无图片" class="img" />
      </div>

<!--      <el-row>-->
<!--        <el-col :span="24" style="border:1px solid #D8DCE6; margin: 50px 20px 20px 20px;"></el-col>-->
<!--      </el-row>-->
    </div>

<!--      <div style="padding: 10px 10px;">-->
<!--        <h3>账号管理人信息：</h3>-->
<!--      </div>-->

<!--      <el-col :span="24" style="padding: 10px 10px;">-->
<!--        <span class="text-a">账号管理人姓名：</span>-->
<!--        <span class="text-b">{{pubManager.accountManagerName}}</span>-->
<!--      </el-col>-->

<!--      <el-col :span="24" style="padding: 10px 10px;">-->
<!--        <span class="text-a">账号管理人员身份证号：</span>-->
<!--        <span class="text-b">{{pubManager.accountManagerId}}</span>-->
<!--      </el-col>-->

<!--      <el-col :span="24" style="padding: 10px 10px;">-->
<!--        <span class="text-a">账号管理人员手机号：</span>-->
<!--        <span class="text-b">{{pubManager.contactMobile}}</span>-->
<!--      </el-col>-->

<!--      <el-col :span="24" style="padding: 10px 10px;">-->
<!--        <span class="text-a">{{accountTypeName=='企业账号'?'营业执照：':'身份证照片：' }}</span>-->
<!--        <img :src="pubManager.accountManagerIdUrl1" alt="暂无图片" class="img" />-->
<!--        <img :src="pubManager.accountManagerIdUrl2" alt="暂无图片" class="imgAga" />-->
<!--      </el-col>-->

      <!-- <el-row>
        <el-col :span="24" style="border:1px solid #D8DCE6; margin: 50px 20px 20px 20px;"></el-col>
      </el-row>-->

      <!-- 审核确定及驳回 -->
      <el-col :span="24" style="padding:30px 205px 80px;">
        <el-button size="small" class="btn" @click="dialogVisible = true">驳回</el-button>
        <el-button type="primary" size="small" class="btn" @click="saveConfig">通过</el-button>
      </el-col>
      <el-dialog title="驳回理由:" :visible.sync="dialogVisible" width="40%">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textareaMain"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="CancelCon">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>
<script>
import { getPubAuditInfo, addPubAuditRecord, getImg } from "@/api/account";
import { getTokenId } from "@/utils/auth";
export default {
  data() {
    return {
      checkList: ["Ferf", "Brand", "RTB", "Rem"],
      numRecycle: "1",
      accountTypeName:'企业账号',
      //财务信息
      pubPayment: {
        bankName: "",
        state: "",
        city: "",
        branchName: "",
        accountNumber: "",
        cnapsCode: "",
        swiftCode: "",
        invoiceType: "",
        invoiceTitle: "",
      },
      //企业信息
      pubCompany: {
        companyName: "",
        unifiedCreditCode: "",
        legalRepresentName: "",
        industry: "",
        mainlyAppName: "",
        addressLine: "",
        businessLicense: "",
      },
      //账号管理人信息
      pubManager: {
        accountManagerName: "",
        accountManagerId: "",
        contactMobile: "",
        accountManagerIdUrl1: "",
        accountManagerIdUrl2: "",
      },
      cookies: "",
      dialogVisible: false,
      textareaMain: "", //驳回内容
    };
  },
  watch: {},
  created() {
    this.getPubAuditInfos();
    this.cookies = getTokenId("token_id");
  },
  methods: {
    getImgByPath(path, o1, o2) {
      path &&
        getImg({
          path: decodeURI(path),
        })
          .then((res) => {
            // this[o2] = path;
            this[o1][o2] = "data:image/png;base64," + res;
          })
          .catch((res) => {
          });
    },
    getPubAuditInfos() {
      getPubAuditInfo({ pubId: this.$route.query.id }).then((res) => {
        if (res.code === 200) {
          this.accountTypeName = res.data.accountTypeName;
          this.pubCompany = Object.assign({}, res.data.pubCompany);
          this.pubManager = Object.assign({}, res.data.pubManager);
          let obj = res.data.pubPayment || ""
          this.pubPayment = Object.assign({}, obj);
          res.data.pubCompany && this.getImgByPath(
            this.pubCompany.businessLicense,
            "pubCompany",
            "businessLicense"
          );
          this.getImgByPath(
            this.pubManager.accountManagerIdUrl1,
            "pubManager",
            "accountManagerIdUrl1"
          );
          this.getImgByPath(
            this.pubManager.accountManagerIdUrl2,
            "pubManager",
            "accountManagerIdUrl2"
          );
        }
      });
    },
    //审计保存接口
    saveConfig() {
      addPubAuditRecord({
        pubId: this.$route.query.id,
        auditStatus: 2,
        auditor: parseInt(this.cookies),
      }).then((res) => {
        if (res.code === 200) {
          this.$router.push({ path: "/check/accountLIst" });
        }
      });
    },
    //审计驳回接口
    CancelCon() {
      addPubAuditRecord({
        pubId: this.$route.query.id,
        auditStatus: -1,
        rejectRsCode: 2,
        rejectRsComms: this.textareaMain,
        auditor: parseInt(this.cookies),
      }).then((res) => {
        if (res.code === 200) {
          // console.log(res.data)
          this.textareaMain = "";
          this.$router.push({ path: "/check/accountLIst" });
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
