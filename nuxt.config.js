const { resolve } = require("path");
require("dotenv").config();

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    credentials: false,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/img/headphones.svg" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      }
    ],
    script: [
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
      },
      { src: "https://code.jquery.com/jquery-3.3.1.slim.min.js" },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
      }
    ]
  },
  env: {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.VUE_APP_BASE_URL
        : "http://localhost:8888"
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  router: {
    middleware: "before-router",
    extendRoutes(routes, resolve) {
      routes.push({
        name: "custom",
        path: "*",
        component: resolve(__dirname, "pages/404.vue")
      });
    }
  },
  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css", "@/assets/styles/index.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/svg-icon",
    "@/plugins/bootstrap-vue.js",
    "@/plugins/performance-nuxt.js",
    {
      src: "~/plugins/highcharts.js",
      ssr: true
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  /**
   * Authen
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/login",
            method: "POST",
            propertyName: "token"
          },
          logout: {
            url: "/auth/logout",
            method: "POST"
          },
          user: false
        },
        tokenRequired: true,
        tokenType: false
      },
      watchLoggedIn: true,
      redirect: {
        login: "/login",
        logout: "/login",
        callback: "/login",
        home: "/"
      },
      cookie: false,
      localStorage: false,
      token: {
        prefix: "token."
      }
    }
  },
  axios: {
    baseURL: `${process.env.VUE_APP_BASE_URL}/api/v1`,
    credentials: true
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test(".svg"));
      svgRule.exclude = [resolve(__dirname, "assets/icons/svg")];

      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [resolve(__dirname, "assets/icons/svg")], //将存放svg的目录加入到loader处理目录
        use: [
          { loader: "svg-sprite-loader", options: { symbolId: "icon-[name]" } }
        ]
      });
    }
  }
};
