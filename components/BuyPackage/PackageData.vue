<template>
  <div :class="['cost-item', getClassWrap()]">
    <div class="cost-item__header">
      <div class="cost-item__title">{{ packageInfo.name }}</div>
      <div class="cost-item__money">{{ packageInfo.price }}</div>
      <div class="cost-item__unit">VNĐ</div>
    </div>
    <div class="cost-item__main">
      <p>Thời gian chờ xử lý mỗi 50 trang</p>
      <el-slider :step="50" :max="100" :marks="getMarks()" @change="handleChange" v-model="slider"></el-slider>
      <!-- <RangeSlider /> -->
      <p>Hạn sử dụng 1 ngày</p>
      <el-divider></el-divider>
      <p>Tối đa {{ packageInfo.maxPage }} trang</p>
      <el-divider></el-divider>
      <p>Hỗ trợ trực tiếp 24/7</p>
      <el-divider></el-divider>
      <p>Định dạng .mp3 .wav</p>
    </div>
    <div class="cost-item__footer">
      <el-button type="warning" round>Mua ngay</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CostFeeItem",
  props: {
    packageInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      marks: this.getMarks(),
      slider: this.packageInfo.timeProcess
    };
  },
  watch: {
    slider: function(value) {
      if (value === 0) {
        this.marks = {
          0: {
            label: "15 phút",
            style: {
              top: "-50px"
            }
          },
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (value === 50) {
        this.marks = {
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (value === 100) {
        this.marks = {
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      }
    }
  },
  methods: {
    getClassWrap() {
      if (this.slider === 0) {
        return "package-class-1";
      }
      if (this.slider === 50) {
        return "package-class-2";
      }
      if (this.slider === 100) {
        return "package-class-3";
      }
    },
    handleChange() {
      this.$emit("changeSlider", {
        id: this.packageInfo.id,
        timeProcess: this.slider
      });
    },
    getMarks() {
      if (this.slider === 0) {
        return {
          0: {
            label: "15 phút",
            style: {
              top: "-50px"
            }
          },
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (this.slider === 50) {
        return {
          50: {
            label: "1 giờ",
            style: {
              top: "-50px"
            }
          },
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      } else if (this.slider === 100) {
        return {
          100: {
            label: "24 giờ",
            style: {
              top: "-50px",
              minWidth: "40px"
            }
          }
        };
      }
    }
  },
  mounted() {
    console.log(this.slider);
  }
};
</script>
<style lang="scss" scoped>
.cost-item {
  background-color: #eeeeee;
  // margin: 0px 20px;
  text-align: center;
  padding: 20px 0px;
  border-top: 5px solid;
  .cost-item__header {
    .cost-item__title {
      font-size: 1.5vw;
      font-weight: 500;
    }
    .cost-item__money {
      font-size: 2.1vw;
      font-weight: 500;
    }
    .cost-item__unit {
      font-weight: 500;
    }
  }
  .cost-item__main {
    padding: 0px 25px;
  }
  .cost-item__footer {
    .el-button {
      min-width: 150px;
    }
  }
}
</style>