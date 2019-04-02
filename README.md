## 常用命令
1. 启动项目
```bash
npm run dev :test环境
npm run build :生产环境
```

## 代码规范
### 页面模块结构
- 请遵守eslint书写规范

```text
--- <your_page_name>
|-- index.js
|-- <your_page_name>.vue
|-- <your_page_name>.less
|-- components
|---- <component_only_for_this_page>.vue
|---- <component_only_for_this_page>.less
```
- index.js 中导出该模块的页面组件
- <your_page_name>.vue 页面组件，.less 对应其样式
- components 文件夹下放置该模块私有的组件
- 每个`.vue`组件独立对应一个同名的`.less`文件，两个合起来构成了一个 VUE 组件

### css class
1. 使用中划线命名法，如：`indicator-text`
2. 公共组件命名规则：`comp__<compName>[__<compElement>]`，如 `comp__panel__tips` 表示 Panel 公用组件的 tips 块

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
<el-input icon="my-xxx" />
```
3. 自定义组件触发事件时注意事件名加动词，如
```js
this.$emit('timeChange', currentTime, oldTime)
```
4. 自定义组件的 props 推荐使用中划线分割，如
```html
<el-switch v-model="value4" on-text="" off-text="" disabled />
```
5. 推荐组件的每个 props 单独占一行，如
```html
<el-switch
  v-model="value4"
  on-text=""
  off-text=""
  disabled />
```


## MOCK 数据

采用 [RAP](http://rapapi.yonghui.cn) 上的 mock api

如果需要 mock 数据，在你的 API 前面加上 `/MOCK` 即可

**!! IMPORTANT !!**

***记得在上线前去除你的 api mock 前缀，不过 production 环境下 api.js 会自动帮你去掉该前缀***


## 目录结构说明
```
vue 基建项目gutlap下载地址： http://10.0.71.125/xuansb/vue-cli-xuan.git
项目可选择UI库为：element-ui

├─ build # webpack配置资源地
├─ config # webpack配置资源地
├─ node_modules # 利用npm管理的所有包及其依赖
├─ dev # 打包后文件
├─ test # 测试地址
├─ src
	├─ images # 静态图片存放地区
	├─ component 模块
		├─ page 页面
	├─ public # 公共资源
		├─ api 
	├─ router # 路由存放地区
	├─ vuexDate.js # vuex数据使用地
	├─ main.js # 入口文件
├─ babelrc # 启动依耐包
├─ packge.json # 启动配置
├─ theme # element-ui自定义配置项

- [公用组件](./src/public/components/README.md)

- [公用指令](./src/public/directives/README.md)

- [公用 Mixin](./src/public/mixins/README.md)

- [公共 css class](./src/public/style/README.md)
```

## Element 主题的定制
```
`element-variables.css` 文件是官方的定制主题文件，在此修改变量后执行 `./node_modules/.bin/@et` 生成主题。

如果以上文件不满足需求，在 `./src/public/style/reset-element.less` 中覆盖样式。

覆盖时注意 less 定义的模块化、注释。2018
```