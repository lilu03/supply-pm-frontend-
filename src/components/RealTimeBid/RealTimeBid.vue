<template>
  <div style="border: 1px solid #e0e3eb; margin-bottom: 20px">
    <div class="del">
      <el-button class="btndel" type="text" @click="delItem(index)">
        <i class="el-icon-close"></i>
      </el-button>
    </div>

    <div style="border-bottom: 1px solid #d8dce6" class="boxPadding">
      <el-select
        v-model="channelId"
        placeholder="请选择"
        @change="handleChannelChange"
        style="width: 260px"
      >
        <el-option
          v-for="item in options"
          :key="item.channelId"
          :label="item.channelName"
          :value="item.channelId"
        >
        </el-option>
      </el-select>

      <el-switch
        style="margin-left: 10px"
        v-model="switchValue"
        active-text="on"
        @change="handleStatusChange"
        inactive-text="off"
      >
      </el-switch>
    </div>

    <div class="boxPadding">
      <div>
        生效时间<span style="color: #c0c4cc; font-size: 13px"
          >（时间段不可有重叠）</span
        >
      </div>
      <div class="block">
        <el-date-picker
          style="width: 260px"
          v-model="calendarValue"
          value-format="yyyy-MM-dd"
          @change="changeDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <div
          style="margin-top: 20px"
          v-for="(iteminput, indexinput) in items"
          :key="indexinput"
        >
          <Pickerinput
            v-if="update"
            :iteminput="iteminput"
            :indexinput="indexinput"
            :index="index"
            :pickerValue="items"
            :adInput="adInput"
            @dli="dlInput"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pickerinput from "@/components/Pickerinput";
import { findDspByName } from "@/api/price";
import { dataStack } from "echarts/lib/helper";
export default {
  components: { Pickerinput },
  data: () => ({
    update: true,
    options: [],
    switchValue: "", //状态
    calendarValue: [],
    startDate: "",
    endDate: "",
    channelId: "",
    // pickerValue:[]
  }),
  props: {
    items: Array,
    index: Number,
  },
  created() {
    this.findDspByName();
    if (this.items[0].status == 1) {
      this.switchValue = true;
    } else {
      this.switchValue = false;
    }
  },
  mounted() {
    this.calendarValue.push(this.items[0].startDate);
    this.calendarValue.push(this.items[0].endDate);
    this.channelId = this.items[0].channelId;
  },
  methods: {
    findDspByName() {
      findDspByName({ idOrName: "" }).then((res) => {
        this.options = res.data;
      });
    },
    // 添加input
    adInput() {
      let length = this.items.length;
      this.items.unshift({
        startTime: "00:00:00",
        endTime: "01:00:00",
        channelId: this.items[length - 1].channelId,
        pubExpectation: 100,
        status: this.items[length - 1].status,
        startDate: this.items[length - 1].startDate,
        endDate: this.items[length - 1].endDate,
        dealId: this.items[length - 1].dealId || "",
      });
      console.log(this.items, "89");
    },
    dlInput(val) {
      this.items.splice(val, 1);
      this.update = false;
      this.$nextTick(() => {
        this.update = true;
      });
    },
    delItem(index) {
      this.$emit("del", index);
    },
    changeDate(val) {
      console.log(val, "data");
      this.$emit("dateChange", val);
    },
    handleChannelChange(val) {
      console.log(val, "handleChannelChange");
      //   this.channelId = val;
      this.$emit("handleChannelChange", val);
    },
    handleStatusChange(val) {
      let value = 1;
      if (val) {
        value = 1;
      } else {
        value = 0;
      }
      this.$emit("handleStatusChange", value);
    },
  },
};
</script>

<style>
.del {
  height: 40px;
  background: #f7f8fa;
}
.btndel {
  float: right;
  margin-right: 10px;
}
.boxPadding {
  padding: 20px 30px;
}
.blockPicker {
  width: 240px;
}
</style>