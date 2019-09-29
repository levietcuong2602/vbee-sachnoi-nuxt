<template>
  <div class="payment-history">
    <Breadcrumb />
    <div class="payment-history__header">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="đến"
        start-placeholder="Bắt đầu"
        end-placeholder="Kết thúc"
      ></el-date-picker>
      <el-button type="warning">Tìm kiếm giao dịch</el-button>
      <el-button>
        <i class="el-icon-refresh"></i>
        Cập nhật
      </el-button>
    </div>
    <div class="payment-history__main">
      <el-scrollbar wrap-class="payment-history__scroll">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background: '#EAECED'}"
        >
          <el-table-column property="code" width="120" label="Mã giao dịch"></el-table-column>
          <el-table-column property="time" label="Thời gian giao dịch" width="220"></el-table-column>
          <el-table-column property="money" label="Số tiền thanh toán"></el-table-column>
          <el-table-column
            property="status"
            label="Trạng thái giao dịch"
            :filters="[{ text: 'Thành công', value: '1' }, { text: 'Thất bại', value: '0' }]"
          ></el-table-column>
          <el-table-column
            property="namePackage"
            label="Tên gói cước"
            :filters="[{ text: 'S1', value: 'S1' }, { text: 'S7', value: 'S7' }, { text: 'S30', value: 'S30' }, { text: 'S30MAX', value: 'S30MAX' }]"
            filter-placement="bottom-end"
          >
            <template slot="filter">
              <div>hihi</div>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>
    <div class="payment-history__footer">
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "PaymentHistory",
  components: {
    Breadcrumb
  },
  data() {
    return {
      dateRange: [],
      tableData: []
    };
  }
};
</script>
<style lang="scss">
.payment-history {
  padding: 10px 20px;
  .payment-history__header {
    .el-range-separator {
      width: 35px;
    }
  }
  .payment-history__main {
    margin-top: 20px;
    .payment-history__scroll {
      max-height: 650px;
    }
  }
}
</style>