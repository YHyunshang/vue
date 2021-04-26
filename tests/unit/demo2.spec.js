
import Vue from 'vue'
import Demo from '../../src/views/demo2'

import { mount } from '@vue/test-utils'

import { demo2Config } from './config'

import testCommon from './test'

/*
测试文件的配置
  type: 测试的类型
  selector: 测试选取的元素选择器
  dataKey:  测试关联data中的key
  dataValue:  测试关联data中key的设置值
  defaultValue: 测试元素默认展示的内容
  targetValue:  测试元素需要对比的值 如果不设置则取用dataValue
  responceMock: 测试异步请求返回的虚拟值
*/
// const testConfig = [{
//   type: 'visible', // 测试是否出现此组建
//   selector: '.class', // 测试选中的元素选择器
//   dataKey: 'visible', // 测试元素是否展示对应的data中的key
//   dataValue: 'true/false', // 测试
//   defaultValue: false, // 测试元素展示默认的状态，如不设置，默认为false
// }, {
//   type: 'text', // 测试 组件中的文本
//   selector: '.class',
//   dataKey: 'test',  // 测试元素是否展示对应的data中的key
//   dataValue: 'test-text', // 测试元素是否展示对应的文本
//   defaultValue: 'default-text', // 测试元素默认展示的文本
// }, {
//   type: 'click', // 测试 点击交互事件
//   selector: '.class',
//   param: {}, // 事件需要传递的参数
// }]

// // 测试选中元素是否展示 包含v-if和v-show校验
// function testElementVisible(config) {
//   const { type, selector, dataKey, defaultValue = true, dataValue = false, component } = config
//   const visibleType = {
//     'v-show': 'isVisible',
//     'v-if': 'exists'
//   }
//   test(`element-${selector}-${type}-test`, async() => {
//     const wrapper = mount(component)
//       expect(wrapper.find(selector)[visibleType[type]]()).toBe(defaultValue)
//   })
//   test(`element-${selector}-${type}-test`, async() => {
//     const wrapper = mount(component, {
//       data() {
//         return {
//           [dataKey]: dataValue
//         }
//       }
//     })
//     expect(wrapper.find(selector)[visibleType[type]]()).toBe(dataValue)
//   })
// }
//
// // 测试选中元素展示文本
// function testElementText(config) {
//   const { type, selector, dataKey, defaultValue = 'default-text', dataValue = 'test-text', component } = config
//   test(`element-${selector}-${type}`, async() => {
//     const wrapper = mount(component, {
//       data() {
//         return {
//           [dataKey]: defaultValue
//         }
//       }
//     })
//     expect(wrapper.find(selector).text()).toContain(defaultValue)
//     wrapper.setData({[dataKey]: dataValue})
//     await Vue.nextTick()
//     expect(wrapper.find(selector).text()).toContain(dataValue)
//   })
// }
// // 元素测试
// function testComponent({component, list}) {
//   const testFuncs = {
//     'v-if': testElementVisible,
//     'v-show': testElementVisible,
//     text: testElementText
//   }
//   list.map(config => ({...config, component})).forEach(testUnit => {
//     testFuncs[testUnit.type](testUnit)
//   })
// }

testCommon(demo2Config)





// testElementVisible({
//   type: 'visible',
//   selector: '.element',
//   dataKey: 'visible'
// })
//
// testElementText({
//   type: 'text',
//   selector: '.title',
//   dataKey: 'title'
// })

// describe('test of demo2', () => {
//   test('target element is showed when loaded', () => {
//     const wrapper = mount(Demo)
//     expect(wrapper.find('.element').isVisible()).toBe(true)
//   })
//
//   test('target element is hidden when setted false', async() => {
//     const wrapper = mount(Demo)
//     wrapper.setData({ visible: false })
//     // wrapper.vm.$nextTick()
//     await Vue.nextTick()
//     expect(wrapper.find('.element').isVisible()).toBe(false)
//   })
//
//   test('target element text test', async() => {
//     const wrapper = mount(Demo)
//     const element = wrapper.find('.title')
//     expect(element.text()).toContain('标题')
//     wrapper.setData({title: 'test'})
//     await Vue.nextTick()
//     expect(element.text()).toContain('test')
//   })
// })
