# 单元测试

## 项目中的单元测试通过unit-jest插件实现，主要可用于测试ui组件的展示与内容，通过配置，可批量测试页面。

## 项目中使用过程中如需使用单元测试功能，需要开发者配置对应的config。配置详情如下：
```
单元测试配置参数：
在 unit/config 下新增需要测试模块的配置项，配置详情如下：*为需要必传字段
```
{
  component: component, // 对应需要测试的组件
  list: [ // 组件需要测试的具体配置
    {
    * type: 'v-show', // 测试的类型 v-show测试元素是否展示 v-if测试元素是否渲染 text测试元素渲染的内容
    * selector: '.element', // 需要测试元素的选择器
    * dataKey: 'visible', // 需要测试内容的关联data中的key
      dataValue:  '', //测试关联data中key的设置值
      defaultValue: '', // 测试元素默认展示的内容
      targetValue: '', // 测试元素需要对比的值 如果不设置则取用dataValue
    }
  ]
}

```
可在config/index.js文件下引入配置文件，进行全局测试，也可以单独使用（通过修改npm脚本 test:single对应的文件路径）。

相关测试事例可参考demo.spec.js
```
