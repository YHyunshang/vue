<template>
	<div>
	 <p class="add"> 欢迎使用{{date}} </p>
	<img class='imgDIV' src="./images/nameimg1.png" alt="" @click="pageClick">
	</div>
</template>
<script>
import Vue from 'vue'
// import api from './public/api'
// import bus from './public/bus.js'
import Pint4 from './component/page1/point4'

let pagepoint1 = Vue.extend(Pint4)
let pageDom
let pagePint = (options) => {
  pageDom = new pagepoint1({
    data: options
  })
  pageDom.vm = pageDom.$mount()
  document.body.appendChild(pageDom.vm.$el)
  return pageDom.vm
}

export default {
  name: 'Natc',
  data () {
    return {
      date: 'vue'
    }
  },
  methods: {
    pageClick () {
      pagePint({options: Math.floor(Math.random() * 10)})
    }
  }
}
</script>
<style type="text/css">
	.add{
		margin-top: 20%;
		color: #989768;
		text-align: center;
		font-size: 12px;
	}
	.imgDIV{
		width: 60%;
		display: block;
		margin:0px auto;
		border-radius: 3px;
	}
</style>