<template>
  <div>
    <div class="step2">
      <div class="row mt-3">
        <div class="col-12 options">
          <span
            class="btn-option"
            @click="handleCheckIsExtend"
          >{{ isExtend ? 'Thu gọn' : 'Mở rộng' }}</span>
        </div>
      </div>
      <div class="row mt-1">
        <div :class="[isExtend ? 'col-md-6' : '', 'col-sm-12', 'box-left']">
          <div class="box-main">
            <div class="preview-book">
              <el-scrollbar wrap-class="preview-book__scroll">
                <el-input
                  class="content"
                  type="textarea"
                  v-model="segmentPage"
                  @blur="updateBufferPages"
                ></el-input>
              </el-scrollbar>
              <!-- <client-only>
                <div class="editor">
                  <editor
                    ref="tuiEditor"
                    v-model="segmentPage"
                    :options="editorOptions"
                    :html="editorHtml"
                    previewStyle="vertical"
                    height="650px"
                    mode="wysiwyg"
                  />
                </div>
              </client-only>-->
            </div>
            <div class="preview-pager">
              <el-pagination
                :page-count="totalPage"
                :pager-count="5"
                layout="prev, pager, next, jumper"
                :current-page="currentPage"
                @current-change="handleChangePage"
              ></el-pagination>
            </div>
            <!-- <div class="preview-pager">Trang 24/29</div> -->
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
            <div class="box-introduct" v-if="!detachFile">
              <div class="box-introduct__header">
                <div class="title-introduct text-center w-100">
                  <h5 class="title text-center m-0">HƯỚNG DẪN TÁCH CHƯƠNG</h5>
                  <i>(không bắt buộc)</i>
                </div>
              </div>
              <div class="box-introduct__main">
                <p>
                  - Muốn tách file audio thành từng phần/chương, hệ thống sẽ căn cứ vào việc chủ động gắn thẻ vào trước từ đầu tiên của trang bắt đầu và sau từ cuối cùng của trang kết thúc từng phần/chương, với mã thẻ:
                  <br />
                  <strong>&lt;C[số thứ tự của chương]></strong>
                  <!-- hoặc <strong>&lt;P[số thứ tự của phần]></strong> -->
                </p>
                <br />
                <p>
                  Ví dụ: Phần/chương 1 của bạn từ trang 1 tới trang 20, bạn gắn thẻ
                  <strong>&lt;C1></strong>
                  <!-- hoặc <strong>&lt;P1></strong>  -->
                  vào trước từ bắt đầu của trang 1 và sau từ cuối của trang 20. Tương tự với các phần/chương sau.
                </p>
                <br />
                <p>- Click “Bắt đầu tách phần/chương” để đặt tên cho các phân đoạn đã tách. Click “Bỏ qua” nếu không có nhu cầu tách file.</p>
                <br />
                <p>- Vui lòng xem clip hướng dẫn dưới đây để hiểu rõ hơn.</p>
                <br />
              </div>
              <div class="box-introduct__footer">
                <div class="embed-responsive embed-responsive-16by9">
                  <video width="450" controls src="https://youtu.be/YC6NCr6_HbA"></video>
                  <!-- <iframe class="embed-responsive-item" src="https://youtu.be/YC6NCr6_HbA" allowfullscreen></iframe> -->
                </div>
                <!-- <div class="text-center">
                  <a href="#" @click.prevent="isIntroduction = false">Bắt đầu tách phân/chương</a>
                </div>-->
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
                  <el-table :data="chapters" height="500" style="width: 100%">
                    <el-table-column type="index" label="STT" width="50"></el-table-column>
                    <el-table-column prop="title" label="Tên phần/chương" width="200">
                      <template slot-scope="scope">
                        <el-input
                          v-model="scope.row.title"
                          :value="'Chương ' + scope.row + scope.row.title"
                        ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="start" label="Trang bắt đầu" width="120"></el-table-column>
                    <el-table-column prop="end" label="Trang kết thúc" width="120" align="center"></el-table-column>
                  </el-table>
                </el-scrollbar>
              </div>
              <div class="box-step3__footer">
                <el-pagination
                  v-show="chapters.length > pageSize"
                  :page-size="pageSize"
                  layout="prev, pager, next"
                  :total="chapters.length"
                ></el-pagination>
                <a href="#" class="btn-save">Lưu thay đổi</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5 pb-5">
      <div class="col text-right">
        <el-button @click="gotoBackStep()">Quay lại</el-button>
        <el-button>Bỏ qua</el-button>
        <el-button v-if="detachFile&&!isChange" type="warning" @click="gotoNextStep()">Tiếp tục</el-button>
        <el-button v-else type="warning" @click="handleBeforeDetachFile">Tách file</el-button>
      </div>
    </div>

    <!-- dialog -->
    <el-dialog :visible.sync="dialogNotifyVisible" width="40%" center>
      <div slot="title">
        <h5 class="text-center">Thông báo</h5>
      </div>
      <h5>{{ messageNotify }}</h5>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogNotifyVisible = false">Bỏ qua tách file</el-button>
        <el-button type="primary" @click="handleBeforeDetachFileContinue">Tiếp tục tách file</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
var Editor = null;
if (process.client) {
  var toastui = require("@toast-ui/vue-editor");
  Editor = toastui.Editor;
}

import {
  getPageWithLines,
  getPageSentences,
  detachChapter
} from "@/utils/convert";

export default {
  name: "Step2",
  components: { Editor },
  data() {
    return {
      isExtend: true,
      segmentPage: "",
      bufferPages: [],
      totalPage: 0,
      currentPage: 1,
      limitPage: 3000,
      detachFile: false,
      chapters: [],
      dialogNotifyVisible: false,
      messageNotify: "",
      isSaveBook: false,
      isSaveChapter: false,
      pageSize: 10,
      isChange: true,
      // editor
      editorOptions: {
        hideModeSwitch: true,
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "divider",
          "hr",
          "divider",
          "indent",
          "outdent"
        ]
      },
      editorHtml: ""
    };
  },
  computed: {
    ...mapGetters(["contentBook", "book", "userId", "domain"])
  },
  watch: {
    segmentPage: function(content) {
      this.isChange = true;
    }
  },
  methods: {
    gotoBackStep() {
      this.$emit("handleNextStep", 1);
    },
    gotoNextStep() {
      const isCheckEmpty = this.checkEmptyChapterName();
      if (isCheckEmpty) {
        this.dialogNotifyVisible = true;
        this.messageNotify =
          "Sách nói của bạn sẽ không được tách thành nhiều file nếu chưa đặt tên cho các phần.";
        return;
      }

      this.handleDetachFile();
    },
    getPageWithLines,
    getPageSentences,
    detachChapter,
    loadBufferPages() {
      // this.bufferPages = this.getPageWithLines(this.contentBook, 25, 75);
      this.bufferPages = this.getPageSentences(
        this.contentBook,
        this.limitPage
      );
      this.segmentPage = this.bufferPages[this.currentPage - 1];
      this.totalPage = this.bufferPages.length;
    },
    updateBufferPages() {},
    updateOriginBook() {
      const content = this.bufferPages.join(" ");
      this.$store.dispatch("book/updateContentBook", content);
    },
    handleCheckIsExtend() {
      this.isExtend = !this.isExtend;
    },
    handleChangePage(page) {
      this.currentPage = page;
      this.segmentPage = this.bufferPages[page - 1];
    },
    handleBeforeDetachFile() {
      this.detachFile = true;
      this.updateOriginBook();
      // check tag
      const regex = RegExp(
        /<c[0-9]+>|<C[0-9]+>|<\/c[0-9]+>|<\/C[0-9]+>|<c>|<C>|<\/c>|<\/C>/g
      );
      if (!regex.test(this.contentBook)) {
        this.messageNotify =
          "Bạn chưa tạo thẻ để tách phần/chương. Muốn tiếp tục tạo sách không cần tách file?";
        this.dialogNotifyVisible = true;
        return;
      }
      this.$nextTick(() => {
        this.chapters = this.detachChapter(this.contentBook);
      });

      this.isChange = false;
    },
    handleBeforeDetachFileContinue() {
      this.$nextTick(() => {
        this.chapters = this.detachChapter(this.contentBook);
        this.dialogNotifyVisible = false;
      });
    },
    async handleDetachFile() {
      // check header
      // create book and chapter
      await this.saveBookInfo();
      await this.saveChaptersInfo();
      await this.updateNumberChapterBook();

      if (this.isSaveBook && this.isSaveChapter) {
        this.$emit("handleNextStep", 4);
      }
    },
    checkEmptyChapterName() {
      const { chapters } = this;
      for (const chapter of chapters) {
        if (!chapter.title) {
          return true;
        }
      }
      return false;
    },
    async saveBookInfo() {
      try {
        const { id, name, publicYear, author } = this.book;
        if (id) {
          this.isSaveBook = true;
          return;
        }

        const userId = this.userId;
        const { status, data } = await axios({
          method: "POST",
          url: this.domain + "books",
          data: {
            user_id: userId,
            title: name,
            author,
            public_year: publicYear,
            status: { waiting: true },
            number_chapter: 0
          }
        });
        if (status === 200) {
          if (data.status === 1) {
            const {
              result: { id }
            } = data;
            console.log("book Id: ", id);
            this.$store.dispatch("book/updateIdBook", id);
            this.isSaveBook = true;
          }
          return;
        }
        console.log("save book infomation error");
        this.$notify.error({
          title: "Lỗi",
          message: "Lưu thông tin sách thất bại",
          offset: 40
        });
        this.isSaveBook = false;
        return;
      } catch (error) {
        console.log(error.message);
        this.$notify.error({
          title: "Lỗi",
          message: "Lưu thông tin sách thất bại",
          offset: 40
        });
        this.isSaveBook = false;
      }
    },
    async saveChaptersInfo() {
      const {
        id,
        chapters: { length }
      } = this.book;
      if (!id || length > 0) {
        this.isSaveChapter = true;
        return;
      }
      const userId = this.userId;
      const chapters = this.chapters.map(chapter => {
        const { content } = chapter;
        let { title } = chapter;
        if (!title || title === "") {
          title = "no name";
        }
        return {
          bookId: id,
          userId,
          title,
          content: content.trim(),
          status: { waiting: true }
        };
      });

      try {
        const { status, data } = await axios({
          method: "POST",
          url: this.domain + "chapters-mutils",
          data: {
            chapters
          }
        });
        if (status === 200) {
          if (data.status === 1) {
            const { result } = data;
            console.log("chapter Ids: ", result);
            if (result.length !== chapters.length) {
              console.log("lưu chapter thất bại");
              return;
            }
            this.chapters = chapters.map((chapter, index) => {
              return {
                ...chapter,
                id: result[index]
              };
            });
            this.$store.dispatch("book/updateChapterBook", this.chapters);
            this.isSaveChapter = true;
            return;
          }
        }

        console.log("save chapters infomation error");
        this.$notify.error({
          title: "Lỗi",
          message: "Lưu thông tin chương thất bại"
        });
        this.isSaveChapter = false;
        return;
      } catch (error) {
        console.log(error.message);
        this.$notify.error({
          title: "Lỗi",
          message: "Lưu thông tin chương thất bại",
          offset: 40
        });
        this.isSaveChapter = false;
      }
    },
    async updateNumberChapterBook() {
      this.isSaveBook = false;
      const { id } = this.book;
      if (!id) {
        return;
      }
      try {
        const {
          id,
          chapters: { length }
        } = this.book;
        const { status, data } = await axios({
          method: "PUT",
          url: `${this.domain}books/${id}`,
          data: {
            number_chapter: length
          }
        });
        if (status === 200) {
          if (data.status === 1) {
            this.isSaveBook = true;
          }
          return;
        }

        console.log("update chapters infomation error");
        this.$notify.error({
          title: "Lỗi",
          message: "Cập nhật số chương thất bại",
          offset: 40
        });
        this.isSaveBook = false;
        return;
      } catch (error) {
        console.log(error.message);
        this.$notify.error({
          title: "Lỗi",
          message: "Cập nhật số chương thất bại",
          offset: 40
        });
        this.isSaveBook = false;
      }
    }
  },
  mounted() {
    this.loadBufferPages();
  }
};
</script>
<style lang="scss" scoped>
@import "./styles/_step2.scss";
@import "./styles/_step3.scss";
</style>