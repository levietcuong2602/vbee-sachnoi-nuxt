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
                <template slot-scope="scope">
                  <span class="text-center">{{ convertStatusBook(scope.row.status) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Thao tác" align="center">
                <template slot-scope="scope">
                  <el-tooltip effect="light" content="Tải xuống" placement="bottom-start">
                    <span v-if="scope.row.status === 'DONE'">
                      <i class="fas fa-download text-primary"></i>
                    </span>
                    <span v-else>
                      <i class="fas fa-download"></i>
                    </span>
                  </el-tooltip>
                  <el-tooltip effect="light" content="Chi tiết" placement="bottom-start">
                    <span @click="showDetailContentChapter(scope.row)">
                      <i class="fas fa-info-circle"></i>
                    </span>
                  </el-tooltip>
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
      pageCurrent: 1,
      isLoadingData: true
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
      if (currentChapter && sentences > 0) {
        const { id } = this.bookInfo;
        this.$router.push(`/analysic-book/${id}/${currentChapter.id}`);
        return;
      }

      this.$notify({
        type: "error",
        message: "Lỗi không tìm thấy nội dung của chương này",
        offset: "40"
      });
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
          return "Không xác định";
          break;
      }
    }
  },
  computed: {
    ...mapGetters(["userId"])
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

