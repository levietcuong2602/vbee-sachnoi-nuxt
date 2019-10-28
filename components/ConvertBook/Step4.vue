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
              >{{ voice.label }}</el-radio>
            </el-radio-group>
          </div>
          <div class="format-quality-file">
            <div class="format-quality el-col-lg-8 el-col-md-8 el-col-sm-24 el-col-xs-24">
              <div class="title-format-quality el-col-lg-8 el-col-md-8 el-col-sm-8s el-col-xs-8">
                <span>Chất lượng:</span>
              </div>
              <el-radio-group
                v-model="qualitySelect"
                class="el-col-lg-16 el-col-md-16 el-col-sm-16 el-col-xs-16"
                @change="handleChangeBitRate"
              >
                <el-radio
                  :label="128"
                  class="el-col-lg-12 el-col-md-12 el-col-sm-12 el-col-xs-12"
                >128 kbps</el-radio>
                <el-radio
                  :label="320"
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
                v-model="extendSelect"
                class="el-col-lg-16 el-col-md-16 el-col-sm-18 el-col-xs-14"
              >
                <el-radio
                  :label="1"
                  class="el-col-lg-12 el-col-md-12 el-col-sm-12 el-col-xs-12"
                >.mp3</el-radio>
                <el-radio
                  :label="2"
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
                @click="dialogSelectMusic = true"
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
                v-model="volume"
                @change="handleChangeSoundBackgroundVolumn"
                :disabled="false"
                class="el-col-md-12 el-col-sm-12 el-col-xs-12"
                :min="0"
                :max="100"
                :step="1"
              ></el-slider>
            </div>
          </div>
          <div class="dictionary">
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
                <a href="/#/tts-cloud/tu-dien" target="_blank">Xem chi tiết</a>
              </button>
            </div>
          </div>
          <div class="try-listening text-center">
            <el-button>
              Nghe thử
              <i class="fa fa-volume-down"></i>
            </el-button>
          </div>
        </div>
        <div class="box-right">
          <div class="book-name">
            <p class="title">Tên sách</p>
            <p>
              <b>Những đứa con của sói</b>
            </p>
          </div>
          <div class="author">
            <p class="title">Tác giả</p>
            <p>
              <b>Hosoda Mamoru</b>
            </p>
          </div>
          <div class="public-year">
            <p class="title">Năm xuất bản</p>
            <p>
              <b>2012</b>
            </p>
          </div>
          <div class="header-number">
            <p class="title">Số chương/phần</p>
            <p>
              <b>4</b>
            </p>
          </div>
          <div class="file-sale">
            <p class="title">Số file đã tách</p>
            <p>
              <b>5</b>
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
        class="dialog-music"
        :visible.sync="dialogSelectMusic"
        :close-on-click-modal="false"
        width="50%"
      >
        <span slot="title">Chọn nhạc nền</span>
        <audio ref="audio" id="idAudio" :src="audioBackgroundSrc" preload="auto" autoplay></audio>
        <el-table :data="tableListMusic" style="width: 100%">
          <el-table-column prop="name" label="Tên" min-width="180"></el-table-column>
          <el-table-column label="Nghe Thử" align="center" width="140">
            <template slot-scope="scope">
              <el-button
                ref="btnPlay"
                :icon="(idPlay === scope.row.id) ? classStopped : classPlay"
                v-on:click="play(scope.row.path_audio, scope.row.id); audioBackgroundSrc = scope.row.path_audio; audioRef = scope.row.id"
                type="button"
              >Nghe thử</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="path_audio" label="Chọn" align="center" width="150">
            <template slot-scope="scope">
              <el-radio
                v-model="uploadPath"
                :label="scope.row.path_audio"
                @change="nametmpAudio = scope.row.name;idPlay = 0;playms.pause()"
              ></el-radio>
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
          <el-button type="primary" @click="apcceptfileAudio">Xác nhận</el-button>
          <el-button type="danger" @click="cancelDialogMusic">Hủy</el-button>
        </div>
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
      voices: [
        {
          value: "hn_male_xuantin_vdts_48k-hsmm",
          label: "Giọng nam Hà Nội (Mạnh Dũng)"
        },
        {
          value: "sg_female_xuanhong_vdts_48k-hsmm",
          label: "Giọng nữ Sài Gòn (Lan Trinh)"
        },
        {
          value: "sg_female_thaotrinh_dialog_48k-hsmm",
          label: "Giọng nữ Sài gòn (Thảo Trinh)"
        }
      ],
      qualitySelect: "",
      extendSelect: "",
      backgroundMusic: false,
      speedVoice: 0.5,
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
      volume: 50,
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
      paginationLayout: "total, prev, pager, next"
    };
  },
  watch: {
    speedVoice: function(value) {
      this.$store.dispatch("book/updateRate", value);
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
      // if (file.size > 2097152) {
      //   console.log('lôi');
      //   return;
      // }
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
    disableUpload: function() {
      if (this.backgroundMusic) {
        return false;
      }
      return true;
    },
    apcceptfileAudio() {
      this.dialogSelectMusic = false;
      this.fileList = [];
    },
    cancelDialogMusic() {
      this.dialogSelectMusic = false;
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
      this.qualitySelect = value;
      this.$store.dispatch("book/updateBitRate", value);
    },
    handlChangeUsedSoundBackground(value) {
      this.backgroundMusic = value;
      this.$store.dispatch("book/updateUsedSoundBackground", value);
    },
    handleChangeSoundBackgroundVolumn(value) {
      this.volume = value;
      this.$store.dispatch("book/updateSoundBackgroundVolumn", value);
    },
    handleSendRequest() {
      // update property book
      this.onUpdatePropertyBook();
      // convert book return file audio
    },
    async onUpdatePropertyBook() {
      const {
        id,
        voice,
        bitRate,
        rate,
        usedSoundBackground,
        soundBackground,
        soundBackgroundVolumn
      } = this.book;

      const { data, status: statusCode } = await axios({
        method: "PUT",
        url: `${this.domain}books/${id}`,
        data: {
          bit_rate: bitRate,
          rate,
          used_sound_background: usedSoundBackground,
          sound_background_volumn: soundBackgroundVolumn
        }
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
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "./styles/_step4.scss";
</style>