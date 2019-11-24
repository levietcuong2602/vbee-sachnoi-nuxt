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
          format="dd/MM/yyyy"
        >></el-date-picker>
        <el-button class="search" @click="getBooks()">Tra cứu</el-button>
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
            v-loading="loading"
          >
            <el-table-column type="index" width="50" align="center"></el-table-column>
            <el-table-column property="title" label="Tên sách" width="320" align="center"></el-table-column>
            <el-table-column label="Ngày gửi yêu cầu" align="center">
              <template slot-scope="scope">{{ formatTimeRequest(scope.row.created_at) }}</template>
            </el-table-column>
            <el-table-column label="Tổng số phần/chương" align="center">
              <template slot-scope="scope">{{ scope.row.number_chapter }}</template>
            </el-table-column>
            <el-table-column property="status" label="Trạng thái" align="center">
              <template slot-scope="scope">
                <span class="text-center">{{ convertStatusBook(scope.row.status) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Thao tác" align="center">
              <template slot-scope="scope">
                <el-tooltip effect="light" content="Tải xuống" placement="bottom-start">
                  <span>
                    <i class="fas fa-download text-primary"></i>
                  </span>
                </el-tooltip>
                <el-tooltip effect="light" content="Chi tiết" placement="bottom-start">
                  <span @click="gotoDetailBook(scope.row.id)">
                    <i class="fas fa-info-circle"></i>
                  </span>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
      <div class="analysic-book__footer" v-if="total > limit">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";

import { getBooks } from "@/api/book";
import { switchCase } from "@babel/types";

export default {
  name: "AnalysicBook",
  computed: { ...mapGetters(["userId"]) },
  data() {
    return {
      tableData: [],
      dateRange: [],
      limit: 10,
      pageCurrent: 1,
      total: 0,
      loading: true
    };
  },
  methods: {
    gotoDetailBook(bookId) {
      this.$router.push("/analysic-book/" + bookId);
    },
    async getBooks() {
      this.book = true;
      let start = "";
      let end = "";
      if (this.dateRange) {
        start = new Date(this.dateRange[0]).valueOf();
        end = new Date(this.dateRange[1]).valueOf();
      }

      getBooks({
        limit: this.limit,
        user_id: this.userId,
        page_num: this.pageCurrent,
        start_time: start,
        end_time: end
      })
        .then(res => {
          const {
            result: {
              data,
              pager: { total_count, current_page_num }
            },
            status
          } = res;

          if (status === 1) {
            this.pageCurrent = current_page_num;
            this.total = total_count;
            this.tableData = data;
            this.loading = false;
          } else {
            this.tableData = [];
            this.pageCurrent = 1;
            this.loading = false;
            return;
          }
        })
        .catch(err => {
          this.tableData = [];
          this.pageCurrent = 1;
          this.total = 0;
          this.loading = false;
        });
    },
    formatTimeRequest(time) {
      const date = new Date(time);
      return moment(date.valueOf()).format("h:mm:ss - MM/DD/YYYY");
    },
    handleCurrentChange(pageNum) {
      this.pageCurrent = pageNum;
      this.getBooks();
    },
    initDateRangeDefault() {
      var date = new Date();
      var start = new Date(date.getFullYear(), date.getMonth(), 1);
      var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.dateRange = [start, end];
    },
    convertStatusBook(status) {
      switch (status) {
        case "INIT":
          return "Đã khởi tạo";
        case "WAITING":
          return "Chờ convert";
        case "DONE":
          return "Đã convert";
        default:
          break;
      }
    }
  },
  mounted() {
    this.initDateRangeDefault();
    this.getBooks();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/index.scss";
</style>