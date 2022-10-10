import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
//@ts-ignore
import viteCompression from "vite-plugin-compression";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
// import pxtovw from "postcss-px-to-viewport";
// const basePxToVw = pxtovw({
//   viewportWidth: 375,
//   viewportUnit: "vw",
// });
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, __dirname);
  const ISDEV = ENV.VITE_APP_ENV !== "production";
  return {
    base: "./", //打包路径
    plugins: [
      vue(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        },
      },
      // 处理打包出现警告 "@charset" must be the first
      postcss: {
        plugins: [
          /* require('postcss-px-to-viewport-8-plugin')({
           * 2022年8月17日更新，使用require('postcss-px-to-viewport-8-plugin')引入
           * vite报错：error when starting dev server:Error:
           * Dynamic require of "postcss-px-to-viewport-8-plugin" is not supported
           * 故此改为postcsspxtoviewport8plugin({
           */
          postcsspxtoviewport8plugin({
            unitToConvert: "px", // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
            // viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度
            unitPrecision: 6, // 单位转换后保留的精度
            propList: [
              // 能转化为vw的属性列表
              "*",
            ],
            viewportUnit: "vw", // 希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            selectorBlackList: ["el-switch", "is-checked"], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。cretae
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          }),
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    //启动服务配置
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
      https: false,
      proxy: {},
      cors: true,
    },
    // 生产环境打包配置
    build: {
      // 公共路径(必须有的，不然打包css和js路径问题不加载)
      publicPath: "./",
      // 打包构建输出路径
      outDir: "dist",
      // 生成静态资源的存放路径
      assetsDir: "static",
      // 构建后是否生成 source map 文件
      sourcemap: ISDEV,
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 700,
      // 生产环境移除console
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: !ISDEV,
          drop_debugger: !ISDEV,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vlib: ["vue", "vue-router", "vuex"],
          },
        },
      },
    },
  };
});
