<template>
  <div class="cost-item">
    <div class="cost-item__header">
      <div class="cost-item__title">Gói S1</div>
      <div class="cost-item__money">20.000</div>
      <div class="cost-item__unit">VNĐ</div>
    </div>
    <div class="cost-item__main">
      <p>Thời gian chờ xử lý mỗi 50 trang</p>
      <el-slider :step="50" show-stops :max="100" :marks="marks"></el-slider>
      <!-- <RangeSlider /> -->
      <p>Hạn sử dụng 1 ngày</p>
      <el-divider></el-divider>
      <p>Tối đa 40 trang</p>
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
import RangeSlider from "@/components/RangeSlider";

export default {
  name: "CostFeeItem",
  components: {
    RangeSlider
  },
  data() {
    return {
      marks: {
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
      }
    };
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
    .el-slider {
      .el-slider__runway {
        .el-slider__bar {
          width: 100%;
          left: 0%;
          background: linear-gradient(to right, green 0%, yellow 50%, red 100%);
          outline: none;
          padding: 0px;
          margin: 0px;
        }
      }
    }
  }
  .cost-item__footer {
    .el-button {
      min-width: 150px;
    }
  }
}
</style>