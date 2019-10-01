<template>
  <div class="analysic-book">
    <Breadcrumb :routes="routes" />
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
    <nuxt-child />
  </div>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "AnalysicBook",
  components: {
    Breadcrumb
  },
  data() {
    return {
      dateRange: [],
      routes: [
        {
          name: "Sách nói",
          path: "/"
        },
        {
          name: "Thống kê sách"
        }
      ]
    };
  },
  methods: {
    updateRoutes() {
      const { bookId } = this.$route.params;
      if (bookId) {
        this.routes = [
          {
            name: "Sách nói",
            path: "/"
          },
          {
            name: "Thống kê sách",
            path: "/analysic-book"
          },
          {
            name: "Thống kê chi tiết"
          }
        ];
      } else {
        this.routes = [
          {
            name: "Sách nói",
            path: "/"
          },
          {
            name: "Thống kê sách"
          }
        ];
      }
    }
  },
  mounted() {
    // this.updateRoutes();
    // console.log("routes: ", this.$route.path);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.analysic-book {
  padding: 0 10px;
  .analysic-book__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include Responsive(XS) {
      display: block;
    }
    @include mobile-xs {
      display: block;
    }
    .title {
      @include Responsive(XS) {
        text-align: center;
      }
      @include mobile-xs {
        text-align: center;
      }
    }
    .options {
      @include Responsive(XS) {
        text-align: center;
      }
      @include mobile-xs {
        text-align: center;
      }
      .search {
        background-color: #3c4858;
        color: #fff;
        @include Responsive(XS) {
          margin-top: 5px;
        }
        @include mobile-xs {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>