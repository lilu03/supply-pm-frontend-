<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="display: flex">
        <el-select v-model="query.type" clearable placeholder="请选择">
          <el-option
            v-for="(val, keys) in options"
            :key="val"
            :label="val"
            :value="keys"
          >
          </el-option>
        </el-select>
        <div style="margin-left: 20px">
          <el-input
            v-model="query.id"
            class="filter-input"
            clearable
            @keyup.native.enter="adPools"
            placeholder="请输入对应ID"
          ></el-input>
          <el-button class="filter-item" type="primary" @click="adPools"
            >搜 索</el-button
          >
        </div>
      </div>

      <div
        style="margin-top: 40px"
        v-show="publisher.pubId || publisher.accountName"
      >
        <div class="text">
          <span>账号ID：</span>
          <span>{{ publisher.pubId }}</span>
        </div>

        <div class="account">
          <span>账号名称：</span>
          <span>{{ publisher.accountName }}</span>
        </div>

        <div class="account">
          <span style="float: left">广告源设置：</span>
          <br />
          <el-checkbox
            :class="{ 'checkbox-block': true, isRTB: item.code > 4 }"
            v-for="(item, index) in publisher.dataSource"
            v-show="item.name == 'Brand' ? '' : item.name"
            :label="item.code"
            v-model="item.isChecked"
            :key="index"
          >
            <span style="width: 80px; display: inline-block"
              >{{ item.name }} &nbsp;&nbsp;</span
            >
          </el-checkbox>
        </div>
      </div>

      <div style="margin-top: 20px" v-show="app.appId || app.name">
        <div class="text">
          <span>应用ID：</span>
          <span>{{ app.appId }}</span>
        </div>

        <div class="account">
          <span>应用名称：</span>
          <span>{{ app.name }}</span>
        </div>

        <div class="account">
          <span style="float: left">广告源设置：</span>
          <br />
          <el-checkbox
            :class="{ 'checkbox-block': true, isRTB: item.code > 4 }"
            v-for="(item, index) in app.dataSource"
            v-show="item.name == 'Brand' ? '' : item.name"
            :label="item.code"
            v-model="item.isChecked"
            :key="index"
          >
            <span style="width: 80px; display: inline-block"
              >{{ item.name }} &nbsp;&nbsp;</span
            >
          </el-checkbox>
        </div>
      </div>

      <div style="margin-top: 40px" v-show="placement.id || placement.name">
        <div class="text">
          <span>广告位ID：</span>
          <span>{{ placement.id }}</span>
        </div>

        <div class="account">
          <span>广告位名称：</span>
          <span>{{ placement.name }}</span>
        </div>

        <div class="account">
          <span style="float: left">广告源设置：</span>
          <br />
          <el-checkbox
            :class="{ 'checkbox-block': true, isRTB: item.code > 4 }"
            v-for="(item, index) in placement.dataSource"
            v-show="item.name == 'Brand' || item.code > 4 ? '' : item.name"
            :label="item.code"
            v-model="item.isChecked"
            :key="index"
          >
            <span style="width: 80px; display: inline-block"
              >{{ item.name }} &nbsp;&nbsp;&nbsp;</span
            >
            <span style="width: 200px"
              >转发比例：<el-input
                :disabled="!Boolean(item.isChecked)"
                v-model.number="item.scale"
              ></el-input
            ></span>
          </el-checkbox>
        </div>
      </div>

      <div
        v-show="isSure"
        style="
          margin-top: 100px;
          margin-bottom: 60px;
          margin-right: 50px;
          float: right;
        "
      >
        <el-button class="btn" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" class="btn" @click="save()"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getAdPoolType, findAdPool, updateAdPool } from "@/api/advertisingRoot";
import {
  getDataSource,
  // getDataSourceRTB
} from "@/api/advertising";
import { deepCopy } from "@/utils";
export default {
  data() {
    return {
      dataAccountSource: [],
      dataAppSource: [],
      dataPlcSource: [],
      loading: false,
      options: {},
      query: {
        type: "",
        id: "",
      },
      getData: [],
      app: {
        appId: "",
        name: "",
        // adPoolList: [],
        dataSource: [],
      },
      placement: {
        id: "",
        name: "",
        // adPoolList: [],
        dataSource: [],
      },
      publisher: {
        pubId: "",
        accountName: "",
        // adPoolList: [],
        dataSource: [],
      },
      isSure: false,
      dataSourceRTB: []
    };
  },
  created() {
    this.adPoolTypes();
    this.getDataSource();
  },
  methods: {
    adPoolTypes() {
      getAdPoolType().then((res) => {
        this.options = res.data;
      });
    },
    getDataSource() {
      Promise.all([
        getDataSource(),
        // getDataSourceRTB()
      ]).then((res) => {
        // this.dataSourceRTB = res[1].data.map(item => Number(item.code))
        let resForm = res[0].data //.concat(res[1].data);
        this.placement.dataSource = resForm.map((el) => {
          el.code = Number(el.code);
          el.isChecked = false;
          el.scale = 0;
          return el;
        });
        // this.app.dataSource = this.publisher.dataSource
        let dataSource = res[0].data.map((el) => {
          el.code = Number(el.code);
          el.isChecked = false;
          el.scale = 0;
          return el;
        });
        this.app.dataSource = deepCopy(dataSource);
        this.publisher.dataSource = deepCopy(dataSource);
      });
    },
    adPools() {
      if (this.query.type == "" || this.query.id == "") {
        this.$message.error("请输入搜索类型及填写对应ID");
        return;
      }
      findAdPool(this.query)
        .then((res) => {
          if (res.data.app || res.data.placement || res.data.publisher) {
            this.isSure = true;
            this.app = Object.assign(this.app, res.data.app);
            this.placement = Object.assign(this.placement, res.data.placement);
            this.publisher = Object.assign(this.publisher, res.data.publisher);
            // app
            if (res.data.app) {
              let statusAppObj = this.app.adPoolStatusMap;
              this.app.dataSource.map((item, index) => {
                this.app.dataSource[index].isChecked = Boolean(statusAppObj[item.code])

                if (item.code === 2) {
                  this.app.dataSource[index].isChecked = true
                }
              })
            }

            // publisher
            if (res.data.publisher) {
              let statusPublisherObj = this.publisher.adPoolStatusMap;
              this.publisher.dataSource.map((item, index) => {
                this.publisher.dataSource[index].isChecked = Boolean(statusPublisherObj[item.code])

                if (item.code === 2) {
                  this.publisher.dataSource[index].isChecked = true
                }
              })
            }


            // placement
            if (res.data.placement) {
              let statusPlacementObj = this.placement.adPoolStatusMap;
              let scalePlacementObj = this.placement.adPoolScaleMap;
              this.placement.dataSource.map((item, index) => {
                this.placement.dataSource[index].isChecked = Boolean(statusPlacementObj[item.code])
                this.placement.dataSource[index].scale = scalePlacementObj[item.code]

                if (item.code === 2) {
                  this.placement.dataSource[index].isChecked = true
                  this.placement.dataSource[index].scale = 20
                }
                // dataSourceRTB默认值为100
                // if (this.dataSourceRTB.includes(item.code)) {
                //   this.placement.dataSource[index].scale = 100
                // }
              })
            }
          }
        })
        .catch((err) => {
          this.cancel();
        });
    },
    save() {
      let json = {};
      // app
      let hasAppChecked = [];
      let statusAppObj = this.app.adPoolStatusMap || {};

      this.app.dataSource.map(item => {
        statusAppObj[item.code] = Number(item.isChecked)
        if (item.isChecked && item.name !== "Brand" && item.code < 4) {
          hasAppChecked.push(item.isChecked)
        }
      })

      if (this.app.appId || this.app.name) {
        if (hasAppChecked.length == 0) {
          this.$message("广告源设置不能为空");
          return;
        } else {
          json["app"] = this.app;
        }
      }

      // placement
      let statusPlacementObj = this.placement.adPoolStatusMap || {};
      let scalePlacementObj = this.placement.adPoolScaleMap || {};
      let hasPlacementChecked = [];

      this.placement.dataSource.map(item => {
        statusPlacementObj[item.code] = Number(item.isChecked)

        if (item.scale || item.scale === 0) {
          scalePlacementObj[item.code] = item.scale
        }

        if (item.isChecked && item.name !== 'Brand' && item.code < 4) {
          hasPlacementChecked.push(item.isChecked)
        }
      })

      if (this.placement.id || this.placement.name) {
        if (hasPlacementChecked.length == 0) {
          this.$message("广告源设置不能为空");
          return;
        } else {
          json["placement"] = this.placement;
        }
      }

      // publisher
      let statusPublisherObj = this.publisher.adPoolStatusMap || {};
      let hasPublisherChecked = [];
      this.publisher.dataSource.map(item => {
        statusPublisherObj[item.code] = Number(item.isChecked)
        if (item.isChecked && item.name !== "Brand" && item.code < 4) {
          hasPublisherChecked.push(item.isChecked)
        }
      })

      if (this.publisher.pubId || this.publisher.accountName) {
        if (hasPublisherChecked.length == 0) {
          this.$message("广告源设置不能为空");
          return;
        } else {
          json["publisher"] = this.publisher;
        }
      }

      if (this.placement.id || this.placement.name) {
        const inputScaleReg = /^[1-9]\d*|0$/

        const isScaleIllegal = this.placement.dataSource.filter((item) => item.isChecked)
          .some(item => !inputScaleReg.test(item.scale)
            || !item.scale
            || item.scale < 0 || item.scale > 100)

        if (isScaleIllegal) {
          this.$message({ message: "转发比例的范围是1-100"})
          return
        }
      }
      this.loading = true;
      updateAdPool(json)
        .then((res) => {
          this.loading = false;
          this.$message.success("保存成功");
          this.cancel();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.isSure = false;
      this.publisher.pubId = "";
      this.publisher.accountName = "";
      this.app.appId = "";
      this.app.name = "";
      this.placement.id = "";
      this.placement.name = "";
      (this.query.type = ""), (this.query.id = "");
    },
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
.account {
  overflow: hidden;
  padding: 15px 15px;
}
.text {
  padding: 15px 15px;
}
.text span {
  color: #333333;
  font-size: 16px;
}
.account span {
  color: #333333;
  font-size: 16px;
}
.tree-text {
  float: left;
  min-width: 130px;
  margin-top: -4px;
}
.ferf-check {
  float: left;
}
.btn {
  width: 110px;
  height: 36px;
}
.checkbox-block {
  display: block;
  width: 180px;
  margin: 10px 0;
}
.isRTB {
  margin-left: 20px;
}
</style>

