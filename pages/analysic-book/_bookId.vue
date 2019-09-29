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
            <span>
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
          <p>Các nguồn tin ở Washington và Bắc Kinh hôm nay cho biết Trung Quốc và Mỹ nhiều khả năng sẽ đạt được một thỏa thuận "đình chiến thương mại", dừng các biện pháp áp thêm thuế với nhau trước thềm cuộc gặp giữa Tổng thống Mỹ Donald Trump và Chủ tịch Trung Quốc Tập Cận Bình tại hội nghị thượng đỉnh G20 ở Osaka, Nhật Bản cuối tuần này. Tuy nhiên, giới phân tích cho rằng ngoài một "thỏa thuận ngừng bắn", hai bên sẽ khó đạt được bước đột phá nào khác nhằm giải quyết cuộc chiến tranh thương mại đã kéo dài suốt một năm qua. "Cái bắt tay hay nụ cười trong cuộc gặp của Tổng thống Trump và Chủ tịch Tập Cận Bình không giúp hai bên nhanh chóng kết thúc chiến tranh thương mại hay chấm dứt cuộc cạnh tranh chiến lược dài hạn", Tiến sĩ Stephen Nagy, Đại học Thiên Chúa giáo Quốc tế ở Nhật Bản, chia sẻ với VnExpress về cuộc gặp giữa lãnh đạo hai nước bên lề Hội nghị thượng đỉnh G20 diễn ra tại Osaka ngày 28-29/6. Tiến sĩ Nagy cho rằng có hai nguyên nhân chính khiến Mỹ và Trung Quốc sẽ không đạt được thỏa thuận thương mại nào tại hội nghị G20, thậm chí cả trong thời gian còn lại của 2019. Về phía Trung Quốc, các lãnh đạo nước này lo ngại bất kỳ một thỏa hiệp nào trước Mỹ cũng có thể gây nên sự phản đối trong nước, dẫn tới bất ổn cả về kinh tế và xã hội. Bắc Kinh sẽ không chấp nhận bất kỳ một thỏa thuận nào bị người dân trong nước coi là bất công. Còn với chính quyền Trump, một thỏa thuận thương mại không phải là "trò chơi cuối cùng" với Trung Quốc. Tổng thống Mỹ hiểu rằng chính sách cứng rắn của ông với Trung Quốc đang nhận được sự ủng hộ rộng rãi tại Mỹ, từ các nhà chính trị của hai đảng, cộng đồng doanh nhân và cả người dân. "Các sáng kiến như xây tường biên giới với Mexico hay triển vọng phi hạt nhân bán đảo Triều Tiên đều đang bị mất đà, trong khi Trump đang tìm kiếm một thắng lợi chính trị nhằm tăng cơ hội tái đắc cử tổng thống vào 2020", Nagy phân tích.</p>
        </div>
        <div class="dialog-box__footer">Trang 107/129</div>
      </div>
      <div slot="footer">
        <el-button type="warning" @click="dialogDetailVisible = false">Trở lại</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
      dialogDetailVisible: false
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
    }
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
    .header-title {
    }
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
      }
      .dialog-box__footer {
        text-align: center;
      }
    }
  }
}
</style>