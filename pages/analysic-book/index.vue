<template>
  <div class="analysic-book">
    <el-breadcrumb separator="-">
      <el-breadcrumb-item>Sách nói</el-breadcrumb-item>
      <el-breadcrumb-item>Thống kê sách</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="analysic-book__header">
      <div class="title">THỐNG KÊ SÁCH</div>
      <div class="options">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="đến"
          start-placeholder="Bắt đầu"
          end-placeholder="Kết thúc"
        ></el-date-picker>
        <el-button class="search">Tra cứu</el-button>
      </div>
    </div>
    <div class="analysic-book__index">
      <div class="analysic-book__main">
        <el-scrollbar wrap-class="analysic-book__scroll">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            style="width: 100%"
            :header-cell-style="{background: '#EAECED'}"
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column property="bookName" label="Tên sách" width="220"></el-table-column>
            <el-table-column property="timeRequest" label="Ngày gửi yêu cầu"></el-table-column>
            <el-table-column property="headerNumber" label="Tổng số phần/chương"></el-table-column>
            <el-table-column property="status" label="Trạng thái"></el-table-column>
            <el-table-column label="Thao tác" align="center">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5L16 12L10 7.5V16.5ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z"
                    fill="#0DD260"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15 10H19L12 17L5 10H9V4H15V10ZM5 21V19H19V21H5Z"
                    fill="#2593FB"
                  />
                </svg>
              </span>
              <span @click="gotoDetailBook">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM13 9V7H11V9H13ZM13 17V11H11V17H13ZM4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12Z"
                    fill="#3C4858"
                  />
                </svg>
              </span>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <div class="analysic-book__footer">
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AnalysicBook",
  data() {
    return {
      tableData: [
        {
          bookName: "Tôi thấy hoa vàng trên cỏ xanh",
          timeRequest: "17:20:24 - 19/04/2019",
          headerNumber: 1,
          status: "100% thành công"
        }
      ],
      dateRange: []
    };
  },
  methods: {
    gotoDetailBook() {
      this.$router.push("/analysic-book/1");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/index.scss";
</style>