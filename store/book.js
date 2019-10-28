const state = () => ({
  id: null,
  content: "",
  name: "",
  author: "",
  publicYear: "",
  file: null,
  chapters: [],
  voice: 0,
  rate: 0,
  bitRate: "",
  soundBackground: "",
  usedSoundBackground: false,
  soundBackgroundVolumn: 0
});
const mutations = {
  UPDATE_CONTENT_BOOK: (state, content) => {
    state.content = content;
  },
  UPDATE_INFO_BOOK: (
    state,
    {
      name,
      author,
      publicYear,
      id,
      rate,
      voice,
      bitRate,
      soundBackground,
      usedSoundBackground,
      soundBackgroundVolumn
    }
  ) => {
    state.name = name;
    state.author = author;
    state.publicYear = publicYear;
    state.id = id;
    state.rate = rate;
    state.voice = voice;
    state.bitRate = bitRate;
    state.soundBackground = soundBackground;
    state.usedSoundBackground = usedSoundBackground;
    state.soundBackgroundVolumn = soundBackgroundVolumn;
  },
  UPDATE_CHAPTER_BOOK: (state, chapters) => {
    state.chapters = chapters;
  },
  UPDATE_ID_BOOK: (state, id) => {
    state.id = id;
  },
  UPDATE_VOICE_BOOK: (state, voice) => {
    state.voice = voice;
  },
  UPDATE_BIT_RATE_BOOK: (state, bitRate) => {
    state.bitRate = bitRate;
  },
  UPDATE_RATE_BOOK: (state, rate) => {
    state.rate = rate;
  },
  UPDATE_SOUND_BACKGROUND: (state, soundBackground) => {
    state.soundBackground = soundBackground;
  },
  UPDATE_USED_SOUND_BACKGROUND: (state, usedSoundBackground) => {
    state.usedSoundBackground = usedSoundBackground;
  },
  UPDATE_SOUND_BACKGROUND_VOLUMN: (state, soundBackgroundVolumn) => {
    state.soundBackgroundVolumn = soundBackgroundVolumn;
  }
};
const actions = {
  updateContentBook({ commit }, content) {
    commit("UPDATE_CONTENT_BOOK", content);
  },
  updateInfoBook({ commit }, bookInfo) {
    commit("UPDATE_INFO_BOOK", bookInfo);
  },
  updateChapterBook({ commit }, chapters) {
    commit("UPDATE_CHAPTER_BOOK", chapters);
  },
  updateIdBook({ commit }, id) {
    commit("UPDATE_ID_BOOK", id);
  },
  updateVoiceBook({ commit }, voice) {
    commit("UPDATE_VOICE_BOOK", voice);
  },
  updateBitRate({ commit }, bitRate) {
    commit("UPDATE_BIT_RATE_BOOK", bitRate);
  },
  updateRate({ commit }, rate) {
    commit("UPDATE_RATE_BOOK", rate);
  },
  updateSoundBackground({ commit }, soundBackground) {
    commit("UPDATE_SOUND_BACKGROUND", soundBackground);
  },
  updateUsedSoundBackground({ commit }, usedSoundBackground) {
    commit("UPDATE_USED_SOUND_BACKGROUND", usedSoundBackground);
  },
  updateSoundBackgroundVolumn({ commit }, soundBackgroundVolumn) {
    commit("UPDATE_SOUND_BACKGROUND_VOLUMN", soundBackgroundVolumn);
  }
};
export default {
  state,
  mutations,
  actions
};
