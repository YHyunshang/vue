# yh-vue-cli

这是永辉超市大科技前端vue项目模版。
项目通过vue-cli搭建，包含了eslint,sass,vue-router,jest...
项目中为定义ui组件，需开发团队根据项目需要自行引入。
项目中定义了组件的输入输出单元测试，可根据开发需要自行填充相关配置进行对应组件的测试。

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build

脚本：vue-cli-service build [options] [entry|pattern]

选项：

  --mode        指定环境模式 (默认值：production) 可以通过这个参数改变打包时的环境变量
  --dest        指定输出目录 (默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用
  --target      app | lib | wc | wc-async (默认值：app)
  --name        库或 Web Components 模式下的名字 (默认值：package.json 中的 "name" 字段或入口文件名)
  --no-clean    在构建项目之前不清除目标目录
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
项目中可能会使用到的工具推荐如下：

cli插件：
babel: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel
eslint: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint
unit-jest: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest

vue全家桶：
vue-router: https://router.vuejs.org
vuex: https://vuex.vuejs.org
vue-devtools: https://github.com/vuejs/vue-devtools#vue-devtools
vue-loader: https://vue-loader.vuejs.org
awesome-vue: https://github.com/vuejs/awesome-vue


## 项目部分代码规范
### JS
1. 采用小驼峰命名法，如 `dialogVisible`
2. 对于 Boolean 类型的变量，灵活使用 is、shall、able（如 visible、clickable）等
3. 禁止采用 A、B、C 等不明所以的单词作变量名
4. 事件回调函数加上 'handle' 前缀，如 `handleCurrentRowChange`
5. 导入 src 下的模块时不要使用绝对路径，推荐使用项目中定义的别名 `@`，注意`@`后加`/`，如 '@/public' 编译后为'src/public'
6. 推荐使用 lodash 模块进行对象合并等操作，而非 es6，后者可能有浏览器兼容性问题
7. html 字符串作为变量值时，注意文本的可视化与 html 的结构化，提高阅读性
8. 禁止父组件通过 $refs 直接调用子组件方法、修改数据！

### vue -- template
1. tag 统一使用中划线格式，如:
```html
<my-component />
```
2. 没有子元素的 tag 注意及时关闭，如
```html
<element icon="my-xxx" />
```
3. 自定义组件触发事件时注意事件名加动词，如
```js
this.$emit('timeChange', currentTime, oldTime)
```
4. 自定义组件的 props 推荐使用中划线分割，如
```html
<element v-model="value4" on-text="" off-text="" disabled />
```
5. 推荐组件的每个 props 单独占一行，如
```html
<element
  v-model="value4"
  on-text=""
  off-text=""
  disabled />
```
