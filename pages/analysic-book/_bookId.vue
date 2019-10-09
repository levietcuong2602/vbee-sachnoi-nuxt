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
                  <span @click="dialogDetailVisible = !dialogDetailVisible">
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
        <!-- dialog detail -->
        <el-dialog :visible.sync="dialogDetailVisible" width="90%">
          <template slot="title">
            <div class="header-title">[CHI TIẾT]</div>
            <div class="header-title-option">
              <div class="header-title-controll">
                <span>
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.3333 11.5H11.5V34.5H15.3333V11.5ZM34.5 34.5L18.2083 23L34.5 11.5V34.5Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span v-if="isStartAudio" @click="isStartAudio = false">
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 62 62"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M26.1429 47H17V15H26.1429V47ZM35.2857 47V15H44.4285V47H35.2857Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span v-else @click="isStartAudio = true">
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 62 62"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.6373 15.4432C22.9175 14.3488 20.667 15.5842 20.667 17.6227V44.3774C20.667 46.4159 22.9175 47.6512 24.6373 46.5568L45.6588 33.1795C47.254 32.1644 47.254 29.8357 45.6588 28.8206L24.6373 15.4432Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span>
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M27.7917 23L11.5 34.5V11.5L27.7917 23ZM34.5 34.5H30.6667V11.5H34.5V34.5Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </div>
              <div class="header-title-search">
                <el-input size="small" placeholder="Tìm kiếm"></el-input>
              </div>
            </div>
          </template>
          <div class="dialog-box">
            <div class="dialog-box__main">
              <template v-for="(phrase, index) in phrases">
                <button
                  v-if="currentPhrase === index"
                  :key="phrase.start"
                  class="highlight-btn"
                  @contextmenu.prevent="showContextMenu"
                  @click="jumpToPhare(phrase, index)"
                >{{ phrase.text }}</button>
                <span
                  v-else
                  :key="phrase.start"
                  class="highlight"
                  @click="jumpToPhare(phrase, index)"
                >{{ phrase.text }}&nbsp;</span>
              </template>
            </div>
            <div class="dialog-box__footer">Trang 107/129</div>
          </div>
          <div slot="footer">
            <el-button type="warning" @click="dialogDetailVisible = false">Trở lại</el-button>
          </div>
        </el-dialog>

        <!-- inner dialog -->
        <el-dialog
          class="book-detail__inner-dialog"
          width="40%"
          :visible.sync="innerVisible"
          append-to-body
        >
          <template slot="title">
            <h5 class="text-center m-0">{{ titleInnerDialog }}</h5>
          </template>
          <!-- body inner dialog -->
          <div class="body-inner">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Vui lòng nhập vào đây ..."
              v-model="tempPhrase"
            ></el-input>
          </div>
          <!-- end body inner dialog -->
          <div slot="footer">
            <el-button type="primary" @click="handlePhrases">Xác nhận</el-button>
            <el-button type="danger" @click="innerVisible = false">Bỏ qua</el-button>
          </div>
        </el-dialog>
        <!-- end inner dialog -->
        <!-- context menu -->
        <ul id="context-menu">
          <li class="context-menu-item">
            <img
              class="context-menu-icon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NS40IDQ1LjQiPjxwYXRoIGZpbGw9IiNmOTY5MGUiIGQ9Ik00MS4zIDE4LjZIMjYuOFY0YzAtMi0xLjgtNC00LTQtMi40IDAtNC4yIDItNC4yIDR2MTQuNkg0Yy0yIDAtNCAxLjgtNCA0IDAgMS4yLjUgMi4zIDEuMiAzIC44LjggMS44IDEuMyAzIDEuM2gxNC40djE0LjNjMCAxIC40IDIgMS4yIDMgLjcuNiAxLjggMSAzIDEgMi4yIDAgNC0xLjcgNC00VjI3aDE0LjVjMi4zIDAgNC0yIDQtNC4zcy0xLjgtNC00LTR6Ii8+PC9zdmc+"
              width="12"
            />
            Thêm mới
            <ul>
              <li
                class="context-menu-item"
                @click="handleChangeOption('ADD_BEFORE_PHRASE')"
              >Thêm vào đầu</li>
              <li
                class="context-menu-item"
                @click="handleChangeOption('ADD_AFTER_PHRASE')"
              >Thêm vào cuối</li>
            </ul>
          </li>
          <li class="context-menu-item" @click="handleChangeOption('EDIT_PHRASE')">
            <img
              class="context-menu-icon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjguOSA1MjguOSI+PHBhdGggZmlsbD0iI2Y5NjkwZSIgZD0iTTMyOSA4OWwxMDcuNSAxMDcuN0wxNjQgNDY5IDU2LjcgMzYxLjYgMzI5IDg5em0xODktMjUuOGwtNDgtNDhjLTE4LjQtMTguNS00OC41LTE4LjUtNjcgMGwtNDYgNDYgMTA3LjUgMTA3LjVMNTE4IDExNWMxNC41LTE0LjIgMTQuNS0zNy40IDAtNTEuOHpNLjQgNTEyLjdjLTIgOC44IDYgMTYuNyAxNC44IDE0LjZsMTIwLTI5TDI3LjUgMzkwLjUuMyA1MTIuNnoiLz48L3N2Zz4="
              width="12"
            />
            Sửa
          </li>
          <li class="context-menu-item" @click="deletePhrases">
            <img
              class="context-menu-icon"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzkuMiAzMzkuMiI+PHBhdGggZmlsbD0iI2Y5NjkwZSIgZD0iTTI0Ny4yIDE2OS42bDg0LTg0YzUuMy01LjMgOC0xMS43IDgtMTkuNCAwLTcuNi0yLjctMTQtOC0xOS40TDI5Mi40IDhDMjg3IDIuNyAyODAuNiAwIDI3MyAwYy03LjcgMC0xNCAyLjctMTkuNSA4bC04NCA4NEw4NS44IDhDODAuMyAyLjcgNzQgMCA2Ni4yIDBjLTcuNiAwLTE0IDIuNy0xOS40IDhMOCA0Ni44Yy01LjMgNS40LTggMTEuOC04IDE5LjQgMCA3LjcgMi43IDE0IDggMTkuNWw4NCA4NC04NCA4My44QzIuNyAyNTkgMCAyNjUuMyAwIDI3M2MwIDcuNiAyLjcgMTQgOCAxOS40bDM4LjggMzguOGM1LjQgNS4zIDExLjggOCAxOS40IDggNy43IDAgMTQtMi43IDE5LjUtOGw4NC04NCA4My44IDg0YzUuNCA1LjMgMTEuOCA4IDE5LjUgOCA3LjYgMCAxNC0yLjcgMTkuNC04bDM4LjgtMzguOGM1LjMtNS40IDgtMTEuOCA4LTE5LjUgMC03LjctMi43LTE0LTgtMTkuNWwtODQtODR6Ii8+PC9zdmc+"
              width="10"
            />
            Xóa
          </li>
        </ul>
        <!-- end context menu -->
      </div>
    </template>
    <div class="container" v-else>Không tìm thấy thông tin sách</div>
  </div>
</template>
<script>
import phrases from "@/data";
import moment from "moment";
import axios from "axios";
import { mapGetters } from "vuex";

const OPTIONS_TYPE = {
  ADD_BEFORE_PHRASE: 0,
  ADD_AFTER_PHRASE: 1,
  EDIT_PHRASE: 2,
  DELETE_PHRASE: 3
};
export default {
  name: "BookDetail",
  data() {
    return {
      chapterBooks: [
        {
          headerNumber: "Phần 1: Mở đầu",
          timeRequest: "17:20:24 - 19/04/2019",
          timeResponse: "17:20:24 - 20/04/2019",
          length: "00:04:42",
          status: "1"
        },
        {
          headerNumber:
            "Phần 2: Đoán biết tâm lý dựa theo phản xạ người đối diện",
          timeRequest: "17:20:24 - 19/04/2019",
          timeResponse: "17:20:24 - 20/04/2019",
          length: "00:04:42",
          status: "2"
        },
        {
          headerNumber: "Phần 3: Nắm bắt cử chỉ",
          timeRequest: "17:20:24 - 19/04/2019",
          timeResponse: "17:20:24 - 20/04/2019",
          length: "00:04:42",
          status: "0"
        },
        {
          headerNumber: "Phần 4: Thuyết phục thật tự nhiên",
          timeRequest: "17:20:24 - 19/04/2019",
          timeResponse: "17:20:24 - 20/04/2019",
          length: "00:04:42",
          status: "1"
        },
        {
          headerNumber: "Những câu chuyện thực tế",
          timeRequest: "17:20:24 - 19/04/2019",
          timeResponse: "17:20:24 - 20/04/2019",
          length: "00:04:42",
          status: "1"
        }
      ],
      dialogDetailVisible: false,
      innerVisible: false,
      phrases,
      time: "0:00:00.165",
      isStartAudio: false,
      tempPhrase: "",
      titleInnerDialog: "Thêm mới",
      currentOption: -1,
      currentPhrase: 0,
      dateRange: [],
      bookInfo: null,
      limit: 10,
      pageCurrent: 1,
      // context-menu
      contextMenuWidth: null,
      contextMenuHeight: null
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
    jumpToPhare({ start, text }, index) {
      this.time = start;
      this.tempPhrase = text;
      this.currentPhrase = index;
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
    showContextMenu(vm) {
      var widthSidebar = this.sidebar.opened ? 210 : 54;
      var menu = document.getElementById("context-menu");
      if (!this.contextMenuWidth || !this.contextMenuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.contextMenuWidth = menu.offsetWidth;
        this.contextMenuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }

      if (this.contextMenuWidth + vm.pageX >= window.innerWidth) {
        menu.style.left = vm.pageX - this.contextMenuWidth + "px";
      } else {
        // để dialog nên phải trừ đi độ rộng của sidebar
        // menu left: tính từ mép phải sidebar
        // bt tính mép phải màn hình
        if (vm.pageX < widthSidebar) {
          menu.style.left = "0px";
        } else {
          menu.style.left = vm.pageX - widthSidebar + "px";
        }
      }
      if (this.contextMenuHeight + vm.pageY >= window.innerHeight) {
        menu.style.top = vm.pageY - this.contextMenuHeight + "px";
      } else {
        menu.style.top = vm.pageY + "px";
      }

      menu.classList.add("active");
    },
    hideContextMenu: () => {
      document.getElementById("context-menu").classList.remove("active");
    },
    addBeforePhrases() {
      const index = this.currentPhrase;
      const phrase = {
        text: this.tempPhrase,
        start: null,
        end: null
      };
      this.phrases.splice(index, 0, phrase);
    },
    addAfterPhrases() {
      const index = this.currentPhrase;
      const phrase = {
        text: this.tempPhrase,
        start: null,
        end: null
      };
      this.phrases.splice(index + 1, 0, phrase);
    },
    editPhrases() {
      this.phrases = this.phrases.map((phrase, index) =>
        index - this.currentPhrase === 0
          ? {
              ...phrase,
              text: this.tempPhrase
            }
          : phrase
      );
    },
    deletePhrases() {
      this.$confirm(
        "Bạn có chắc chắn muốn xóa câu này khỏi đoạn văn không?",
        "Cảnh báo",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy bỏ",
          type: "warning",
          customClass: "book-detail__messagebox"
        }
      )
        .then(() => {
          const valueDelete = this.phrases.splice(this.currentPhrase, 1);
          if (valueDelete) {
            this.$message({
              type: "success",
              message: "Xóa câu thành công!",
              offset: 100
            });
          } else {
            this.$message({
              type: "error",
              message: "Xóa câu thất bại!",
              offset: 100,
              duration: 1500
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "Xóa câu thất bại",
            offset: 100,
            duration: 1500
          });
        });
    },
    handleChangeOption(option) {
      if (!OPTIONS_TYPE.hasOwnProperty(option)) {
        this.$message({
          type: "error",
          message: "Lỗi thao tác. Vui lòng thử lại!",
          offset: 100,
          duration: 1500
        });
        return;
      }

      this.innerVisible = true;
      switch (OPTIONS_TYPE[option]) {
        case OPTIONS_TYPE["ADD_BEFORE_PHRASE"]:
          this.titleInnerDialog = "Thêm vào trước";
          this.currentOption = OPTIONS_TYPE["ADD_BEFORE_PHRASE"];
          this.tempPhrase = "";
          break;
        case OPTIONS_TYPE["ADD_AFTER_PHRASE"]:
          this.titleInnerDialog = "Thêm vào sau";
          this.currentOption = OPTIONS_TYPE["ADD_AFTER_PHRASE"];
          this.tempPhrase = "";
          break;
        case OPTIONS_TYPE["EDIT_PHRASE"]:
          this.titleInnerDialog = "Sửa câu";
          this.currentOption = OPTIONS_TYPE["EDIT_PHRASE"];
          const { text } = phrases[this.currentPhrase];
          this.tempPhrase = text;
          break;
        default:
          this.$message({
            type: "error",
            message: "Lỗi thao tác. Vui lòng thử lại!",
            offset: 100,
            duration: 1500
          });
          break;
      }
    },
    onClickHideContextMenu() {
      document.addEventListener("click", function(e) {
        document.getElementById("context-menu").classList.remove("active");
      });
    },
    handlePhrases() {
      this.innerVisible = false;
      switch (this.currentOption) {
        case OPTIONS_TYPE["ADD_BEFORE_PHRASE"]:
          this.addBeforePhrases();
          break;
        case OPTIONS_TYPE["ADD_AFTER_PHRASE"]:
          this.addAfterPhrases();
          break;
        case OPTIONS_TYPE["EDIT_PHRASE"]:
          this.editPhrases();
          break;
        default:
          this.$message({
            type: "error",
            message: "Lỗi thao tác. Vui lòng thử lại!",
            offset: 100,
            duration: 1500
          });
          break;
      }
    },
    async getBookInfo() {
      try {
        const { bookId } = this.$route.params;
        const { status, data } = await axios({
          type: "GET",
          method: "GET",
          url: `http://localhost:8888/api/v1/books/${bookId}`
        });

        if (status !== 200) {
          this.bookInfo = null;
          return;
        }
        const { result } = data;
        this.bookInfo = result;
      } catch (error) {
        console.log(error.message);
        this.bookInfo = null;
      }
    },
    async getChapterList() {
      try {
        const { bookId } = this.$route.params;

        let start = null;
        let end = null;
        if (this.dateRange) {
          start = new Date(this.dateRange[0]).valueOf();
          end = new Date(this.dateRange[1]).valueOf();
        }
        const { status, data } = await axios({
          type: "GET",
          method: "GET",
          url: `http://localhost:8888/api/v1/chapters?limit=${this.limit}&book_id=${bookId}&page_num=${this.pageCurrent}&start_time=${start}&end_time=${end}`
        });

        if (status !== 200) {
          this.chapterBooks = [];
          return;
        }
        const {
          result: {
            pager: { limit, total_count, page_num }
          }
        } = data;

        this.pageCurrent = page_num;
        this.limit = limit;
        this.total = total_count;
        this.chapterBooks = data.result.data;
      } catch (error) {
        console.log(error.message);

        this.pageCurrent = 0;
        this.total = 0;
        this.chapterBooks = [];
      }
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
    }
  },
  computed: {
    ...mapGetters(["userId"]),
    checkTimeHightLight: function() {
      return ({ start, end }) => {
        const time = this.time;
        return time >= start && time < end;
      };
    },
    sidebar: function() {
      return this.$store.state.app.sidebar;
    }
  },
  mounted() {
    this.onClickHideContextMenu();
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

