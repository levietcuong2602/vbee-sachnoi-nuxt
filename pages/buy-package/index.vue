<template>
  <div class="buy-package">
    <Breadcrumb />
    <div class="buy-package__header">
      <ul class="nav nav-pills" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active buy-package__tab-item"
            data-toggle="tab"
            href="#cost-fee"
          >Gói cước TTS</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link buy-package__tab-item"
            data-toggle="tab"
            href="#book-voice"
          >Gói cước sách nói</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link buy-package__tab-item"
            data-toggle="tab"
            href="#paper-voice"
          >Gói cước báo nói</a>
        </li>
      </ul>
    </div>
    <div class="buy-package__main mt-3">
      <!-- Tab panes -->
      <div class="tab-content">
        <div id="cost-fee" class="container tab-pane active">
          <carousel
            :items="4"
            :margin="10"
            :nav="false"
            :dots="false"
            :responsive="options.responsive"
            :loop="true"
          >
            <PackageData v-for="i in 10" :key="i" />
          </carousel>
        </div>
        <div id="book-voice" class="container tab-pane fade">
          <carousel
            :items="4"
            :margin="10"
            :nav="false"
            :dots="false"
            :responsive="options.responsive"
            :loop="true"
          >
            <PackageData v-for="i in 10" :key="i+10" />
          </carousel>
        </div>
        <div id="paper-voice" class="container tab-pane fade">
          <carousel
            :items="4"
            :margin="10"
            :nav="false"
            :dots="false"
            :responsive="options.responsive"
            :loop="true"
          >
            <PackageData v-for="i in 10" :key="i+20" />
          </carousel>
        </div>
      </div>
    </div>
    <div class="buy-package__footer mt-5">
      <p>Chú thích:</p>
      <ul>
        <li>
          <span>Các gói cước sẽ được tự động gia hạn định kỳ</span>
        </li>
        <li>
          <span>Trong trường hợp sản lượng gói cước hết trước thời hạn. Khách hàng tuỳ chọn một trong hai lựa chọn sau:</span>
          <ul>
            <li>
              <i>Tự động gia hạn các gói cước</i>
            </li>
            <li>
              <i>Tính cước ngoài gói theo giá thông thường</i>
            </li>
          </ul>
        </li>
        <li>
          <span>Bảng giá cước áp dụng cho khách hàng cá nhân.</span>
        </li>
      </ul>
      <span>* Các cước phí trên đã bao gồm phí VAT</span>
    </div>
  </div>
</template>
<script>
// const carousel = () => {
//   if (typeof window !== "undefined" && typeof document !== "undefined") {
//     return import("vue-owl-carousel");
//   }
//   return null;
// };
let carousel;
if (process.client) {
  carousel = require("vue-owl-carousel");
}
import Breadcrumb from "@/components/Breadcrumb";
import PackageData from "@/components/BuyPackage/PackageData";
export default {
  name: "BuyPackage",
  components: {
    carousel,
    Breadcrumb,
    PackageData
  },
  data() {
    return {
      options: {
        items: 4,
        margin: 10,
        loop: true,
        autoplay: true,
        nav: false,
        rewind: true,
        dots: false,
        responsive: {
          1024: {
            items: 4,
            margin: 40
          },
          768: {
            items: 3,
            margin: 30
          },
          640: {
            items: 2,
            margin: 20
          },
          320: {
            items: 1,
            margin: 10
          }
        }
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.buy-package {
  padding: 0px 20px;
  .buy-package__header {
    align-items: center;
    display: flex;
    justify-content: center;
    .buy-package__tab-item {
      font-size: 1.5vw;
      color: #838383;
      &.active {
        background-color: #fff;
        color: #000;
      }
      &:hover {
        color: #000;
      }
    }
  }
  // .buy-package__main {
  // }
  // .buy-package__footer {
  // }
}
</style>