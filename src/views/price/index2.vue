<template>
  <div class="app-container">
    <div style="display: flex">
      <el-select
        v-model="query"
        filterable
        allow-create
        @change="search"
        :remote-method="priceSearch"
        placeholder="请输入广告位ID或名称"
      >
        <el-option
          v-for="item in selectOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <!-- <el-button class="filter-item" type="primary" @click="priceSearch">搜 索</el-button> -->
    </div>

    <div style="margin-top: 22px" v-if="form.id">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="广告位ID：">
          <span>{{ form.id }}</span>
        </el-form-item>

        <el-form-item label="广告位名称：" style="margin-top: -20px">
          <span>{{ form.name }}</span>
        </el-form-item>

        <el-form-item label="实时出价：" style="margin-top: -10px">
          <el-col :span="16" v-if="!list.length">
            <el-button type="text" @click="adBox">新增</el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="adBox"
            ></el-button>
          </el-col>

          <el-col :span="20" v-if="updates">
            <RealTimeBid
              ref="pickeri"
              :items="item"
              v-for="(item, index) in list"
              :key="index"
              :index="index"
              @del="delTable"
              @dateChange="handleDateChange(arguments, index, item)"
              @handleChannelChange="handleChannelChange(arguments, index, item)"
              @handleStatusChange="handleStatusChange(arguments, index, item)"
            ></RealTimeBid>
          </el-col>

          <el-col :span="20" v-if="list.length">
            <div style="float: right">
              <el-button type="text" @click="adBox">新增</el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="adBox"
              ></el-button>
            </div>
          </el-col>

          <el-col :span="20" style="margin-top: 25px">
            <div style="float: right">
              <el-button class="btn" @click="cancel">取 消</el-button>
              <el-button
                type="primary"
                :loading="loading"
                class="btn"
                @click="submit"
                >保 存</el-button
              >
            </div>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      title="重要提示"
      :close-on-click-modal="true"
      :close-on-press-escape="false"
      :showClose="false"
    >
      <h2 style="color: red">您当前的要设置的价格超过100元，确定要保存吗？</h2>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelPriceNote">取 消</el-button>
        <el-button type="primary" @click="ensurePriceNote">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "@/bus.js";
import RealTimeBid from "@/components/RealTimeBid/RealTimeBid";
import {
  findByName,
  findPlacementDynamicPE,
  updatePlacementDynamicPE,
} from "@/api/price";
import { isChinese } from "@/utils/time-picker";
export default {
  components: {
    RealTimeBid,
  },
  data() {
    return {
      loading: false,
      dynamicPE: [],
      dialogVisible: false,
      updates: true,
      query: "",
      selectOptions: [],
      form: {
        id: "",
        name: "",
      },
      listArr: [],
      list: [],
    };
  },
  created() {
    Bus.$on("changeTime", (data) => {
      this.list[data[1]][data[2]].startTime = data[0][0][0];
      this.list[data[1]][data[2]].endTime = data[0][0][1];
    });
    Bus.$on("handlePubExpectationChange", (data) => {
      this.list[data[1]][data[2]].pubExpectation = (
        Number(data[0][0]) * 100
      ).toFixed(0);
    });
    Bus.$on("handledealIdChange", (data) => {
      this.list[data[1]][data[2]].dealId = data[0][0];
    });
    Bus.$on("handleAddPriceItem", (data) => {
      console.log(data, "data");
      let len = this.list[data].length;
      let obj = Object.assign({}, this.list[data][len - 1]);
      this.list[data].push(obj);
    });
    Bus.$on("handleDelPriceItem", (data) => {
      // this.$delete(this.list[data[1]], data[2]);
    });
  },
  methods: {
    priceSearch() {
      findByName({ idOrName: this.query }).then((res) => {
        this.selectOptions = res.data;
        this.form.id = "";
        this.form.name = "";
        if (res.data.length >= 1) {
          this.form.id = res.data[0].id;
          this.form.name = res.data[0].name;
          if (isChinese(this.form.id)) {
            this.findPlacementDynamicPE();
          }
        }
      });
    },
    search() {
      this.priceSearch();
      // this.findPlacementDynamicPE();
    },
    //li列表
    findPlacementDynamicPE() {
      var self = this;
      this.list = [];
      findPlacementDynamicPE({ placementId: this.form.id }).then((res) => {
        this.list = [];
        this.listArr = res.data;
        let arr = this.listArr;
        this.arrFormat(arr);
      });
    },
    arrFormat(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].id = arr[i].channelId + arr[i].startDate + arr[i].endDate;
      }
      let obj = {};
      arr.forEach((element) => {
        if (obj.hasOwnProperty(element.id)) {
          obj[element.id].push({
            startTime: element.startTime,
            endTime: element.endTime,
            channelId: element.channelId,
            pubExpectation: element.pubExpectation,
            status: element.status,
            startDate: element.startDate,
            endDate: element.endDate,
            dealId: element.dealId || "",
          });
        } else {
          obj[element.id] = [
            {
              startTime: element.startTime,
              endTime: element.endTime,
              channelId: element.channelId,
              pubExpectation: element.pubExpectation,
              status: element.status,
              startDate: element.startDate,
              endDate: element.endDate,
              dealId: element.dealId || "",
            },
          ];
        }
      });
      for (var key in obj) {
        this.list.push(obj[key]);
      }
      return obj;
    },
    // 添加box
    adBox() {
      var date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      let ydate2 =
        y +
        "-" +
        (m + 1 < 10 ? "0" + (m + 1) : m + 1) +
        "-" +
        (d < 10 ? "0" + d : d);
      let ydate1 =
        y +
        "-" +
        (m + 1 < 10 ? "0" + (m + 1) : m + 1) +
        "-" +
        (d - 1 < 10 ? "0" + d : d - 1);
      console.log(ydate1, ydate2);

      if (length) {
        let element = this.list[0][0];
        let arr = [
          {
            startTime: element.startTime,
            endTime: element.endTime,
            channelId: element.channelId,
            pubExpectation: element.pubExpectation,
            status: element.status,
            startDate: ydate1,
            endDate: ydate2,
            dealId: element.dealId || "",
          },
        ];
        this.list.push(arr);
      } else {
        if (this.form.id != "") {
          this.list.push([
            {
              startTime: "00:00:00",
              endTime: "01:00:00",
              channelId: "",
              pubExpectation: 100,
              status: 1,
              startDate: ydate1,
              endDate: ydate2,
              //placementId: this.query,
              dealId: "",
            },
          ]);
        }
      }
      console.log(this.list);
    },
    // 删除box
    delTable(item) {
      this.list.splice(item, 1);
      this.updates = false;
      this.$nextTick(() => {
        this.updates = true;
      });
    },
    handleDateChange() {
      let arindex = arguments[1];
      for (let i = 0; i < this.list[arindex].length; i++) {
        this.list[arindex][i].startDate = arguments[0][0][0];
        this.list[arindex][i].endDate = arguments[0][0][1];
      }
    },
    handleChannelChange() {
      let item = this.list[arguments[1]];
      for (let i = 0; i < item.length; i++) {
        item[i].channelId = arguments[0][0];
      }
    },
    handleStatusChange() {
      // this.list[arguments[1]][0].status = arguments[0][0];
      let arindex = arguments[1];
      for (let i = 0; i < this.list[arindex].length; i++) {
        this.list[arindex][i].status = arguments[0][0];
      }
    },

    // 保存
    submit() {
      this.dynamicPE = [];
      let resame = [];
      for (let i = 0; i < this.list.length; i++) {
        resame.push(this.list[i][0].channelId);
        for (let j = 0; j < this.list[i].length; j++) {
          this.dynamicPE.push(this.list[i][j]);
        }
      }
      // 验证重复元素，有重复返回true；否则返回false
      // function mm(a) {
      //   return /(\x0f[^\x0f]+)\x0f[\s\S]*\1/.test(
      //     "\x0f" + a.join("\x0f\x0f") + "\x0f"
      //   );
      // }
      var nary = resame.sort();
      for (var i = 0; i < nary.length - 1; i++) {
        if (nary[i] == nary[i + 1]) {
          this.$message("DSP Name 设置不可重复");
          return;
        }
      }
      for (let i = 0; i < this.dynamicPE.length; i++) {
        if (this.dynamicPE[i].channelId == "") {
          this.$message("DSP Name 设置不可为空");
          return;
        }
        if (this.dynamicPE[i].pubExpectation == "0") {
          this.$message("价格设置不可为空");
          return;
        }
      }
      for (let i = 0; i < this.dynamicPE.length; i++) {
        if (this.dynamicPE[i].pubExpectation >= 10000) {
          this.dialogVisible = true;
        }
      }
      if (this.dialogVisible) {
        return;
      }
      this.loading = true;
      this.updatePlacement(this.dynamicPE);
    },
    ensurePriceNote() {
      this.dialogVisible = false;
      this.updatePlacement(this.dynamicPE);
    },
    cancelPriceNote() {
      this.dialogVisible = false;
    },
    updatePlacement(res) {
      updatePlacementDynamicPE(res, this.form.id)
        .then((response) => {
          this.loading = false;
          this.$message.success("保存成功");
          window.location.reload();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    cancel() {
      window.location.reload();
      this.search();
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-input {
  width: 260px;
}
.filter-item {
  width: 100px;
  height: 36px;
  margin-left: 15px;
}
.btn {
  width: 110px;
  height: 36px;
}
</style>