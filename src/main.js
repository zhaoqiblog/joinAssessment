// 引入 Vue
import Vue from 'vue'

// 引入Solo及css
import Solo from 'solojs'
import 'solojs/solo.css'

// 引入kkjs
import kk from 'kkjs'

// 引入 vue-resource 负责 ajax 数据请求
//  参考文档 https://github.com/pagekit/vue-resource
import VueResource from 'vue-resource'

import Pages from './pages/pages'
import { ToastPlugin } from 'vux'
// 引入 fastclick， 解决移动设备上点击延迟的问题
const FastClick = require('fastclick')

FastClick.attach(document.body)
Vue.use(VueResource)
Vue.use(Solo)
Vue.use(ToastPlugin)
// 如果接口服务器只能处理 application/x-www-form-urlencoded 格式的请求数据，则需要将 emulateJSON 设置为 true
Vue.http.options.emulateJSON = true

kk.config('detailLog', true)
// // 辉信上使用
Vue.http.interceptors.push(kk.proxy.vueInterceptor)

// 对所有ajax请求进行统一设置
Vue.http.interceptors.push((request, next) => {
  request.url = '/oaapp/yh/evaluate/yh_evaluate_main' + request.url
  // request.header.set('Cookie', 'Ltpat')
  // const queryData = Solo.utils.getQueryData(request.url.split('?')[1])
  // let url = 'mock/'
  // if (queryData.method === 'getEvaluationInfo') {
  //   url += queryData.type === 'wating' ? 'list.json' : 'allList.json'
  // }
  // if (queryData.method === 'getGuarantor') {
  //   url += 'account.json';
  // }
  // url = 'http://10.67.29.162:3001/' + url
  // request.url = url
  console.log(request.url);
  next()
});

window.kk = kk

// 启动应用
Solo.start({
  pages: Pages,
  beforeLaunch () {
    kk.app.hideTitleBar()
  },
  // 默认页面
  enterPage: 'home',
  kk: kk
})
