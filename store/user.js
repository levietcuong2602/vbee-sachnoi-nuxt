import { getToken, setToken, removeToken } from "@/utils/auth";

const state = () => ({
  token: getToken(),
  name: "",
  avatar: "",
  userId: "1",
  phoneNumber: "",
  email: "",
  fullName: "",
  city: ""
});

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_PHONE_NUMBER: (state, phone) => {
    state.phoneNumber = phone;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
  SET_FULL_NAME: (state, fullName) => {
    state.fullName = fullName;
  },
  SET_CITY: (state, city) => {
    state.city = city;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },
  setPhoneNumber({ commit }, phone) {
    commit("SET_PHONE_NUMBER", phone);
  },
  setEmail({ commit }, email) {
    commit("SET_EMAIL", email);
  },
  setFullName({ commit }, fullName) {
    commit("SET_FULL_NAME", fullName);
  },
  setCity({ commit }, city) {
    commit("SET_CITY", city);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
