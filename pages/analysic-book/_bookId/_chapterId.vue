<template>
  <div class="chapter-detail">
    <div class="box__body">
      <el-scrollbar wrap-class="preview-book__scroll">
        <div class="dialog-box">
          <div class="dialog-box__main col-lg-10 col-12">
            <div class="title-chapter">
              <h5 class="text-center">{{ currentChapter ? currentChapter.title : "" }}</h5>
            </div>
            <template v-for="(sentence, index) in sentences">
              <span
                v-if="currentSentence === index"
                :key="sentence.file_name"
                class="highlight-btn"
                @contextmenu.prevent="event => showContextMenu(event, index)"
                @click="jumpToPhare(sentence, index)"
              >{{ sentence.content }}</span>
              <span
                v-else
                :key="sentence.file_name"
                class="highlight"
<<<<<<< HEAD
                :class="getClassByStatus(sentence.status)"
                @contextmenu.prevent="event => showContextMenu(event, index)"
                @click="jumpToPhare(sentence, index)"
              >{{ sentence.content }}&nbsp;</span>
            </template>
            <div class="footer-chapter text-right">
              <el-button v-if="isChange" type="primary" @click="requestConvertChapter">Chỉnh sửa</el-button>
            </div>
=======
                @contextmenu.prevent="showContextMenu"
                @click="jumpToPhare(sentence, index)"
              >{{ sentence.content }}&nbsp;</span>
            </template>
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="box__footer">
      <div class="box__footer_main row">
        <div class="box__footer_main-controll col-lg-3">
          <span class="btn btn-prev">
<<<<<<< HEAD
            <el-tooltip effect="light" content="Previous" placement="bottom-start">
              <i class="fas fa-step-backward"></i>
            </el-tooltip>
          </span>
          <span v-if="isStartingAudio" class="btn btn-pause" @click="handleStopAudio">
            <el-tooltip effect="light" content="Play" placement="bottom-start">
              <i class="far fa-pause-circle"></i>
            </el-tooltip>
          </span>
          <span v-else class="btn btn-play" @click="handleStartAudio">
            <el-tooltip effect="light" content="Pause" placement="bottom-start">
              <i class="far fa-play-circle"></i>
            </el-tooltip>
          </span>
          <span class="btn btn-next">
            <el-tooltip effect="light" content="Next" placement="bottom-start">
              <i class="fas fa-step-forward"></i>
            </el-tooltip>
=======
            <i class="fas fa-step-backward"></i>
          </span>
          <span v-if="isStartingAudio" class="btn btn-pause" @click="handleStopAudio">
            <i class="far fa-pause-circle"></i>
          </span>
          <span v-else class="btn btn-play" @click="handleStartAudio">
            <i class="far fa-play-circle"></i>
          </span>
          <span class="btn btn-next">
            <i class="fas fa-step-forward"></i>
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
          </span>
        </div>
        <div class="box__footer_main-process col-lg-6">
          <div class="process">
            <p class="name m-0">Chương 1: Phần mở đầu</p>
          </div>
          <div class="sound">
<<<<<<< HEAD
            <el-dropdown>
=======
            <el-dropdown trigger="click">
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
              <span class="el-dropdown-link">
                <i class="fas fa-volume-up"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
<<<<<<< HEAD
                  <el-slider
                    v-model="soundVolume"
                    :min="0"
                    :max="100"
                    vertical
                    height="200px"
                    @change="handleChangeVolume"
                  ></el-slider>
=======
                  <el-slider v-model="soundVolume" vertical height="200px" :show-tooltip="false"></el-slider>
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="download">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
<<<<<<< HEAD
                <el-tooltip effect="light" content="Xem thêm" placement="bottom-start">
                  <i class="fas fa-ellipsis-h"></i>
                </el-tooltip>
=======
                <i class="fas fa-ellipsis-h"></i>
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="item-download">
                  <img src="/img/download.png" alt />
                  <span>Tải xuống</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="box__footer_main-chapter col-lg-3">
          <el-select v-model="chapterSelect" placeholder="Chọn chương">
            <el-option label="Chương 1" value="chapter_1"></el-option>
            <el-option label="Chương 2" value="chapter_2"></el-option>
          </el-select>
        </div>
      </div>
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
          v-model="tempSentence"
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
<<<<<<< HEAD
import { getChapter, updateChapter } from "@/api/chapter";
import { mapGetters } from "vuex";
import { STATUS_SENTENCE } from "@/constant";
=======
import { getChapter } from "@/api/chapter";
import { mapGetters } from "vuex";
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92

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
      isStartingAudio: false,
<<<<<<< HEAD
      tempSentence: "",
      tempIndex: null,
=======
      tempPhrase: "",
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
      titleInnerDialog: "Thêm mới",
      currentOption: -1,
      currentSentence: 0,
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
      chapterSelect: null,
<<<<<<< HEAD
      soundVolume: 40,
      isChange: false
=======
      soundVolume: 0
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
    };
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    jumpToPhare(sentence, index) {
      const { content } = sentence;
<<<<<<< HEAD
      this.tempSentence = content;
=======
      this.tempPhrase = content;
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
      this.currentSentence = index;

      this.handleStartAudio();
    },
    showContextMenu(vm, index) {
      this.tempIndex = index;
      this.tempSentence = vm.target.textContent;
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
<<<<<<< HEAD
    async addBeforePhrases() {
      if (this.tempSentence.trim().length > 0) {
        const sentences = this.sentences.filter(
          sentence => sentence.content.trim().length > 0
        );
        const sentence = {
          content: this.tempSentence,
          fileName: null,
          link: null,
          status: STATUS_SENTENCE.ADD
        };
        sentences.splice(this.tempIndex, 0, sentence);

        const content = sentences.reduce(
          (accumulator, sentence) => `${accumulator} ${sentence.content}`,
          ""
        );
        this.sentences = sentences;
        this.isChange = true;
        await updateChapter(this.chapterId, { sentences, content });
        await this.getChapterInfo();
        return;
      }
      this.$notify({
        type: "error",
        message: "Lỗi thao tác dữ liệu",
        offset: 40
      });
    },
    async addAfterPhrases() {
      if (this.tempSentence.trim().length > 0) {
        const sentences = this.sentences.filter(
          sentence => sentence.content.trim().length > 0
        );
        const sentence = {
          content: this.tempSentence,
          fileName: null,
          link: null,
          status: STATUS_SENTENCE.ADD
        };
        sentences.splice(this.tempIndex + 1, 0, sentence);
        const content = sentences.reduce(
          (accumulator, sentence) => `${accumulator} ${sentence.content}`,
          ""
        );
        this.sentences = sentences;
        this.tempIndex += 1;
        this.isChange = true;
        await updateChapter(this.chapterId, { sentences, content });
        await this.getChapterInfo();
        return;
      }
      this.$notify({
        type: "error",
        message: "Lỗi thao tác dữ liệu",
        offset: 40
      });
    },
    async editPhrases() {
      if (this.tempSentence.trim().length > 0 || this.tempIndex) {
        const sentences = this.sentences
          .filter(sentence => sentence.content.trim().length > 0)
          .map((sentence, index) => {
            if (index === this.tempIndex) {
              return {
                ...sentence,
                content: this.tempSentence,
                status: STATUS_SENTENCE.EDIT
              };
=======
    addBeforePhrases() {
      const index = this.currentSentence;
      const phrase = {
        text: this.tempPhrase,
        start: null,
        end: null
      };
      this.phrases.splice(index, 0, phrase);
    },
    addAfterPhrases() {
      const index = this.currentSentence;
      const phrase = {
        text: this.tempPhrase,
        start: null,
        end: null
      };
      this.phrases.splice(index + 1, 0, phrase);
    },
    editPhrases() {
      this.phrases = this.phrases.map((phrase, index) =>
        index - this.currentSentence === 0
          ? {
              ...phrase,
              text: this.tempPhrase
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
            }
            if (sentence.status !== "EDIT" && sentence.status !== "ADD") {
              return { ...sentence, status: "DONE" };
            }
            return sentence;
          });
        const content = sentences.reduce(
          (accumulator, sentence) => `${accumulator} ${sentence.content}`,
          ""
        );

        this.sentences = sentences;
        this.isChange = true;
        await updateChapter(this.chapterId, { sentences, content });
        await this.getChapterInfo();
        return;
      }
      this.$notify({
        type: "error",
        message: "Lỗi thao tác dữ liệu",
        offset: 40
      });
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
<<<<<<< HEAD
        .then(async () => {
          const sentences = this.sentences;
          sentences.splice(this.tempIndex, 1);
          this.sentences = sentences;
          await updateChapter(this.chapterId, { sentences });
          await this.getChapterInfo();

          this.$message({
            type: "success",
            message: "Cập nhật thông tin chương thành công",
            offset: 100
          });
=======
        .then(() => {
          const valueDelete = this.phrases.splice(this.currentSentence, 1);
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
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
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
    handleChangeVolume(value) {
      const audioElement = this.$refs.audioSrc;
      audioElement.volume = parseFloat(value / 100);
    },
    handleChangeOption(option) {
      if (!OPTIONS_TYPE.hasOwnProperty(option) || this.tempIndex === null) {
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
          this.tempSentence = "";
          break;
        case OPTIONS_TYPE["ADD_AFTER_PHRASE"]:
          this.titleInnerDialog = "Thêm vào sau";
          this.currentOption = OPTIONS_TYPE["ADD_AFTER_PHRASE"];
          this.tempSentence = "";
          break;
        case OPTIONS_TYPE["EDIT_PHRASE"]:
          this.titleInnerDialog = "Sửa câu";
          this.currentOption = OPTIONS_TYPE["EDIT_PHRASE"];
<<<<<<< HEAD
=======
          const { text } = phrases[this.currentSentence];
          this.tempPhrase = text;
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
          break;
        default:
          this.$notify({
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
    initPlayer() {
      const { sentences } = this.currentChapter;
      if (sentences.length > 0) {
        var me = this;
        me.sentences = sentences;
        const audioElement = me.$refs.audioSrc;

        // Audio track has ended playing.
        audioElement.addEventListener(
          "ended",
          e => {
            _trackHasEnded();
          },
          false
        );
        //Audio error.
        audioElement.addEventListener(
          "error",
          function(e) {
            switch (e.target.error.code) {
              case e.target.error.MEDIA_ERR_ABORTED:
                alert("You aborted the video playback.");
                break;
              case e.target.error.MEDIA_ERR_NETWORK:
                alert("A network error caused the audio download to fail.");
                break;
              case e.target.error.MEDIA_ERR_DECODE:
                alert(
                  "The audio playback was aborted due to a corruption problem or because the video used features your browser did not support."
                );
                break;
              case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                alert(
                  "The video audio not be loaded, either because the server or network failed or because the format is not supported."
                );
                break;
              default:
                alert("An unknown error occurred.");
                break;
            }
            me.isStartingAudio = false;
          },
          false
        );
<<<<<<< HEAD
        // change volume audio
=======
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92

        var _trackHasEnded = function() {
          me.currentSentence =
            parseInt(me.currentSentence) === me.sentences.length - 1
              ? 0
              : parseInt(me.currentSentence) + 1;
          me.isStartingAudio = false;
          _setTrack();
        };
        var _setTrack = function() {
          const { file_name } = sentences[me.currentSentence]; // get current entry, increment i
          const { book_id, id } = me.currentChapter;
          const songURL = `http://localhost:8888/audio/${book_id}/${id}/${file_name}`;
          audioElement.setAttribute("src", songURL);
<<<<<<< HEAD
          audioElement.volume = parseFloat(me.soundVolume / 100);
=======
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
          audioElement.load();
          me.isStartingAudio = true;
          _playBack();
        };
        var _playBack = function() {
          if (audioElement.paused) {
            audioElement.play();
          } else {
            audioElement.pause();
          }
        };
        return;
      }

      this.$notify({
        type: "error",
        message: "Lỗi không tìm thấy nội dung của chương này",
        offset: "40"
      });
    },
    handleStartAudio() {
<<<<<<< HEAD
      // start audio
      const { file_name, status } = this.sentences[this.currentSentence];
      const { book_id, id } = this.currentChapter;

      this.isStartingAudio = true;
      let audio = this.$refs.audioSrc;
      audio.src = "";
=======
      this.isStartingAudio = true;
      let audio = this.$refs.audioSrc;
      audio.src = "";
      // start audio
      const { file_name } = this.sentences[this.currentSentence];
      const { book_id, id } = this.currentChapter;
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
      const desc = `http://localhost:8888/audio/${book_id}/${id}/${file_name}`;
      this.audioSrc = desc;
      audio.src = desc;
      audio.load();
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            audio.pause();
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    },
    handleStopAudio() {
      this.isStartingAudio = false;
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
<<<<<<< HEAD
=======
    sidebar: function() {
      return this.$store.state.app.sidebar;
    },
>>>>>>> 442e663049af4a4cacdb1b0f8bf437fc03129b92
    async getChapterInfo() {
      await getChapter(this.chapterId)
        .then(res => {
          const { result } = res;
          this.currentChapter = result;
          this.sentences = result.sentences;
          this.isChange = this.sentences.some(
            sentence =>
              sentence.status !== "DONE" && sentence.status !== "WAITING"
          );
        })
        .catch(err => {});
    },
    async requestConvertChapter() {
      const sentences = this.sentences
        .filter(sentence => sentence.content.trim().length > 0)
        .map(sentence => {
          const { status } = sentence;
          if (status !== "DONE") {
            return { ...sentence, status: "WAITING" };
          }
          return sentence;
        });
      await updateChapter(this.bookdId, { sentences });
    },
    getClassByStatus(status) {
      switch (status) {
        case "ADD":
          return "action-add";
        case "EDIT":
          return "action-edit";
        case "ERROR":
          return "action-delete";
        default:
          return "";
      }
    }
  },
  created() {
    const { bookId, chapterId } = this.$route.params;
    this.bookdId = bookId;
    this.chapterId = chapterId;
  },
  async mounted() {
    this.onClickHideContextMenu();
    await this.getChapterInfo();
    this.initPlayer();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/analysic-book/_chapter_id.scss";
</style>