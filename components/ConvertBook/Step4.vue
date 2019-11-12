<template>
  <div>
    <div class="step4 mt-3">
      <div class="step4__main">
        <div class="box-left">
          <div class="select-voice">
            <span
              class="title-select-voice el-col-lg-4 el-col-md-4 el-col-sm-6 el-col-xs-8"
            >Chọn giọng:</span>
            <el-radio-group
              class="el-col-lg-20 el-col-md-20 el-col-sm-18 el-col-xs-16"
              v-model="voiceSelect"
              @change="hanleChangeVoice"
            >
              <el-radio
                v-for="voice in voices"
                :key="voice.value"
                :label="voice.value"
                class="el-col-lg-8 el-col-md-8 el-col-sm-12 el-col-xs-24"
              >{{ voice.display_name }}</el-radio>
            </el-radio-group>
          </div>
          <div class="format-quality-file">
            <div class="format-quality el-col-lg-8 el-col-md-8 el-col-sm-24 el-col-xs-24">
              <div class="title-format-quality el-col-lg-8 el-col-md-8 el-col-sm-8s el-col-xs-8">
                <span>Chất lượng:</span>
              </div>
              <el-radio-group
                v-model="bitRate"
                class="el-col-lg-16 el-col-md-16 el-col-sm-16 el-col-xs-16"
                @change="handleChangeBitRate"
              >
                <el-radio
                  label="64000"
                  class="el-col-lg-12 el-col-md-12 el-col-sm-12 el-col-xs-12"
                >128 kbps</el-radio>
                <el-radio
                  label="128000"
                  class="el-col-lg-12 el-col-md-12 el-col-sm-12 el-col-xs-12"
                >320 kbps</el-radio>
              </el-radio-group>
            </div>
            <div class="speed-voice el-col-lg-9 el-col-md-9 el-col-sm-24 el-col-xs-24">
              <div class="title-format-quality el-col-lg-6 el-col-md-6 el-col-sm-6 el-col-xs-10">
                <span>Tốc độ đọc:</span>
              </div>
              <div class="box-speed-read el-col-lg-18 el-col-md-18 el-col-sm-18 el-col-xs-14">
                <div class="speed-read">
                  <el-slider
                    v-model="speedVoice"
                    :min="0.1"
                    :max="1.9"
                    show-input
                    :show-input-controls="false"
                    :input-size="'small'"
                    :step="0.05"
                  ></el-slider>
                </div>
              </div>
            </div>
            <div class="format-file el-col-lg-7 el-col-md-7 el-col-sm-24 el-col-xs-24">
              <div class="title-format-file el-col-lg-8 el-col-md-8 el-col-sm-6 el-col-xs-10">
                <span>Định dạng:</span>
              </div>
              <el-radio-group
                v-model="mimeType"
                class="el-col-lg-16 el-col-md-16 el-col-sm-18 el-col-xs-14"
              >
                <el-radio
                  label="mp3"
                  class="el-col-lg-12 el-col-md-12 el-col-sm-12 el-col-xs-12"
                >.mp3</el-radio>
                <el-radio
                  label="wav"
                  class="el-col-lg-12 el-col-md-12 el-col-sm-12 el-col-xs-12"
                >.wav</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="select_music">
            <div class="turn-on-music el-col-lg-5 el-col-md-5 el-col-sm-6 el-col-xs-24">
              <span>Nhạc nền:</span>
              <el-switch
                v-model="backgroundMusic"
                active-color="#2593FB"
                inactive-color="#c4c4c4"
                @change="handlChangeUsedSoundBackground"
              ></el-switch>
              <span v-if="backgroundMusic" style="padding-left: 10px">Bật</span>
              <span v-else style="padding-left: 10px">Tắt</span>
            </div>
            <div class="btn-select-library el-col-lg-5 el-col-md-5 el-col-sm-7 el-col-xs-12">
              <el-button
                class="btn-select-music"
                :disabled="!backgroundMusic"
                @click="showDialogSelectAudio"
              >Chọn từ thư viện</el-button>
              <div class="name-music" v-show="nameAudio != ''">
                {{nameAudio}}
                <el-button class="icon-check" icon="el-icon-check"></el-button>
                <el-button
                  icon="el-icon-close"
                  @click="dialogConfirmDeleteMusic = true"
                  class="delete_music"
                ></el-button>
              </div>
            </div>
            <div class="btn-select-local el-col-lg-5 el-col-md-5 el-col-sm-7 el-col-xs-12">
              <el-upload
                class="upload-demo"
                name="file"
                ref="upload"
                accept=".mp3, .wav"
                :headers="uploadHeader"
                :data="uploadData"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="100"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="true"
                :file-list="fileList"
                :disabled="false"
              >
                <el-button :disabled="!backgroundMusic" size="small" type="primary">Chọn từ máy</el-button>
              </el-upload>
            </div>
            <div class="select-volume el-col-lg-9 el-col-md-9 el-col-sm-24 el-col-xs-24">
              <p class="el-col-md-12 el-col-sm-12 el-col-xs-12">Âm lượng nhạc:</p>
              <el-slider
                v-model="volumn"
                @change="handleChangeSoundVolumn"
                :disabled="false"
                class="el-col-md-12 el-col-sm-12 el-col-xs-12"
                :min="0"
                :max="100"
                :step="1"
              ></el-slider>
            </div>
          </div>
          <div class="dictionary" style="display: none;">
            <div class="title-dictionary el-col-md-5 el-col-sm-6 el-col-xs-24">
              <p>Từ điển cách đọc:</p>
              <i>(không bắt buộc)</i>
            </div>
            <div class="select-dictionary el-col-md-5 el-col-sm-7 el-col-xs-12">
              <i class="el-icon-question"></i>
              <el-select v-model="dictionary_select" placeholder="Từ điển chung">
                <el-option
                  v-for="item in dictionarySelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
            <div class="view-detail el-col-md-5 el-col-sm-7 el-col-xs-12">
              <button :style="{'cursor': 'pointer'}">
                <a href="#" target="_blank">Xem chi tiết</a>
              </button>
            </div>
          </div>
          <div class="try-listening text-center">
            <el-button v-loading="tryListen" @click="handleTryListening">
              Nghe thử
              <i class="fa fa-volume-down"></i>
            </el-button>
          </div>
        </div>
        <div class="box-right">
          <div class="book-name">
            <p class="title">Tên sách</p>
            <p>
              <b>{{ book.name ? book.name : 'UNKNOWN'}}</b>
            </p>
          </div>
          <div class="author">
            <p class="title">Tác giả</p>
            <p>
              <b>{{ book.author ? book.author : 'UNKNOWN' }}</b>
            </p>
          </div>
          <div class="public-year">
            <p class="title">Năm xuất bản</p>
            <p>
              <b>{{ book.publicYear ? book.publicYear : 'UNKNOWN' }}</b>
            </p>
          </div>
          <div class="header-number">
            <p class="title">Số chương/phần</p>
            <p>
              <b>{{ book.chapters.length }}</b>
            </p>
          </div>
          <div class="file-sale">
            <p class="title">Số file đã tách</p>
            <p>
              <b>{{ 0 }}</b>
            </p>
          </div>
        </div>
      </div>
      <div class="step4__footer">
        <p class="pl-3">
          <i>
            <small>* Yêu cầu của bạn sẽ được hệ thống xử lý theo thời gian chờ tương ứng với gói cước đang sử dụng. File audio sẽ được trả về tại Thống kê sách</small>
          </i>
        </p>
      </div>

      <!-- dialog 1 -->
      <el-dialog
        :visible.sync="dialogConfirmDeleteMusic"
        width="30%"
        custom-class="dialog-delete-music"
      >
        <div>Bạn có chắc muốn xóa file: {{nameAudio}}</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogConfirmDeleteMusic = false">Hủy</el-button>
          <el-button type="primary" @click="removeBackgroundMusic">Xác nhận</el-button>
        </div>
      </el-dialog>

      <!-- dialog 2 -->
      <el-dialog
        title="Chọn nhạc nền"
        class="dialog-music"
        :visible.sync="dialogSelectMusic"
        :close-on-click-modal="false"
        width="50%"
      >
        <audio
          ref="audioBackgroundSrc"
          id="idAudio"
          preload="auto"
          :src="audioBackgroundSrc"
          autoplay
        ></audio>
        <el-table :data="listAudio" style="width: 100%" v-loading="isLoadingAudio">
          <el-table-column label="STT" width="55" class-name="stt" type="index" align="center"></el-table-column>
          <el-table-column prop="name" label="Tên"></el-table-column>
          <el-table-column label="Nghe Thử" align="center" width="150">
            <template slot-scope="scope">
              <el-button ref="btnPlay" @click="handleStartListentTest(scope.row.link_file)">
                Nghe thử
                <i
                  v-if="scope.row.link_file === audioBackgroundSrc"
                  class="el-icon-video-pause"
                ></i>
                <i v-else class="el-icon-video-play"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="Chọn" align="center" width="150">
            <template slot-scope="scope">
              <el-radio v-model="radioAudio" :label="scope.row.link_file">{{''}}</el-radio>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>listQuery.limit"
          :autoScroll="autoScroll"
          :layout="paginationLayout"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getAudioTemplate"
        />
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="acceptAudioBackground">Xác nhận</el-button>
          <el-button type="danger" @click="dialogSelectMusic=false">Hủy</el-button>
        </div>
      </el-dialog>

      <!-- dialog audio -->
      <el-dialog
        title="Nghe thử"
        :visible.sync="dialogTryListen"
        width="30%"
        center
        @close="handleStopAudio"
      >
        <!-- audio -->
        <audio ref="audioTest" id="idAudio" preload="auto" autoplay controls>
          <source :src="audioTest" type="audio/mpeg" />
        </audio>
      </el-dialog>
    </div>
    <div class="row mt-5 pb-5">
      <div class="col text-right">
        <el-button @click="gotoNextStep(3)">Quay lại</el-button>
        <el-button type="warning" @click="handleSendRequest">Gửi yêu cầu</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Step4",
  components: {
    Pagination
  },
  data() {
    return {
      voiceSelect: "",
      voices: [],
      bitRate: "",
      mimeType: "",
      backgroundMusic: false,
      speedVoice: 0,
      nameAudio: "",
      dialogConfirmDeleteMusic: false,
      uploadHeader: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: "Bearer " + getToken()
      },
      uploadData: {
        type: "audio",
        folder_name: "music"
      },
      fileList: [],
      volumn: 30,
      dictionary_select: "",
      dialogSelectMusic: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableListMusic: [],
      audioBackgroundSrc: "",
      autoScroll: false,
      paginationLayout: "total, prev, pager, next",
      tryListen: false,
      audioTest: null,
      dialogTryListen: false,
      listAudio: [],
      isLoadingAudio: false,
      radioAudio: "",
      isStartTryBg: false,
      backgroundMusicAccept: "",
      isChangeProperty: false
    };
  },
  watch: {
    speedVoice: function(value) {
      this.isChangeProperty = true;
      this.$store.dispatch("book/updateRate", value);
    },
    volumn: function(value) {
      this.isChangeProperty = true;
      this.$store.dispatch("book/updateSoundVolumn", value);
    },
    voiceSelect: function(value) {
      this.isChangeProperty = true;
      this.$store.dispatch("book/updateVoiceBook", value);
    },
    mimeType: function(value) {
      this.isChangeProperty = true;
      this.$store.dispatch("book/updateMimeTypeBook", value);
    },
    backgroundMusic: function(value) {
      this.isChangeProperty = true;
      this.$store.dispatch("book/updateUsedSoundBackground", value);
    },
    bitRate: function(value) {
      this.isChangeProperty = true;
      this.$store.dispatch("book/updateBitRate", value);
    }
  },
  methods: {
    removeBackgroundMusic() {
      this.dialogConfirmDeleteMusic = false;
      this.nameAudio = "";
    },
    handleRemove(file) {
      this.uploadPath = null;
    },
    beforeRemove(file) {
      return this.$confirm(`Bạn muốn xoá file ${file.name} ?`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`Qúa số file quy định`);
    },
    handleUploadSuccess(response, file, fileList) {
      if (file.size > 2097152) {
        this.nameAudio = "";
        this.uploadPath = "";
        this.nametmpAudio = "";
        this.handleRemove(file);
        this.fileList = [];
        fileList = [];
        this.$message.error("Kích thước file không được quá 2Mb !");
        return false;
      } else {
        if (response.status_code !== 0) {
          this.fileList = [];
          this.$message.warning(`${response.message}`);
        } else {
          fileList = [];
          this.fileList = [{ name: file.name }];
          this.uploadPath = response.data.path_audio;
          this.removeBackgroundMusic();
        }
      }
    },
    handleUploadError(err, file, fileList) {
      console.log(err);
    },
    checkVoice() {
      if (!this.voiceSelect) {
        this.$notify({
          type: "error",
          message: "Bạn chưa chọn giọng đọc",
          offset: 50
        });
        return false;
      }
      return true;
    },
    checkContentBook() {
      const { content } = this.book;
      if (!content || content === "") {
        this.$notify({
          type: "error",
          message: "Không tìm thấy nội dung sách",
          offset: 50
        });
        return false;
      }
      return true;
    },
    checkVolume() {
      if (!this.volumn || (this.volumn < 0 || this.volumn > 100)) {
        this.$notify({
          type: "error",
          message: "Bạn chưa chọn âm lượng",
          offset: 50
        });
        return false;
      }
      return true;
    },
    checkBiRate() {
      if (!this.bitRate) {
        this.$notify({
          type: "error",
          message: "Bạn chưa chọn chất lượng audio",
          offset: 50
        });
        return false;
      }
      return true;
    },
    checkBackgroundMusic() {
      if (this.backgroundMusic && !this.backgroundMusicAccept) {
        this.$notify({
          title: "Lỗi",
          type: "error",
          message: "Bạn chưa chọn nhạc nền",
          offset: 40
        });
        return false;
      }
      return true;
    },
    checkAudioType() {
      if (!this.mimeType || this.mimeType === "") {
        this.$notify({
          type: "error",
          message: "Bạn chưa chọn định dạng file audio",
          offset: 50
        });
        return false;
      }
      return true;
    },
    async handleTryListening() {
      this.tryListen = true;
      if (this.audioTest && !this.isChangeProperty) {
        this.dialogTryListen = true;
        this.tryListen = false;
        return;
      }
      if (
        !this.checkVoice() ||
        !this.checkVolume() ||
        !this.checkContentBook() ||
        !this.checkBiRate() ||
        !this.checkAudioType() ||
        !this.checkBackgroundMusic()
      ) {
        this.tryListen = false;
        return;
      }
      const { content } = this.book;

      const textTest =
        content.length > 1000 ? content.substr(0, 1000) : content;
      try {
        const options = {
          voice: this.voiceSelect,
          text: textTest,
          rate: this.speedVoice,
          bit_rate: this.bitRate,
          volume_music: this.volumn,
          audio_type: this.mimeType
        };

        if (this.backgroundMusic) {
          options.background_music_link = `https://cp.aicallcenter.vn/${this.backgroundMusicAccept}`;
        }
        const { status, data } = await axios({
          method: "POST",
          url: "http://localhost:8888/api/v1/tts/convert",
          data: options
        });
        if (status === 200) {
          const {
            result: { link }
          } = data;
          this.dialogTryListen = true;
          this.audioTest = link;

          this.tryListen = false;
          this.isChangeProperty = false;

          this.$nextTick(() => {
            const audio = this.$refs.audioTest;
            audio.src = this.audioTest;
          });
        }
      } catch (error) {
        console.log(error.message);
        this.$notify({
          title: "Convert thất bại",
          type: "error",
          message: "Vui lòng kiểm tra lại",
          offset: 40
        });
        this.tryListen = false;
      }
    },
    handleStopAudio() {
      const audio = this.$refs.audioTest;
      audio.pause();
    },
    handleStopBgAudio() {
      const audio = this.$refs.audioBackgroundSrc;
      audio.pause();
    },
    disableUpload: function() {
      if (this.backgroundMusic) {
        return false;
      }
      return true;
    },
    acceptAudioBackground() {
      if (!this.radioAudio || this.radioAudio === "") {
        this.$notify({
          type: "error",
          message: "Bạn chưa chọn nhạc nền",
          offset: 50
        });
        return;
      }

      this.backgroundMusicAccept = this.radioAudio;
      this.dialogSelectMusic = false;
      this.$store.dispatch(
        "book/updateSoundBackground",
        `https://cp.aicallcenter.vn/${this.backgroundMusicAccept}`
      );
      this.handleStopBgAudio();
    },
    getAudioTemplate() {},
    gotoNextStep(step) {
      this.$emit("handleNextStep", step);
    },
    hanleChangeVoice(value) {
      this.voiceSelect = value;
      this.$store.dispatch("book/updateVoiceBook", value);
    },
    handleChangeBitRate(value) {
      this.bitRate = value;
      this.$store.dispatch("book/updateBitRate", value);
    },
    handlChangeUsedSoundBackground(value) {
      this.backgroundMusic = value;
      this.$store.dispatch("book/updateUsedSoundBackground", value);
    },
    handleChangeSoundVolumn(value) {
      this.volumn = value;
      this.$store.dispatch("book/updateSoundVolumn", value);
    },
    handleSendRequest() {
      // update property book
      this.onUpdatePropertyBook();
      // convert book return file audio
      this.onConvertBook();
    },
    handleStartListentTest(link) {
      if (this.isStartTryBg && this.audioBackgroundSrc === link) {
        this.audioBackgroundSrc = null;
        this.isStartTryBg = false;

        let audio = this.$refs.audioBackgroundSrc;
        audio.src = this.audioBackgroundSrc;
        audio.pause();
        return;
      }

      this.audioBackgroundSrc = link;
      this.isStartTryBg = true;

      let audio = this.$refs.audioBackgroundSrc;
      audio.src = this.audioBackgroundSrc;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            audio.pause();
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
          });
      }
    },
    loadInfoBook() {
      const {
        voice,
        rate,
        bitRate,
        mimeType,
        soundBackground,
        usedSoundBackground,
        soundBackgroundVolumn
      } = this.book;

      this.voiceSelect = voice;
      this.mimeType = mimeType;
      this.volumn = soundBackgroundVolumn;
      this.speedVoice = rate;
      this.backgroundMusic = usedSoundBackground;
      this.bitRate = bitRate;
    },
    async loadVoicesActive() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        const { status, data } = await axios({
          type: "GET",
          method: "GET",
          url: "http://localhost:8888/api/v1/voices"
        });
        if (status === 200) {
          const { result } = data;

          this.voices = result;
          setTimeout(() => {
            loading.close();
          }, 500);
        }
      } catch (error) {
        console.log(error.message);
        this.voices = [];
      }
    },
    async onUpdatePropertyBook() {
      try {
        const {
          id,
          voice,
          bitRate,
          rate,
          usedSoundBackground,
          soundBackground,
          soundBackgroundVolumn,
          mimeType
        } = this.book;
        if (!id) {
          this.$notify({
            type: "error",
            message: "Không tìm thấy thông tin sách của bạn",
            offset: 50
          });
          return;
        }
        if (
          !this.checkVoice() ||
          !this.checkVolume() ||
          !this.checkContentBook() ||
          !this.checkBiRate() ||
          !this.checkAudioType() ||
          !this.checkBackgroundMusic()
        ) {
          return;
        }

        const options = {
          bit_rate: bitRate,
          rate,
          used_sound_background: usedSoundBackground,
          sound_background_volumn: soundBackgroundVolumn,
          audio_type: mimeType,
          voice_id: voice,
          sound_background: soundBackground
        };
        const { data, status: statusCode } = await axios({
          method: "PUT",
          url: `${this.domain}books/${id}`,
          data: options
        });

        if (statusCode !== 200) {
          this.$notify.error({
            title: "Lỗi",
            message: "Cập nhật thông tin sách thất bại",
            offset: 50
          });
          return;
        }

        const { status } = data;
        if (status === 1) {
          this.$notify.success({
            title: "Thành công",
            message: "Cập nhật thông tin sách thành công",
            offset: 50
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    onConvertBook() {
      this.$notify({
        title: "Thông báo",
        type: "warning",
        message: "Sách của bạn đang được convert ...",
        position: "bottom-right"
      });
    },
    async showDialogSelectAudio() {
      this.dialogSelectMusic = true;

      if (this.listAudio.length <= 0) {
        try {
          this.isLoadingAudio = true;
          const { status, data } = await axios({
            type: "GET",
            method: "GET",
            url: "http://localhost:8888/api/v1/audios"
          });
          if (status === 200) {
            const { result } = data;

            this.listAudio = result;
            setTimeout(() => {
              this.isLoadingAudio = false;
            }, 1000);
          }
        } catch (error) {
          console.log(error.message);
          this.listAudio = [];
        }
      }
    }
  },
  computed: {
    dictionarySelect: function() {
      const me = this;
      const arr = [];
      const dict = me.dictionary;
      for (const key in dict) {
        let obj = {};
        if (dict.hasOwnProperty(key)) {
          obj = {
            label: dict[key].name,
            value: dict[key]._id,
            app_id: dict[key].app_id
          };
          arr.push(obj);
        }
      }
      const dict1 = me.dict_default;
      for (const key in dict1) {
        let obj = {};
        if (dict1.hasOwnProperty(key)) {
          obj = {
            label: dict1[key].name,
            value: dict1[key]._id,
            app_id: dict1[key].app_id
          };
          arr.push(obj);
        }
      }
      me.dictionary_select = arr[0];
      return arr;
    },
    ...mapGetters(["book", "domain"])
  },
  mounted() {
    this.loadVoicesActive();
    this.loadInfoBook();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "./styles/_step4.scss";
</style>