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
          <carousel>
            <CostFeeItem v-for="i in 10" :key="i" />
          </carousel>
        </div>
        <div id="book-voice" class="container tab-pane fade">
          <br />
          <h3>Menu 1</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div id="paper-voice" class="container tab-pane fade">
          <br />
          <h3>Menu 2</h3>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
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
const carousel = () => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    return import("vue-owl-carousel");
  }
  return null;
};
import Breadcrumb from "@/components/Breadcrumb";
import CostFeeItem from "@/components/BuyPackage/CostFeeItem";
export default {
  name: "BuyPackage",
  components: {
    carousel,
    Breadcrumb,
    CostFeeItem
  }
};
</script>
<style lang="scss">
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
  .buy-package__main {
  }
  .buy-package__footer {
  }
}
</style>