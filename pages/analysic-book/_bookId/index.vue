<template>
  <div class="analysic-book pt-3">
    <el-breadcrumb separator="-">
      <el-breadcrumb-item>Sách nói</el-breadcrumb-item>
      <el-breadcrumb-item>Thống kê sách</el-breadcrumb-item>
      <el-breadcrumb-item>Thống kê sách chi tiết</el-breadcrumb-item>
    </el-breadcrumb>
    <template v-if="bookInfo">
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
          ></el-date-picker>
          <el-button class="search" @click="getChapterList">Tra cứu</el-button>
        </div>
      </div>
      <div class="book-detail">
        <div class="book-detail__header">
          <div class="title">
            <span>Tên sách:</span>
            <span>
              <strong>Đắc nhân tâm</strong>
            </span>
          </div>
          <div class="download">
            <strong>
              <a href="#">Tải xuống toàn bộ</a>
            </strong>
          </div>
        </div>
        <div class="book-detail__main">
          <el-scrollbar wrap-class="book-detail__scroll">
            <el-table
              v-loading="isLoadingData"
              ref="singleTable"
              :data="chapterBooks"
              highlight-current-row
              style="width: 100%"
              :header-cell-style="{background: '#EAECED'}"
            >
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column property="title" label="Tên phần/chương" width="220"></el-table-column>
              <el-table-column label="Ngày gửi yêu cầu">
                <template slot-scope="scope">{{ formatTimeRequest(scope.row.created_at) }}</template>
              </el-table-column>
              <el-table-column label="Ngày trả file">
                <template slot-scope="scope">{{ formatTimeRequest(scope.row.updated_at) }}</template>
              </el-table-column>
              <el-table-column label="Độ dài">
                <template slot-scope="scope">{{toHHMMSS(scope.row.duration)}}</template>
              </el-table-column>
              <el-table-column property="status" label="Trạng thái">
                <!-- <template slot-scope="scope">
                  <strong
                    :class="getClassStatus(scope.row.status)"
                >{{getTextStatus(scope.row.status)}}</strong>-->
                <!-- </template> -->
              </el-table-column>
              <el-table-column label="Thao tác" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">
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
                  <span v-else>
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
                        fill="#9C9C9C"
                      />
                    </svg>
                  </span>
                  <span @click="showDetailContentChapter(scope.row)">
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
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </template>
    <div class="container" v-else>Không tìm thấy thông tin sách</div>
  </div>
</template>
<script>
import phrases from "@/data";
import moment from "moment";
import { mapGetters } from "vuex";
import { getBookInfo } from "@/api/book";
import { getChapters } from "@/api/chapter";

export default {
  name: "BookDetail",
  data() {
    return {
      chapterBooks: [],
      time: "0:00:00.165",
      bookInfo: null,
      limit: 10,
      pageCurrent: 1
    };
  },
  methods: {
    getClassStatus(status) {
      status = parseInt(status);
      switch (status) {
        case 0:
          return "";
          break;
        case 1:
          return "text-success";
          break;
        case 2:
          return "text-warning";
          break;
        default:
          return "";
          break;
      }
    },
    getTextStatus(status) {
      status = parseInt(status);
      switch (status) {
        case 0:
          return "Có lỗi";
          break;
        case 1:
          return "Thành công";
          break;
        case 2:
          return "Đang chờ";
          break;
        default:
          return "";
          break;
      }
    },
    convertTimeToMilliseconds(time) {
      if (!/^\d{1,2}\:\d{1,2}\:\d{1,2}.\d{1,3}$/.test(time)) return null;

      const date = time.split(".")[0].split(":");

      var millisecond = parseInt(time.split(".")[1]);
      const hours = parseInt(date[0]);
      const minutes = parseInt(date[1]);
      const seconds = parseInt(date[2]);

      millisecond += seconds * 1000 + minutes * 60000 + hours * 3600000;

      return millisecond;
    },
    async getBookInfo() {
      try {
        const { bookId } = this.$route.params;
        getBookInfo(bookId).then(res => {
          const { status, result } = res;
          if (status === 1) {
            this.bookInfo = result;
            return;
          }
          this.bookInfo = null;
        });
      } catch (error) {
        console.log(error.message);
        this.bookInfo = null;
      }
    },
    async getChapterList() {
      this.isLoadingData = true;
      const { bookId } = this.$route.params;

      let start = "";
      let end = "";
      if (this.dateRange) {
        start = new Date(this.dateRange[0]).valueOf();
        end = new Date(this.dateRange[1]).valueOf();
      }
      const options = {
        limit: this.limit,
        book_id: bookId,
        page_num: this.pageCurrent,
        start_time: start,
        end_time: end
      };
      getChapters(options)
        .then(res => {
          const { status, result } = res;
          if (status === 1) {
            const {
              pager: { limit, total_count, current_page_num },
              data
            } = result;

            this.pageCurrent = current_page_num;
            this.total = total_count;
            this.chapterBooks = data;
          }
        })
        .catch(err => {
          this.total = 0;
          this.chapterBooks = [];
        });
      this.isLoadingData = false;
    },
    formatTimeRequest(time) {
      const date = new Date(time);
      return moment(date.valueOf()).format("h:mm:ss - MM/DD/YYYY");
    },
    toHHMMSS(seconds) {
      if (seconds) {
        return moment()
          .startOf("day")
          .seconds(seconds)
          .format("HH:mm:ss");
      }
      return "-";
    },
    initDateRangeDefault() {
      var date = new Date();
      var start = new Date(date.getFullYear(), date.getMonth(), 1);
      var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.dateRange = [start, end];
    },
    showDetailContentChapter(currentChapter) {
      const { sentences } = currentChapter;
      if (currentChapter && sentences.length > 0) {
        const { id } = this.bookInfo;
        this.$router.push(`/analysic-book/${id}/${currentChapter.id}`);
        return;
      }

      this.$notify({
        type: "error",
        message: "Lỗi không tìm thấy nội dung của chương này",
        offset: "40"
      });
    }
  },
  computed: {
    ...mapGetters(["userId"])
  },
  created() {
    this.isLoadingData = true;
  },
  mounted() {
    this.initDateRangeDefault();
    this.getBookInfo();
    this.getChapterList();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/_book_id.scss";
@import "@/assets/styles/analysic-book/index.scss";
</style>

