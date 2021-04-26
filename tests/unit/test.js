
import Vue from 'vue'

import { mount } from '@vue/test-utils'

// 测试选中元素是否展示 包含v-if和v-show校验
function testElementVisible(config) {
  const { type, selector, dataKey, defaultValue = true, dataValue = false, component } = config
  const visibleType = {
    'v-show': 'isVisible',
    'v-if': 'exists'
  }
  test(`element-${selector}-${type}-test`, async() => {
    const wrapper = mount(component)
      expect(wrapper.find(selector)[visibleType[type]]()).toBe(defaultValue)
  })
  test(`element-${selector}-${type}-test`, async() => {
    const wrapper = mount(component, {
      data() {
        return {
          [dataKey]: dataValue
        }
      }
    })
    expect(wrapper.find(selector)[visibleType[type]]()).toBe(dataValue)
  })
}

// 测试选中元素展示文本
function testElementText(config) {
  const { type, selector, dataKey, defaultValue = 'default-text', dataValue = 'test-text', component } = config
  test(`element-${selector}-${type}`, async() => {
    const wrapper = mount(component, {
      data() {
        return {
          [dataKey]: defaultValue
        }
      }
    })
    expect(wrapper.find(selector).text()).toContain(defaultValue)
    wrapper.setData({[dataKey]: dataValue})
    await Vue.nextTick()
    expect(wrapper.find(selector).text()).toContain(dataValue)
  })
}
// 元素测试
export default function testCommon({component, list}) {
  const testFuncs = {
    'v-if': testElementVisible,
    'v-show': testElementVisible,
    text: testElementText
  }
  list.map(config => ({...config, component})).forEach(testUnit => {
    testFuncs[testUnit.type](testUnit)
  })
}
