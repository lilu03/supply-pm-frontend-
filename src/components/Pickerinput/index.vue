<template>
  <div>
    <el-time-picker
      style="width: 260px"
      is-range
      v-model="timeValue"
      :default-value="timeValue"
      value-format="HH:mm:ss"
      @change="changeTime(arguments, index, indexinput)"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
    >
    </el-time-picker>
    <span style="margin-left: 18px">价格：</span>
    <el-input
      style="width: 160px;"
      placeholder="请输入内容"
      v-model="input"
      @change="handlePubExpectationChange(arguments, index, indexinput)"
      clearable
    >
    </el-input>
    <span>元</span>

    <span style="margin-left: 20px">dealId：</span>
    <el-input
      style="width: 160px;"
      placeholder="请输入内容"
      v-model="iteminput.dealId"
      @change="handledealIdChange(arguments, index, indexinput)"
      clearable
    >

    </el-input>
    <el-button
      v-if="indexinput == pickerValue.length - 1"
      icon="el-icon-plus"
      size="medium"
      style="margin-left: 14px; width: 40px; padding-left: 12px"
      @click="handleAddPriceItem(index)"
    ></el-button>
    <el-button
      v-if="indexinput != pickerValue.length - 1"
      icon="el-icon-minus"
      size="medium"
      style="margin-left: 14px; width: 40px; padding-left: 12px"
      @click="delInput(indexinput)"
    ></el-button>
    <!-- @click="handleDelPriceItem(arguments, index, indexinput)" -->
  </div>
</template>

<script>
import { changeDate } from "@/utils/time-picker";
import Bus from "@/bus.js";
export default {
  props: {
    iteminput: Object,
    index: Number,
    indexinput: Number,
    pickerValue: Array,
    adInput: Function,
  },
  data() {
    return {
      timeValue: [],
      input: "",
      dealId:"",
      starttimes: "",
      endtimes: "",
    };
  },
  created() {
    this.timeValues();
    this.input = this.iteminput.pubExpectation / 100;
  },
  methods: {
    
    timeValues() {
      let start = changeDate(
        this.iteminput.startDate + " " + this.iteminput.startTime
      );
      let end = changeDate(
        this.iteminput.endDate + " " + this.iteminput.endTime
      );
      this.timeValue.push(start, end);
    },
    changeTime(val) {
      Bus.$emit("changeTime", arguments);
    },
    handlePubExpectationChange() {
      Bus.$emit("handlePubExpectationChange", arguments);
    },
    handledealIdChange(){
      Bus.$emit("handledealIdChange", arguments);
    },
    delInput(val) {
      this.$emit("dli", val);
    },
    handleAddPriceItem(index){
      Bus.$emit("handleAddPriceItem", index);
    },
     handleDelPriceItem(){
      Bus.$emit("handleDelPriceItem", arguments);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
</style>