<template>
  <div class="cost-item">
    <div class="cost-item__header">
      <div class="cost-item__title">Gói S1</div>
      <div class="cost-item__money">20.000</div>
      <div class="cost-item__unit">VNĐ</div>
    </div>
    <div class="cost-item__main">
      <p>Thời gian chờ xử lý mỗi 50 trang</p>
      <el-slider :step="50" show-stops :max="150"></el-slider>
      <p>Hạn sử dụng 1 ngày</p>
      <el-divider>
        <i class="el-icon-star-on"></i>
      </el-divider>
      <p>Tối đa 40 trang</p>
      <el-divider>
        <i class="el-icon-star-on"></i>
      </el-divider>
      <p>Hỗ trợ trực tiếp 24/7</p>
      <el-divider>
        <i class="el-icon-star-on"></i>
      </el-divider>
      <p>Định dạng .mp3 .wav</p>
    </div>
    <div class="cost-item__footer">
      <el-button type="warning" round>Mua gói</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CostFeeItem"
};
</script>
<style lang="scss">
.cost-item {
  background-color: #eeeeee;
  margin: 0px 20px;
  text-align: center;
  .cost-item__header {
    .cost-item__title {
    }
    .cost-item__money {
    }
    .cost-item__unit {
    }
  }
  .cost-item__main {
  }
  .cost-item__footer {
  }
}
</style>