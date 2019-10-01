<template>
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
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          :header-cell-style="{background: '#EAECED'}"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="headerNumber" label="Tên phần/chương" width="220"></el-table-column>
          <el-table-column property="timeRequest" label="Ngày gửi yêu cầu"></el-table-column>
          <el-table-column property="timeResponse" label="Ngày trả file"></el-table-column>
          <el-table-column property="length" label="Độ dài"></el-table-column>
          <el-table-column property="status" label="Trạng thái">
            <template slot-scope="scope">
              <strong :class="getClassStatus(scope.row.status)">{{getTextStatus(scope.row.status)}}</strong>
            </template>
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
                width="62"
                height="62"
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
                width="62"
                height="62"
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
          <template v-for="pharse in pharses">
            <button
              v-if="checkTimeHightLight(pharse)"
              :key="pharse.start"
              class="highlight-btn"
              @blur="hideContextMenu()"
              @contextmenu.prevent="showContextMenu()"
            >{{ pharse.text }}</button>
            <span
              v-else
              :key="pharse.start"
              class="highlight"
              @click="jumpToPhare(pharse.start)"
            >{{ pharse.text }}&nbsp;</span>
          </template>
        </div>
        <div class="dialog-box__footer">Trang 107/129</div>
      </div>
      <div slot="footer">
        <el-button type="warning" @click="dialogDetailVisible = false">Trở lại</el-button>
      </div>
      <ul class="context-menu">
        <li class="context-menu-item">
          <img
            class="context-menu-icon"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NS40IDQ1LjQiPjxwYXRoIGZpbGw9IiNmOTY5MGUiIGQ9Ik00MS4zIDE4LjZIMjYuOFY0YzAtMi0xLjgtNC00LTQtMi40IDAtNC4yIDItNC4yIDR2MTQuNkg0Yy0yIDAtNCAxLjgtNCA0IDAgMS4yLjUgMi4zIDEuMiAzIC44LjggMS44IDEuMyAzIDEuM2gxNC40djE0LjNjMCAxIC40IDIgMS4yIDMgLjcuNiAxLjggMSAzIDEgMi4yIDAgNC0xLjcgNC00VjI3aDE0LjVjMi4zIDAgNC0yIDQtNC4zcy0xLjgtNC00LTR6Ii8+PC9zdmc+"
            width="12"
          />
          New register
        </li>
        <li class="contex-men-item">
          <img
            class="context-menu-icon"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMzkuMiAzMzkuMiI+PHBhdGggZmlsbD0iI2Y5NjkwZSIgZD0iTTI0Ny4yIDE2OS42bDg0LTg0YzUuMy01LjMgOC0xMS43IDgtMTkuNCAwLTcuNi0yLjctMTQtOC0xOS40TDI5Mi40IDhDMjg3IDIuNyAyODAuNiAwIDI3MyAwYy03LjcgMC0xNCAyLjctMTkuNSA4bC04NCA4NEw4NS44IDhDODAuMyAyLjcgNzQgMCA2Ni4yIDBjLTcuNiAwLTE0IDIuNy0xOS40IDhMOCA0Ni44Yy01LjMgNS40LTggMTEuOC04IDE5LjQgMCA3LjcgMi43IDE0IDggMTkuNWw4NCA4NC04NCA4My44QzIuNyAyNTkgMCAyNjUuMyAwIDI3M2MwIDcuNiAyLjcgMTQgOCAxOS40bDM4LjggMzguOGM1LjQgNS4zIDExLjggOCAxOS40IDggNy43IDAgMTQtMi43IDE5LjUtOGw4NC04NCA4My44IDg0YzUuNCA1LjMgMTEuOCA4IDE5LjUgOCA3LjYgMCAxNC0yLjcgMTkuNC04bDM4LjgtMzguOGM1LjMtNS40IDgtMTEuOCA4LTE5LjUgMC03LjctMi43LTE0LTgtMTkuNWwtODQtODR6Ii8+PC9zdmc+"
            width="10"
          />
          Remove
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
import pharses from "@/data";
import moment from "moment";

export default {
  name: "BookDetail",
  data() {
    return {
      tableData: [
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
      pharses,
      time: "0:00:00.165",
      isStartAudio: false,
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
    jumpToPhare(start) {
      this.time = start;
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
    showContextMenu: () => {
      console.log(this);
      var menu = document.getElementById("context-menu");
      if (!this.contextMenuWidth || !this.contextMenuHeight) {
        menu.style.visibility = "hidden";
        menu.style.display = "block";
        this.contextMenuWidth = menu.offsetWidth;
        this.contextMenuHeight = menu.offsetHeight;
        menu.removeAttribute("style");
      }

      if (this.contextMenuWidth + vm.$event.pageX >= window.innerWidth) {
        menu.style.left = vm.$event.pageX - this.contextMenuWidth + "px";
      } else {
        menu.style.left = vm.$event.pageX + "px";
      }

      if (this.contextMenuHeight + vm.$event.pageY >= window.innerHeight) {
        menu.style.top = vm.$event.pageY - this.contextMenuHeight + "px";
      } else {
        menu.style.top = vm.$event.pageY + "px";
      }

      menu.classList.add("active");
    },
    hideContextMenu: () => {
      document.getElementById("context-menu").classList.remove("active");
    }
  },
  computed: {
    checkTimeHightLight: function() {
      return ({ start, end }) => {
        const time = this.time;
        return time >= start && time < end;
      };
    }
  },
  mounted() {
    // this.timer = setInterval(() => {}, 500);
    console.log(this.time);
    var millisecond = this.convertTimeToMilliseconds(this.time);
    console.log("timeStamp", millisecond);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.book-detail {
  padding: 20px 10px;
  .book-detail__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .book-detail__main {
    padding: 10px;
    .el-table__row {
      svg {
        width: 20px;
      }
    }
  }
  .el-dialog__header {
    // .header-title {
    // }
    .header-title-option {
      display: flex;
      align-items: center;
      .header-title-controll {
        margin: auto;
        span {
          svg {
            max-width: 40px;
          }
        }
        @include Responsive(XS) {
          text-align: center;
        }
        @include mobile-xs {
          text-align: center;
        }
      }

      .header-title-search {
        max-width: 200px;
        position: absolute;
        right: 20px;
        .el-input {
          width: 100%;
        }
        @include Responsive(XS) {
          width: 100%;
          position: static;
          margin: auto;
        }
        @include mobile-xs {
          width: 100%;
          position: static;
          margin: auto;
        }
      }

      @include Responsive(XS) {
        display: block;
      }
      @include mobile-xs {
        display: block;
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    .dialog-box {
      .dialog-box__main {
        padding: 20px;
        word-break: break-word;
        text-align: justify;
        border: 1px solid;
        .highlight {
          &:hover {
            cursor: pointer;
            background-color: #eee;
          }
        }
        .highlight-btn {
          border-radius: 4px;
          border: 1px solid #ebef01;
          background-color: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
      .dialog-box__footer {
        text-align: center;
      }
    }
  }

  // context menu
  #context-menu {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: none;
    list-style: none;
    position: absolute;
    z-index: 2147483647;
    background-color: white;
    border: 1px solid #ebebeb;
    border-bottom-width: 0px;
  }

  #context-menu.active {
    display: block;
  }

  .context-menu-icon {
    top: 1px;
    position: relative;
    margin-right: 10px;
  }

  .context-menu-item {
    display: flex;
    cursor: pointer;
    padding: 8px 15px;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
  }

  .context-menu-item:hover {
    background-color: #ebebeb;
  }
}
</style>