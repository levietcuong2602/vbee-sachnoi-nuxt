<template>
  <div class="step2">
    <div class="row mt-3">
      <div class="col-12 options">
        <span class="btn-option" @click="handleCheckIsExtend">{{ isExtend ? 'Thu gọn' : 'Mở rộng' }}</span>
      </div>
    </div>
    <div class="row mt-1">
      <div :class="[isExtend ? 'col-md-6' : '', 'col-sm-12', 'box-left']">
        <div class="box-main">
          <div class="preview-book">
            <el-scrollbar wrap-class="preview-book__scroll">
              <p
                class="content"
              >Các nguồn tin ở Washington và Bắc Kinh hôm nay cho biết Trung Quốc và Mỹ nhiều khả năng sẽ đạt được một thỏa thuận "đình chiến thương mại", dừng các biện pháp áp thêm thuế với nhau trước thềm cuộc gặp giữa Tổng thống Mỹ Dnald Trump và Chủ tịch Trung Quốc Tập Cận Bình tại hội nghị thượng đỉnh G20 ở Osaka, Nhật Bản cuối tuần này. Tuy nhiên, giới phân tích cho rằng ngoài một "thỏa thuận ngừng bắn", hai bên sẽ khó đạt được bước đột phá nào khác nhằm giải quyết cuộc chiến tranh thương mại đã kéo dài suốt một năm qua. "Cái bắt tay hay nụ cười trong cuộc gặp của Tổng thống Dnald Trump và Chủ tịch Tập Cận Bình không giúp hai bên nhanh chóng kết thúc chiến tranh thương mại hay chấm dứt cuộc cạnh tranh chiến lược dài hạn", Tiến sĩ Stephen Nagy, Đại học Thiên Chúa giáo Quốc tế ở Nhật Bản, chia sẻ với VnExpress về cuộc gặp giữa lãnh đạo hai nước bên lề Hội nghị thượng đỉnh G20 diễn ra tại Osaka ngày 28-29/6. Tiến sĩ Nagy cho rằng có hai nguyên nhân chính khiến Mỹ và Trung Quốc sẽ không đạt được thỏa thuận thương mại nào jại HộI nghị G20, thậm chí cả trong thời gian còn lại của 2019. Về phía Trung Quốc, các lánh đảo nước này lo ngại bất kỳ một thỏa hiệp nào trước Mỹ cũng có thể gây nên sự phản đối trong nước, dẫn tới bất ổn cả về kinh tế và xã hội. Bắc Kinh sẽ không chấp nhận bất kỳ một thỏa thuận nào bị người dân trong nước coi là bất công. Còn với chính quyền Dnald Trump, một thỏa thuận thương mại không phải là "trò chơi cuối cùng" với Trung Quốc. Tổng thống Mỹ hiểu rằng chính sách cứng rắn của ông với Trung Quốc đang nhận được sự ủng hộ rộng rãi tại Mỹ, từ các nhà chính trị của hai đảng, cộng đồng doanh nhân và cả người dân. "Các sáng kiến như xây tường biên giới với Mexico hay triển vọng phi hạt nhân</p>
            </el-scrollbar>
          </div>
          <div class="preview-pager">Trang 24/29</div>
        </div>
        <div class="no-extend" v-if="!isExtend">
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
              d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 16V18H11V16H13ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 11.2829 15.21 11.9733 14.4408 12.6455C13.711 13.2833 13 13.9046 13 15H11C11 13.1787 11.9421 12.4566 12.7704 11.8217C13.4202 11.3236 14 10.8792 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8Z"
              fill="black"
              fill-opacity="0.54"
            />
          </svg>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 box-right" v-if="isExtend">
        <div class="step3 preview-option">
          <div class="box-introduct" v-if="isIntroduction">
            <div class="box-introduct__header">
              <div class="title-introduct text-center w-100">
                <h5 class="title text-center m-0">HƯỚNG DẪN TÁCH CHƯƠNG</h5>
                <i>(không bắt buộc)</i>
              </div>
            </div>
            <div class="box-introduct__main">
              <p>- Muốn tách file audio thành từng phần/chương, hệ thống sẽ căn cứ vào việc chủ động gắn thẻ vào trước từ đầu tiên của trang bắt đầu và sau từ cuối cùng của trang kết thúc từng phần/chương, với mã thẻ: &lt;C[số thứ tự của chương]> hoặc &lt;P[số thứ tự của phần]></p>
              <p>Ví dụ: Phần/chương 1 của bạn từ trang 1 tới trang 20, bạn gắn thẻ &lt;C1> hoặc &lt;P1> vào trước từ bắt đầu của trang 1 và sau từ cuối của trang 20. Tương tự với các phần/chương sau.</p>
              <p>- Click “Bắt đầu tách phần/chương” để đặt tên cho các phân đoạn đã tách. Click “Bỏ qua” nếu không có nhu cầu tách file.</p>
              <p>- Vui lòng xem clip hướng dẫn dưới đây để hiểu rõ hơn.</p>
            </div>
            <div class="box-introduct__footer">
              <div class="embed-responsive embed-responsive-16by9">
                <video width="450" controls src="https://youtu.be/YC6NCr6_HbA"></video>
                <!-- <iframe class="embed-responsive-item" src="https://youtu.be/YC6NCr6_HbA" allowfullscreen></iframe> -->
              </div>
              <div class="text-center">
                <a href="#" @click.prevent="isIntroduction = false">Bắt đầu tách phân/chương</a>
              </div>
            </div>
          </div>
          <div class="box-step3" v-else>
            <div class="box-step3__header">
              <div class="title-step3">
                <h5>TÁCH FILE AUDIO THÀNH TỪNG PHẦN</h5>
                <i>(không bắt buộc)</i>
              </div>
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
                  d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 16V18H11V16H13ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 11.2829 15.21 11.9733 14.4408 12.6455C13.711 13.2833 13 13.9046 13 15H11C11 13.1787 11.9421 12.4566 12.7704 11.8217C13.4202 11.3236 14 10.8792 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10H8Z"
                  fill="black"
                  fill-opacity="0.54"
                />
              </svg>
            </div>
            <div class="box-step3__main">
              <el-scrollbar wrap-class="preview-book__scroll">
                <el-table :data="tableWord" height="500" style="width: 100%">
                  <el-table-column prop="order" label="STT" width="50"></el-table-column>
                  <el-table-column prop="header" label="Tên phần/chương" width="200"></el-table-column>
                  <el-table-column prop="startPage" label="Trang bắt đầu" width="120"></el-table-column>
                  <el-table-column prop="endPage" label="Trang kết thúc" width="120" align="center"></el-table-column>
                </el-table>
              </el-scrollbar>
            </div>
            <div class="box-step3__footer">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
              <a href="#" class="btn-save">Lưu thay đổi</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Step3",
  data() {
    return {
      isIntroduction: true,
      isExtend: true
    };
  },
  methods: {
    handleCheckIsExtend() {
      this.isExtend = !this.isExtend;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./_step2.scss";
@import "./_step3.scss";
</style>