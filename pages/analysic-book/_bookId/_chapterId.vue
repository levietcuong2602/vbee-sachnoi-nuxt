<template>
  <div class="chapter-detail">
    <div class="box__title">
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
          <span v-if="!isStopAudio" @click="handleStopAudio">
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
          <span v-else @click="handleStartAudio">
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
        <!-- <div class="header-title-search">
          <el-input size="small" placeholder="Tìm kiếm"></el-input>
        </div>-->
      </div>
    </div>
    <div class="box__body">
      <el-scrollbar wrap-class="preview-book__scroll">
        <div class="dialog-box">
          <div class="dialog-box__main col-lg-8 col-12">
            <!-- <template v-for="(sentence, index) in sentences">
              <span
                v-if="currentPhrase === index"
                :key="sentence.file_name"
                class="highlight-btn"
                @contextmenu.prevent="showContextMenu"
                @click="jumpToPhare(sentence, index)"
              >{{ sentence.content }}</span>
              <span
                v-else
                :key="sentence.file_name"
                class="highlight"
                @click="jumpToPhare(sentence, index)"
              >{{ sentence.content }}&nbsp;</span>
            </template>-->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga recusandae corrupti minima molestias provident ea consequuntur dicta earum, soluta, magnam saepe non quia. Minima, corrupti culpa voluptas optio quibusdam eius.
          </div>
          <div class="dialog-box__footer">Trang 107/129</div>
        </div>
      </el-scrollbar>
    </div>

    <div class="box__footer">
      <el-button type="warning">Trở lại</el-button>
    </div>

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
    <audio ref="audioSrc" id="idAudio" preload="auto" autoplay :src="audioSrc"></audio>
  </div>
</template>
<script>
import { getChapter } from "@/api/chapter";

const OPTIONS_TYPE = {
  ADD_BEFORE_PHRASE: 0,
  ADD_AFTER_PHRASE: 1,
  EDIT_PHRASE: 2,
  DELETE_PHRASE: 3
};
export default {
  name: "chapter",
  data() {
    return {
      sentences: [],
      isStopAudio: true,
      tempPhrase: "",
      titleInnerDialog: "Thêm mới",
      currentOption: -1,
      currentPhrase: 0,
      dateRange: [],
      // context-menu
      contextMenuWidth: null,
      contextMenuHeight: null,
      isLoadingData: true,
      currentChapter: null,
      audioSrc: null,
      innerVisible: false,
      bookdId: null,
      chapterId: null,
      chapterInfo: null,
      sentences: []
    };
  },
  methods: {
    jumpToPhare(sentence, index) {
      const { content } = sentence;
      this.tempPhrase = content;
      this.currentPhrase = index;

      this.handleStartAudio();
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
    showDetailContentChapter(currentChapter) {
      const { sentences } = currentChapter;
      if (sentences.length > 0) {
        this.currentChapter = currentChapter;
        this.sentences = sentences;

        const audioElement = this.$refs.audioSrc;
        var me = this;

        audioElement.addEventListener("ended", playAudio);
        var i = 0;
        function playAudio() {
          if (i >= sentences.length) i = 0; // if i=> length, reset
          if (i !== me.currentPhrase) me.currentPhrase = i;

          const { file_name } = sentences[i++]; // get current entry, increment i
          const { book_id, id } = me.currentChapter;
          const desc = `http://localhost:8888/audio/${book_id}/${id}/${file_name}`;

          audioElement.src = desc; // <- for demo samples only. 'sound/' + entry.value + '.wav';
          audioElement.load(); // cleanup old fun, invoke loading of new
          audioElement.play(); // cue up play
        }

        return;
      }

      this.$notify({
        type: "error",
        message: "Lỗi không tìm thấy nội dung của chương này",
        offset: "40"
      });
    },
    handleStartAudio() {
      this.isStopAudio = false;
      this.audioSrc = null;

      let audio = this.$refs.audioSrc;
      audio.src = "";
      // start audio
      const { file_name } = this.sentences[this.currentPhrase];
      const { book_id, id } = this.currentChapter;
      const desc = `http://localhost:8888/audio/${book_id}/${id}/${file_name}`;

      this.audioSrc = desc;
      audio.src = desc;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            audio.pause();
          })
          .catch(error => {});
      }
    },
    handleStopAudio() {
      this.isStopAudio = true;
      this.audioSrc = null;

      try {
        const audio = this.$refs.audioSrc;

        audio.pause();
      } catch (error) {
        console.log(error.message);
      }
    },
    checkTimeHightLight: function() {
      return ({ start, end }) => {
        const time = this.time;
        return time >= start && time < end;
      };
    },
    sidebar: function() {
      return this.$store.state.app.sidebar;
    },
    getChapterInfo() {
      getChapter(this.chapterId)
        .then(res => {
          const { result } = res;
          this.chapterInfo = result;
          this.sentences = result.sentences;
        })
        .catch(err => {});
    }
  },
  created() {
    const { bookId, chapterId } = this.$route.params;
    this.bookdId = bookId;
    this.chapterId = chapterId;
  },
  mounted() {
    this.onClickHideContextMenu();
    this.getChapterInfo();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/_chapter_id.scss";
</style>