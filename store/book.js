const state = () => ({
  content: "",
  name: "",
  author: "",
  publicYear: ""
});
const mutations = {
  LOAD_CONTENT_BOOK: (state, content) => {
    state.content = content;
  },
  LOAD_INFO_BOOK: (state, { name, author, publicYear }) => {
    state.name = name;
    state.author = author;
    state.publicYear = publicYear;
  }
};
const actions = {
  loadContentBook({ commit }, content) {
    commit("LOAD_CONTENT_BOOK", content);
  },
  loadInfoBook({ commit }, bookInfo) {
    commit("LOAD_INFO_BOOK", bookInfo);
  }
};
export default {
  state,
  mutations,
  actions
};
