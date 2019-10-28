const state = () => ({
  id: null,
  content: "",
  name: "",
  author: "",
  publicYear: "",
  file: null,
  chapters: []
});
const mutations = {
  UPDATE_CONTENT_BOOK: (state, content) => {
    state.content = content;
  },
  UPDATE_INFO_BOOK: (state, { name, author, publicYear, file, id }) => {
    state.name = name;
    state.author = author;
    state.publicYear = publicYear;
    state.file = file;
    state.id = id;
  },
  UPDATE_CHAPTER_BOOK: (state, chapters) => {
    state.chapters = chapters;
  },
  UPDATE_ID_BOOK: (state, id) => {
    state.id = id;
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
  }
};
export default {
  state,
  mutations,
  actions
};
