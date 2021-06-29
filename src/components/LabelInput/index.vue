<template>
  <div class="label-input">
    <label for class="label">{{ labelName }}</label>
    <el-input class="input" v-model="input" :placeholder="placeholder"></el-input>
  </div>
</template>
<script>
export default {
  name: "LabelInput",
  props: {
    labelName: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    input: ""
  }
};
</script>
<style scoped>
.label-input {
  display: table;
  width: 323px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(31, 103, 243, 1);
}
.label {
  width: 100px;
  display: table-cell;
}
.input {
  width: 223px;
  display: table-cell;
}
</style>
