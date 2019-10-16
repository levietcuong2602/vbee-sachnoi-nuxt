const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  breadScrum: state => state.breadScrum,
  contentBook: state => state.book.content,
  nameBook: state => state.book.name,
  authorBook: state => state.book.author,
  publicYearBook: state => state.book.publicYear
};
export default getters;
