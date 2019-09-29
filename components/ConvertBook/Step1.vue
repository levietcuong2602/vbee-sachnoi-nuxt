<template>
  <div class="step1">
    <div class="row mt-5">
      <div class="col-md-2 col-sm-4 col-6">
        <label for>Tên sách (*)</label>
        <el-input placeholder="Tên sách" v-model="bookName"></el-input>
      </div>
      <div class="col-md-2 col-sm-4 col-6">
        <label for>Tác giả</label>
        <el-input placeholder="Tác giả" v-model="authorName"></el-input>
      </div>
      <div class="col-md-2 col-sm-4 col-6">
        <label for>Năm xuất bản</label>
        <el-date-picker v-model="publicYear" type="year" placeholder="Năm xuất bản"></el-date-picker>
      </div>
    </div>
    <div class="row mt-3">
      <el-upload
        class="col-12"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileBooks"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          Thả file sách ở đây (.docx, .txt)
          <strong>Nhấn vào đây</strong> để tải lên
        </div>
      </el-upload>
    </div>
    <div class="row mt-5">
      <div class="col-12 text-center note-descript">
        <h5>Bạn chỉ có file .PDF</h5>
        <p>Chuyển đổi PDF sang Word ở một số link sau đây:</p>
        <span>
          <a
            href="https://smallpdf.com/vi/pdf-to-word"
            target="_blank"
            rel="noopener noreferrer"
          >https://smallpdf.com/vi/pdf-to-word</a>
        </span>
        <br />
        <span>
          <a
            href="https://www.cleverpdf.com/vi/pdf-to-word"
            target="_blank"
            rel="noopener noreferrer"
          >https://www.cleverpdf.com/vi/pdf-to-word</a>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Step1",
  data() {
    return {
      bookName: "",
      authorName: "",
      publicYear: "",
      fileBooks: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./styles/_step1.scss";
</style>