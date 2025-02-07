import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import AutoImport from "unplugin-auto-import/vite"; // 引入插件
import px2rem from "postcss-plugin-px2rem";

import { resolve } from "path";

const px2remOptions = {
  rootValue: 19.2, //换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
  unitPrecision: 5, //允许REM单位增长到的十进制数字，其实就是精度控制
  // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
  // propBlackList: [], // 黑名单
  // exclude:false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  // selectorBlackList: [], //要忽略并保留为px的选择器
  // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
  // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
  mediaQuery: false, //（布尔值）允许在媒体查询中转换px
  minPixelValue: 0, //设置要替换的最小像素值(3px会被转rem)。 默认 0
};

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: "types/auto-imports.d.ts", // 这里是生成的global函数文件
      imports: ["vue", "vue-router"], // 需要自动导入的插件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // 解决eslint报错问题
      eslintrc: {
        // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
        enabled: false,
        filepath: "./.eslintrc-auto-import.json", // 生成的文件路径
        globalsPropValue: true,
      },
    }),
  ],
  //解决“vite use `--host` to expose”
  base: "/large/",
  // server: {
  //   host: '0.0.0.0',
  //   port: 8080,
  //   open: true
  // },
  server: {
    open: true,
    port: 8088,
    proxy: {
      "/api": {
        target: "http://192.168.2.192:8080", // 目标服务
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer, px2rem(px2remOptions)],
    },
  },
});
