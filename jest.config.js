
const { defaults } = require('jest-config');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'vue'], // 定义jest引用文件类型
  moduleNameMapper: { // 定义jest文件引用alias
    '@views/(.*)': '<rootDir>/src/views/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
  }
}
