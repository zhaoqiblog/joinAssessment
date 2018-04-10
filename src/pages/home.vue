<template class="container">
  <page>
    <page-header class="wrap-head" :title="pageTitle" :showBack="true" slot="header" @on-click-back="toBack">
      <template slot="header-right">
        <a class="head-link" @click="gotoAccount" slot="right">联保关系</a>
      </template>
    </page-header>
    <page-footer class="wrap-foot">
      <template slot="footer-content">
        <tabbar class="tabbar-h">
          <tabbar-item @on-item-click="togglePage('todo')" selected>
            <img v-show="todoIcon" slot="icon" src="../assets/tab_assess_on.png">
            <img v-show="!todoIcon" slot="icon" src="../assets/tab_assess_off.png">
            <span slot="label">待测评<badge v-show="todoSum" :text="todoSum"></badge></span>
          </tabbar-item>
          <tabbar-item @on-item-click="togglePage('done')" >
            <img v-show="doneIcon" slot="icon" src="../assets/tab_record_on.png">
            <img v-show="!doneIcon" slot="icon" src="../assets/tab_record_off.png">
            <span slot="label">测评记录</span>
          </tabbar-item>
        </tabbar>
      </template>
    </page-footer>
    <page-content>
      <div class="wrapper-main" v-show="!isEmpty">
        <div class="multi-head" v-show="isShow">
          <icon type="info"></icon>请于{{fdEndTime | formatDate}}前完成互评
        </div>
        <!-- 页面中使用 Group 和 Cell 组件 -->
        <div class="cell-group-box" v-for="(list, i) in lists" :key="i" :class="{'multi-group': Object.keys(lists).length > 1}">
          <div class="cell-group-head">
            <div class="cell-group-title">{{quarterStr(i)}}</div>
            <span class="cell-arrow" @click="toggleShow($event)"></span>
          </div>
          <group class="group">
            <cell
              class="cell-group-item"
              is-link
              v-for="item in list"
              v-if="item.fdStatus == 0 || item.fdStatus == 1"
              @click.native="gotoTestPage(item.fdStatus, item.fdEvaluateId)"
              :key="item.fdRatedId"
              :title="item.fdRatedName+'(' + item.fdNo + ')'"
              :value="currentSta(item.fdStatus)"
            ></cell>
            <cell
              class="cell-group-item"
              v-for="item in list"
              v-if="item.fdStatus == 2 || item.fdStatus == 3 || item.fdStatus == 4 || item.fdStatus == 5 || item.fdStatus == 6"
              :key="item.fdRatedId"
              :title="item.fdRatedName+'(' + item.fdNo + ')'"
              :value="currentSta(item.fdStatus)"
            ></cell>
          </group>
        </div>
      </div>
      <div class="wrapper-empty" v-show="isEmpty">
        <div class="wrapper-empty-cell">
        	<div id="appss">
        		测试测评
        	</div>
          <img src="../assets/pic_default@2x.png" alt="">
          <div class="wrapper-empty-info">您还没有{{type=="todo" ? "待测评":"测评记录" }}的信息呢</div>
        </div>
      </div>
    </page-content>
    <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '60%', 'background-color': 'transparent'}" @on-hide="popupImgHide()">
        <div class="dlg-content">
          <p class="dlg-head">
            <img :src="popupImg">
          </p>
          <img class="dlg-close" src="../assets/popup_close.png" alt="" @click="showDialogStyle = false">
          <!--<x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>-->
        </div>
      </x-dialog>
    </div>
  </page>
</template>

<script>
  import Solo from 'solojs'
  import { Group, Cell, XHeader, XButton, Tabbar, TabbarItem, Badge, Icon, XDialog, TransferDomDirective as TransferDom, cookie } from 'vux'

  export default {
    extends: Solo.Page,
    directives: {
      TransferDom
    },
    components: { // 注册 Group 和 Cell 到页面当中
      Group,
      Cell,
      XHeader,
      XButton,
      Tabbar,
      TabbarItem,
      Badge,
      Icon,
      XDialog,
      cookie
    },
    data () {
      return {
        evaluateId: '',
        isShow: true,
        isEmpty: true,
        todoLists: {},
        doneLists: {},
        type: 'todo', // todo, done,
        todoIcon: true,
        doneIcon: false,
        showDialogStyle: false,
        todoSum: 0,
        fdEndTime: '',
        toDown: false,
        popupImg: ''
      }
    },
    computed: {
      lists () {
        return this.type === 'todo' ? this.todoLists : this.doneLists
      },
      pageTitle () {
        return this.type === 'todo' ? '互联测评' : '测评记录';
      }
    },
    filters: {
      formatDate (value) {
        if (!value) return ''
        value = value.toString()
        return value.substr(0, 10);
      }
    },
    watch: {
      todoLists (obj) {
        var count = 0;
        if(obj.length==0)return false;
        var index = Object.keys(obj)[0];
        console.log(obj);
        for(var n in obj){
          count += obj[n].length;
        }
        this.todoSum = count;
        this.fdEndTime = obj[index][0].fdEndTime;
      }
    },
    created () {
      this.getPic();
      this.reload();
      //console.log(kk.app.getUserInfo());
//      setTimeout(() => {
//        this.showDialogStyle = true;
//      }, 500)
    },
    methods: {
      getPic () {
        if(cookie.get('imgHasShowed') && (cookie.get('imgHasShowed') === kk.app.getUserInfo().loginName)) {
          this.showDialogStyle = false;
        }else {
          this.$http.post('/kkYhUnproforMain.do?method=getPicUrl').then((response) => {
            if(response.body.data) {
              this.popupImg = response.body.data
              this.showDialogStyle = true;
              var d = new Date()
              d.setDate(d.getDate()+1)
              var month = d.getMonth() + 1
              var day = d.getDate()
              month = month > 9 ? month : ('0' + month)
              day = day > 9 ? day : ('0' + day)
              cookie.set('imgHasShowed', kk.app.getUserInfo().loginName, {
                expires: new Date([d.getFullYear(), month, day].join('-'))
              })
            }
          })
        }
      },
      popupImgHide () {
        /*var d = new Date()
        d.setDate(d.getDate()+1)
        var month = d.getMonth() + 1
        var day = d.getDate()
        month = month > 9 ? month : ('0' + month)
        day = day > 9 ? day : ('0' + day)
        cookie.set('imgHasShowed', kk.app.getUserInfo().loginName, {
          expires: new Date([d.getFullYear(), month, day].join('-'))
        })*/
      },
      reload () {
      	console.log(kk.app)
        var params = {
          "fdLoginName": kk.app.getUserInfo().loginName,
          "type": this.type == 'todo' ? 'wating' : 'had'
        };
        var apiURL = '/kkYhUnproforMain.do?method=getEvaluationInfo';
        this.$http.post(apiURL, params).then((response) => {
          if(response.body.data.length){
            this[this.type + 'Lists'] = this.getGroupFrom(response.body.data);
            console.log(this.doneLists)
            this.isEmpty = false;
          }else{
            this.isEmpty = true;
            this[this.type + 'Lists'] = [];
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      getGroupFrom (data) {
        let lists = {}
        data.forEach((item) => {
          const list = lists[item.fdQuarter] || (lists[item.fdQuarter] = [])
          list.push(item)
        })
        return lists;
//        return Object.keys(lists).reduce((acc, key) => {
//          acc.push(lists[key])
//          return acc
//        }, [])
      },
      gotoTestPage (sta, item) {
        if(sta == 0){
          this.$router.load('checkout', {viewData: item})
        }else if(sta == 1){
          this.$router.load('detail', {viewData: item})
        }else{

        }
      },
      gotoAccount () {
        this.$router.load('account', {viewData: ''})
      },
      togglePage (type) {
        if (this.type === type) return
        this.type = type
        this.reload();
        if(this.type == "todo"){
          this.isShow = true;
          this.todoIcon = true;
          this.doneIcon = false;
        }else{
          this.isShow = false;
          this.todoIcon = false;
          this.doneIcon = true;
        }
      },
      toggleShow (event) {
        var self = event.target;
        var parent = self.parentNode.nextElementSibling;
        var flag = self.classList.contains("down");
        if(flag){
          self.className = "cell-arrow";
          parent.className = "group";
        }else{
          self.className = "cell-arrow down";
          parent.className = "group group-down";
        }
      },
      currentSta (code) {
        if(code == 0){
          return "马上测评"
        }else if(code == 1){
          return "已评分"
        }else if(code == 2){
          return "已过期"
        }else if(code == 3){
          return "已撤销"
        }else if(code == 4){
          return "进行中"
        }else if(code == 5){
          return "已结束"
        }else if(code == 6){
          return "未开始"
        }else{
          return ""
        }
      },
      quarterStr (index) {
        var arr = this.lists[index];
        return arr[0].fdName+'-第'+index+'季度';
      },
      toBack() {
        console.log('back')
//        this.$router.back('home')
        kk.app.exit();
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  .container{

  }
  .weui-tabbar__icon {
    width: 18px;
    height: 18px;
  }
  .wrap-head{
    background-color: #25a7e8;
    color: #FFFFFF;
    .solo-page-header-back{
    &:before{
       border: 1px solid #FFFFFF;
       border-width: 1px 0 0 1px;
      }
    }
    .head-link{
      color: #FFFFFF;
    &:active{
       opacity:.5;
     }
    }
  }
  .wrapper-main{
    .weui-cells{
      margin-top:0;
      .weui-cell__ft {
        font-size: 14px;
        color: #979797;
      }
    }
    .weui-cell{
      padding:0 15px;
      line-height: 50px;
    }
    .cell-group-box{
      position: relative;
      background-color: #FFFFFF;
      &:before{
         content: " ";
         position: absolute;
         left: 0;
         top: 0;
         right: 0;
         height: 1px;
         border-top: 1px solid #D9D9D9;
         color: #D9D9D9;
         -webkit-transform-origin: 0 0;
         transform-origin: 0 0;
         -webkit-transform: scaleY(0.5);
         transform: scaleY(0.5);
       }
       .cell-group-head{
          padding-right: 50px;
          overflow:hidden;
          height: 50px;
          .cell-group-title {
            color: #666;
            padding:0 15px;
            line-height: 50px;
            width:100%;
            font-weight:bold;
            float: left;
            font-size: 14px;
          }
          .cell-arrow{
            width:50px;
            height:55px;
            position: relative;
            display:inline-block;
            float: right;
            margin-right:-50px;
            &:after{
               content: '';
               display: inline-block;
               height: 10px;
               width: 10px;
               border-width: 2px 0 0 2px;
               border-color: #C8C8CD;
               border-style: solid;
               -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
               transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
               position: absolute;
               top: 50%;
               left:50%;
               margin-top: -4px;
             }
            &.down{
              &:after{
                 border-width: 0 2px 2px 0;
               }
             }
          }
       }
      .cell-group-item{
        .vux-cell-primary{
          overflow: hidden;
          .vux-label{
            font-size: 15px;
            color: #222;
            padding-right:15px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .group-down{
        display: none;
      }
    }
    .multi-head{
      text-align: center;
      line-height: 40px;
      color: #979797;
    }
    .multi-head .weui-icon-info{
      font-size:18px;
    }
    .multi-group + .multi-group{
      margin-top:15px;
    }
  }
  .wrap-foot{
    -webkit-box-shadow: 0px -3px 3px #eee;
    -moz-box-shadow: 0px -3px 3px #eee;
    box-shadow: 0px -3px 3px #eee;
  }
  .wrapper-empty{
    width:100%;
    height:100%;
    margin-top:-46px;
    display: table;
  }
  .wrapper-empty-cell{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .wrapper-empty-cell img{
    display: inline-block;
    width:62px;
    height:auto;
  }
  .wrapper-empty-info{
    color: #666;
  }
  .tabbar-h{
    padding:10px;
    background-color: #FFFFFF;
  }
  .tabbar-h .weui-tabbar__icon,
  .tabbar-h .weui-tabbar__label{
    display: inline-block;
    vertical-align: middle;
  }
  .tabbar-h .weui-tabbar__icon {
    width: 18px;
    height: 18px;
  }
  .tabbar-h .weui-tabbar__label{
    margin-left:5px;
    font-size:14px;
  }
  .tabbar-h .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #25a7e8;
  }
  .tabbar-h .vux-badge{
    vertical-align: top;
    margin-top:-3px;
    background: #e14f4f;
  }
  .dlg-content{
    display: inline-block;
    width:80%;
    height:100%;
    .dlg-head{
      width:100%;
      height:78%;
      padding:10px;
      text-align: center;
      background-color: #FFFFFF;
      -webkit-border-radius:5px;
      -moz-border-radius:5px;
      border-radius:5px;
      overflow: hidden;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .dlg-close{
      width:30px;
      display: inline-block;
    }
  }
  .wrapper-main .multi-head .weui-icon-info {
    background: url('../assets/icon_tip@2x.png') no-repeat;
    background-size: 14px 14px;
    width: 20px;
  }
  .wrapper-main .multi-head .weui-icon-info:before {
    content: '';
  }
</style>
