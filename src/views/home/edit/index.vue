<template>
  <div>
    <el-row>
      <el-col :span="24" style="padding: 10px 10px">
        <h3>基本信息</h3>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-a">账号ID：{{ info.pubId }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">
          账号名称：
          <a class="text-c" @click="handelSinginClick(info.accountName)">{{
            info.accountName
          }}</a>
        </p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-d">邮箱：{{ info.registerEmail }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px; cursor: pointer">
        <p class="text-b" @click="dialogVisible1 = true">
          联系邮箱：
          <span class="text-c">{{ info.contactEmail }}</span>
        </p>
        <!-- <button @click="changePubContactEmails">11111111</button> -->
        <el-dialog
          title="设置管理员邮箱"
          :visible.sync="dialogVisible1"
          width="40%"
          :before-close="handleClose1"
        >
          <el-form
            label-width="140px"
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            class="demo-ruleForm"
          >
            <el-form-item label="联系邮箱：" prop="pass">
              <span>{{ info.contactEmail }}</span>
            </el-form-item>
            <el-form-item
              label="设置新联系邮箱："
              prop="email"
              :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                {
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input
                v-model="dynamicValidateForm.email"
                autocomplete="off"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item style="display: flex; justify-content: flex-end">
              <el-button
                style="width: 110px; height: 36px"
                @click="dialogVisible1 = false"
                >取消</el-button
              >
              <el-button
                style="width: 110px; height: 36px"
                type="primary"
                @click="changePubContactEmails('dynamicValidateForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">账号状态：{{ info.auditStatus }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">账号类型：{{ info.accountTypeName }}</p>
      </el-col>
      <el-col :span="24" style="padding: 20px 10px">
        <span class="text-e">托管模式：</span>
        <el-radio v-model="info.managedMode" label="1">Self Serve</el-radio>
        <el-radio v-model="info.managedMode" label="2">Manager Serve</el-radio>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :span="24"
        style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="padding: 10px 10px">
        <h3>
          广告源设置
          <span style="color: red; font-size: 13px; font-weight: none"
            >(设置选项不可为空)</span
          >
        </h3>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px; position: relative">
        <span class="text-b">广告源设置:</span>
        <el-checkbox
          :class="{ 'checkbox-block': true, isRTB: item.code > 4 }"
          v-for="(item, index) in dataSource"
          v-show="item.name == 'Brand' ? '' : item.name"
          :label="item.code"
          v-model="item.isChecked"
          :key="index"
        >
          <span style="width: 80px; display: inline-block"
            >{{ item.name }} &nbsp;&nbsp;&nbsp;</span
          >
        </el-checkbox>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :span="24"
        style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
      ></el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="padding: 10px 10px">
        <h3>回收账号</h3>
      </el-col>

      <el-col :span="24" style="padding: 20px 10px">
        <span class="text-e">账号回收：</span>
        <el-radio-group @change="changeHandler" v-model="info.status">
          <el-radio class="radio" label="0">是</el-radio>
          <el-radio class="radio" label="1">否</el-radio>
        </el-radio-group>
      </el-col>

      <el-col :span="24" style="padding: 40px 205px">
        <el-button size="small" class="btn" @click="CancelConfiguration"
          >取消</el-button
        >
        <el-button
          :loading="loading"
          type="primary"
          size="small"
          class="btn"
          @click="saveConfiguration"
          >保存</el-button
        >
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :showClose="false"
    >
      <h2>请确认当前账号是否回收！</h2>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAccountRecycle">取 消</el-button>
        <el-button type="primary" @click="affirmRecycleAccount"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDataSource, getDataSourceRTB } from "@/api/advertising";
import {
  getPubDetailInfo,
  cancelPubAccount,
  editPubDetailInfo,
  changePubContactEmail,
} from "@/api/account";
import { number } from "echarts/lib/export";
import {
  getToken,
  getTokenType,
  removeAccountName,
  removeToken,
  removeTokenType,
} from "@/utils/auth";
import { environment } from "@/utils/index";
export default {
  data() {
    return {
      dataSource: [],
      loading: false,
      info: {
        accountName: "",
        accountTypeName: "",
        auditStatus: "",
        contactEmail: "",
        managedMode: "",
        pubId: "",
        registerEmail: "",
        status: "",
      },
      // numRecycle: 0,
      checkList: [],
      checkListValue: [],

      text: "",

      dialogVisible: false,

      //邮箱修改框弹出
      dialogVisible1: false,
      //设置新邮箱input绑定值
      dynamicValidateForm: {
        email: "",
      },

      getData: "", //广告源字典
    };
  },
  watch: {},
  created() {
    this.getDataSource();
  },
  methods: {
    getDataSource() {
      Promise.all([getDataSource()]).then((res) => {
        this.dataSource = res[0].data.map((el) => {
          el.code = Number(el.code);
          el.isChecked = false;
          el.scale = 0;
          return el;
        });
        // this.findDetail();
        this.getInfo();
      });
    },
    handelSinginClick() {
      let herf = "";
      if (this.info.managedMode == 2) {
        let token = getToken();
        let token_type = getTokenType();
        if (location.host == "10.114.137.73") {
          window.open(
            // supplyCi测试
            `http://10.114.137.70/#/login?token=${token}&token_type=${token_type}&pubAccountId=${this.info.pubId}&accountName=${this.info.accountName}`
          );
          return;
        }
        if (environment() == "dev") {
          removeAccountName();
          removeToken();
          removeTokenType();
          // 本地地址
          window.open(
            `http://10.14.44.68:3006/#/login?token=${token}&token_type=${token_type}&pubAccountId=${this.info.pubId}&accountName=${this.info.accountName}`
          );
        } else {
          window.open(
            `http://pub.inmobi.cn/#/login?token=${token}&token_type=${token_type}&pubAccountId=${this.info.pubId}&accountName=${this.info.accountName}`
          );
        }
      }
    },
    // @Event api 获取账号详情
    getInfo() {
      getPubDetailInfo({ pubId: this.$route.query.id }).then((res) => {
        if (res.code === 200) {
          this.info = res.data;
          let statusObj = this.info.adPoolStatusMap;

          this.dataSource.map((item, index) => {
            this.dataSource[index].isChecked = Boolean(statusObj[item.code])
            // Brand默认传1
            if (item.code === 2) {
              this.dataSource[index].isChecked = true
            }
          })

          // this.dataSource.map((item, index) => {
          //   if(item.code === 2) {
          //     this.dataSource[index].isChecked = true
          //   }
          // })
          // let result = res.data.dataSource;
          // let a = result.split(",");
          // let arr = [];
          // a.map((ele) => {
          //   arr.push(parseInt(ele));
          // });
          // this.checkListValue = arr;
        }
      });
    },

    // @Change 账号回收弹框
    changeHandler(value) {
      if (value == 0) {
        this.dialogVisible = true;
      }
    },

    // @Event api 确认回收账号
    affirmRecycleAccount() {
      cancelPubAccount({ pubId: this.$route.query.id })
        .then((res) => {
          if (res.code === 200) {
            this.dialogVisible = false;
            this.info.status = 0;
            this.$message({ message: res.msg, type: "success" });
            this.getInfo();
          } else {
            this.dialogVisible = false;
            this.info.status = 1;
            this.$message.error({ message: res.msg });
          }
        })
        .catch((err) => {
          this.dialogVisible = false;
          this.info.status = 0;
          this.$message.error({ message: "回收失败" });
        });
    },

    // @Event 取消账号回收
    cancelAccountRecycle() {
      this.dialogVisible = false;
      this.info.status = 0;
    },

    // @Event 取消配置页面
    CancelConfiguration() {
      this.$router.push({ path: "/" });
    },

    // @Event 保存配置页面
    saveConfiguration() {
      // let statusObj = Object.keys(this.info.adPoolStatusMap).length ? this.info.adPoolStatusMap : ;
      let statusObj = this.info.adPoolStatusMap
      let hasChecked = [];

      this.dataSource.map((item) => {
        statusObj[item.code] = Number(item.isChecked)
        if (item.isChecked && item.name !== "Brand" && item.code < 4) {
          hasChecked.push(item.isChecked)
        }
      })
      if (hasChecked.length == 0) {
        this.$message({
          message: "广告源设置不能为空",
        });
        return;
      }
      this.loading = true;
      editPubDetailInfo({
        pubId: this.$route.query.id,
        managedMode: this.info.managedMode,
        adPoolStatusMap: statusObj,
      })
        .then((res) => {
          if (res.code === 200) {
            this.loading = false;
            this.$message({ message: res.msg, type: "success" });
            this.$router.push({ path: "/" });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },

    //邮箱修改设置
    changePubContactEmails(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePubContactEmail({
            pubId: this.$route.query.id,
            contactEmail: this.dynamicValidateForm.email,
          }).then((res) => {
            if (res.code === 200) {
              this.dialogVisible1 = false;
              this.$message({ message: "修改成功", type: "success" });
              this.getInfo();
            }
          });
        }
      });
    },
    //邮箱修改弹出
    handleClose1(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
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
  padding-left: 140px;
  font-size: 16px;
  color: #333333;
}

.text-b {
  padding-left: 125px;
  font-size: 16px;
  color: #333333;
}

.text-c {
  font-size: 16px;
  color: #1f67f3;
}

.text-d {
  padding-left: 157px;
  font-size: 16px;
  color: #333333;
}

.text-e {
  padding-top: 10px;
  padding-left: 125px;
  font-size: 16px;
  color: #333333;
}

.btn {
  width: 110px;
}

.groupSetting {
  position: absolute;
  left: 220px;
  top: 0;
}
.checkbox-block {
  margin: 10px 0;
}
.isRTB {
  margin-left: 20px;
}
</style>
