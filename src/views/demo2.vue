<template lang="html">
  <div class="demo1">
    <h2 class="title">{{title}}</h2>
    <p v-show="visible" class="element">visible comp</p>
    <p v-if="visible" class="if-element">visible comp</p>
    <div v-for="item in list">{{ item }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '标题',
      visible: true,
      list: []
    }
  },
  methods: {
    handleSwitch() {
      this.visible = !this.visible
    }
  }
}
</script>
