<template>
  <div class="buy-package">
    <el-breadcrumb class="pt-3" separator="-">
      <el-breadcrumb-item>Sách nói</el-breadcrumb-item>
      <el-breadcrumb-item>Mua gói cước</el-breadcrumb-item>
    </el-breadcrumb>
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
            :loop="false"
          >
            <PackageData
              v-for="element in listPackages"
              :key="element.id.toString()"
              :packageInfo="element"
              @changeSlider="changeTimeProcess"
            />
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
            <!-- <PackageData v-for="i in 10" :key="i+10" /> -->
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
            <!-- <PackageData v-for="i in 10" :key="i+20" /> -->
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
import axios from "axios";
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
  },
  methods: {
    changeTimeProcess(id, timeProcess) {
      // this.listPackages = this.listPackages.map(value =>
      //   value.id === id ? { ...value, timeProcess } : value
      // );
    }
  },
  async asyncData({ params }) {
    try {
      const { status, data } = await axios({
        type: "GET",
        method: "GET",
        url: "http://localhost:8888/api/v1/packages"
      });
      if (status === 200) {
        const result = {};
        const { results } = data;
        for (const item of results) {
          const { code, id, amount, processing_time } = item;
          if (result[code] === undefined) {
            result[code] = {
              ...item,
              id: [id],
              amount: [amount],
              processing_time: [processing_time]
            };
          } else {
            result[code].id.unshift(id);
            result[code].amount.unshift(amount);
            result[code].processing_time.unshift(processing_time);
          }
        }
        const listPackages = [];
        for (const item in result) {
          if (result.hasOwnProperty(item)) {
            const pkg = result[item];
            listPackages.push(pkg);
          }
        }
        return { listPackages };
      }
    } catch (error) {
      console.log(error.message);
    }
    return { listPackages: [] };
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