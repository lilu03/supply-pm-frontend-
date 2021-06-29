<template>
  <div>
    <el-row>
      <el-col :span="24" style="padding: 10px 10px">
        <h3>基本信息</h3>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-a">App ID：{{ finds.appId }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">应用名称：{{ finds.name }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-d">Bundle ID：{{ finds.bundleId }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">App URL：{{ finds.appMarketUrl }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">签名sha1：{{ finds.signSHA1 }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">操作系统：{{ finds.platformId }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-c">状态：{{ finds.isTestApp == 0 ? "正式" : "测试" }}</p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-c">
          行业： <span>{{ finds.primaryIndustryName }}</span
          >-
          <span>{{ finds.secondaryIndustryName }}</span>
        </p>
      </el-col>
      <el-col :span="24" style="padding: 2px 10px">
        <p class="text-b">
          <span class="child-title">应用是否符合《中国儿童个人信息保护条例》规定的儿童年龄限制要求？
            <el-radio-group v-model="finds.childProtect" disabled>
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </span>
          <span class="child-text">应用用户特别指向14岁以下儿童或者明确知道APP用户中含有14岁以下儿童。这个法规仅适用于中国区域。</span>
        </p>
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
      <el-col :span="24" style="padding: 2px 200px; position: relative">
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
        <h3>关闭应用</h3>
      </el-col>
      <el-col :span="24" style="padding: 20px 10px">
        <span class="text-e">关闭应用：</span>
        <!-- <el-radio v-model="finds.status" :label="0">否</el-radio>
        <el-radio v-model="finds.status" :label="1">是</el-radio> -->
        <el-radio-group v-model="finds.status">
          <el-radio class="radio" :label="0">是</el-radio>
          <el-radio class="radio" :label="1">否</el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="24" style="padding: 40px 205px">
        <el-button size="small" class="btn" @click="cancal">取消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          size="small"
          class="btn"
          @click="updateAd(finds)"
          >保存</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  Find,
  updateAdPool,
  getAppStatus,
  getAppPlatform,
} from "@/api/useSetting";
import {
  getDataSource,
  // getDataSourceRTB
} from "@/api/advertising";
export default {
  data() {
    return {
      loading: false,
      finds: {
        appId: "",
        name: "",
        bundleId: "",
        appMarketUrl: "",
        platformId: "",
        signSHA1: "",
        isTestApp: "",
        primaryIndustryName: "",
        secondaryIndustryName: "",
        adPoolList: [],
        status: "",
      },
      dataSource: [], //广告源字典
      getAppPlatforms: "", //操作系统
      getAppStatu: "", // 状态字典
    };
  },
  created() {
    //应用操作系统
    this.AppPlatform();
    //广告源字典
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
        this.findDetail();
      });
    },
    findDetail() {
      Find({ id: this.$route.query.id }).then((res) => {
        res = res.data;
        this.getAppPlatforms.forEach((el) => {
          if (res.platformId == el.id) {
            res.platformId = el.name;
          }
        });
        this.finds = Object.assign(this.finds, res);
        let statusObj = this.finds.adPoolStatusMap;
        this.dataSource.map((item, index) => {
          this.dataSource[index].isChecked = Boolean(statusObj[item.code])
          // Brand默认传1
          // if (item.code === 2) {
          //   this.dataSource[index].isChecked = true
          // }
        })
      });
    },
    updateAd(qu) {
      let statusObj = this.finds.adPoolStatusMap;
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
      this.getAppPlatforms.forEach((el) => {
        if (qu.platformId == el.name) {
          qu.platformId = el.id;
        }
      });
      this.loading = true;
      updateAdPool(qu)
        .then((res) => {
          this.loading = false;
          this.$router.push({
            path: "/useSetting",
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },

    //应用操作系统
    AppPlatform() {
      getAppPlatform().then((res) => {
        this.getAppPlatforms = res.data;
      });
    },
    //取消按钮
    cancal() {
      this.$router.push({ path: "/useSetting" });
    },
  },
  watch: {},
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
  padding-left: 158px;
  font-size: 16px;
  color: #333333;
}

.text-d {
  padding-left: 118px;
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
.checkbox-block {
  margin: 10px 0;
}
.isRTB {
  margin-left: 20px;
}
.child-title{
  display: block;
  margin-bottom: 10px;
}
.child-text{
  font-size: 13px;
}
.el-radio-group{
  margin-left: 12px;
}
</style>
