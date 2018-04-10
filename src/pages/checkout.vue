<template>
  <page>
    <page-header class="page-head-wrap" title="测评" :showBack="true" @on-click-back="toBack" slot="header">
      <template slot="header-right">
        <a class="head-link" :class="{disable: submitSta}" @click="submitForm($event)" slot="right">提交</a>
      </template>
    </page-header>
    <page-content>
      <div class="wrapper-chk">
        <div class="wrap-head">
          <div class="wrap-head-left">{{detailData.fdRatedName}}({{detailData.fdNo}})</div>
          <div class="wrap-head-right">{{detailData.fdTeam}}</div>
        </div>
        <div class="wrap-content">
          <div class="divider-box">
            <icon type="info"></icon>5分代表"非常赞同",1分代表"不赞同"
          </div>
          <card class="card-first">
            <div class="card-head" slot="header">1.在我眼中他/她是具有主人翁精神的合伙人</div>
            <div class="card-content" slot="content">能积极主动地承担工作，对于工作中发现的问题，勇于承担责任并积极应对处理。以公司整体利益和长远利益为先，顾大局，不计小团队或是个人的得失。</div>
            <div class="card-foot" slot="footer">
              <div class="icon-star-group">
                <i class="icon-star"
                   v-for="n in 5"
                   @click="tapStar(n, 1, $event)"
                   :key="n"
                ></i>
              </div>
              <span class="icon-info" v-show="questionObj['question1']">{{questionObj["question1"]}}分</span>
            </div>
          </card>
          <card>
            <div class="card-head" slot="header">2.在我眼中他/她是崇尚平等的合伙人</div>
            <div class="card-content" slot="content">平易近人，处事公正，待人公平。工作中能积极征求和尊重他人建议，并愿意采纳不同的观点。</div>
            <div class="card-foot" slot="footer">
              <div class="icon-star-group">
                <i class="icon-star"
                   v-for="n in 5"
                   @click="tapStar(n, 2, $event)"
                   :key="n"
                ></i>
              </div>
              <span class="icon-info" v-show="questionObj['question2']">{{questionObj["question2"]}}分</span>
            </div>
          </card>
          <card>
            <div class="card-head" slot="header">3.在我眼中他/她是乐于融合共享的合伙人</div>
            <div class="card-content" slot="content">乐于与团队其他成员或其他团队相互合作，分享经验及资源以帮助工作目标的达成。关注团队成员的共同成长，乐于给予建议和指导。</div>
            <div class="card-foot" slot="footer">
              <div class="icon-star-group">
                <i class="icon-star"
                   v-for="n in 5"
                   @click="tapStar(n, 3, $event)"
                   :key="n"
                ></i>
              </div>
              <span class="icon-info" v-show="questionObj['question3']">{{questionObj["question3"]}}分</span>
            </div>
          </card>
          <card>
            <div class="card-head" slot="header">4.在我眼中他/她是廉洁自律的合伙人</div>
            <div class="card-content" slot="content">在工作中自觉维护公司利益，拒绝一切不正当收入。</div>
            <div class="card-foot" slot="footer">
              <div class="icon-star-group">
                <i class="icon-star"
                   v-for="n in 5"
                   @click="tapStar(n, 4, $event)"
                   :key="n"
                ></i>
              </div>
              <span class="icon-info" v-show="questionObj['question4']">{{questionObj["question4"]}}分</span>
            </div>
          </card>
          <card>
            <div class="card-head" slot="header">5.在我眼中他/她是坦荡无私的合伙人</div>
            <div class="card-content" slot="content">自己和家人没有直接或间接地参与到公司生意往来中，对于现已存在的合作，已经毫无保留的向公司公开了相关信息。</div>
            <div class="card-foot" slot="footer">
              <div class="icon-star-group">
                <i class="icon-star"
                   v-for="n in 5"
                   @click="tapStar(n, 5, $event)"
                   :key="n"
                ></i>
              </div>
              <span class="icon-info" v-show="questionObj['question5']">{{questionObj["question5"]}}分</span>
            </div>
          </card>
          <card>
            <div class="card-head" slot="header">6.在我眼中他/她是遵纪守法的合伙人</div>
            <div class="card-content" slot="content">在遵守法律和公司相关制度/政策下高效开展各项工作，对违纪的事情零容忍。</div>
            <div class="card-foot" slot="footer">
              <div class="icon-star-group">
                <i class="icon-star"
                   v-for="n in 5"
                   @click="tapStar(n, 6, $event)"
                   :key="n"
                ></i>
              </div>
              <span class="icon-info" v-show="questionObj['question6']">{{questionObj["question6"]}}分</span>
            </div>
          </card>
          <card>
            <div class="card-head card-line" slot="header">7.(选填)如果你还有其他想要告诉我们的...</div>
            <div class="card-content-box" slot="content">
              <x-textarea :max="20" v-model="content" name="description" placeholder="请输入少于200字"></x-textarea>
            </div>
          </card>
        </div>
      </div>
      <toast v-model="showPositionValue" type="text" :time="500" is-show-mask position="default"><i class="icon-tip"></i>评分成功</toast>
    </page-content>
  </page>
</template>

<script>
  import Solo from 'solojs';
  import { Group, Cell, XHeader, Icon, Card, XTextarea, Toast} from 'vux'

  export default {
    extends: Solo.Page,
    components: {
      Group,
      Cell,
      XHeader,
      Icon,
      Card,
      XTextarea,
      Toast
    },
    data () {
      return {
        userName: this.pageData,
        isActive: false,
        isLink: true,
        showPositionValue: false,
        submitSta: true,
        questionObj: {
          "question1": 0,
          "question2": 0,
          "question3": 0,
          "question4": 0,
          "question5": 0,
          "question6": 0,
        },
        content: '',
        detailData: {}
      }
    },
    computed: {
      userNum () {
        return this.pageData;
      }
    },
    watch: {
      questionObj: {
        deep: true,
        handler: function (obj) {
          for(var n in obj){
            if(obj[n] == 0)return false;
          }
          this.submitSta = false;
        }
      }
    },
    methods: {
      getRecordDetail () {
        let params = {
          "evaluationId": this.pageData
        };
        const apiURL = '/kkYhUnproforMain.do?method=getEvaluationRecordDetail';
        this.$http.post(apiURL, params).then((response) => {
          this.detailData = response.body.data;
          if(response.body.data.fdQuestion1 && response.body.data.fdQuestion1 > 0) {
            this.$vux.toast.show({
              text: '您已经对该人评过分',
              type: 'text',
              time: 2000,
              onHide: () => {
                this.$router.load('home');
              }
            })
          }
        }).catch((response) => {
            console.log(response)
        })
      },
      tapStar (index, item, event) {
        var self = event.target;
        var group = [];
        this.questionObj["question"+item] = index;
        group = self.parentNode.childNodes;
        group.forEach(function (val, ind) {
          if(ind < index){
            self.parentNode.childNodes[ind].className = "icon-star active";
          }else{
            self.parentNode.childNodes[ind].className = "icon-star";
          }
        })
        //console.log(this.questionObj);
      },
      submitForm (event) {
        var apiUrl = '/kkYhUnproforMain.do?method=setEvaluationRecord',
            params,
            status;
        status = event.target.classList.contains('disable');
        if(!status && this.pageData){
          params = this.questionObj;
          params.fdId = this.pageData;
          params.question7 = this.content;
          console.log(params);
          this.$http.post(apiUrl, params).then((response)=>{
           if(response.body.errorcode == 0){
              this.showPositionValue = true;
              setTimeout(() => {
                this.$router.load('home');
              }, 800);
           }else if(response.body.errorcode == 2){
            this.$vux.toast.show({
              text: '您已经对该人评过分',
              type: 'text',
              time: 2000,
              onHide: () => {
                this.$router.load('home');
              }
            })
           }
           }).catch((response)=>{
              console.error(response.stack);
           })
        }
      },
      toBack() {
        this.$router.back();
      }
    },
    created () {
      this.getRecordDetail()
    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  .page-head-wrap{
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
      &.disable{
         opacity:.5;
       }
    }
  }
  .wrapper-chk{
    position: relative;
    .wrap-head{
      width:100%;
      line-height:50px;
      padding:0 15px;
      position: fixed;
      z-index:5;
      background-color:#ffffff;
      border-bottom: 1px solid #D9D9D9;
      box-sizing: border-box;
      div{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
      }
      .wrap-head-left{
        font-size: 15px;
        width:60%;
        color: #222;
        font-weight:bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .wrap-head-right{
        font-size: 15px;
        width:40%;
        color: #979797;
        text-align: right;
      }
      &:after{
         content: '';
         display: table;
         clear: both;
       }
    }
  }
  .wrap-content{
    padding-top:50px;
    margin-bottom:20px;
    .divider-box{
      height:46px;
      text-align: center;
      padding:10px;
      color: #979797;
      font-size:14px;
      line-height:23px;
      .weui-icon-info{
        font-size: 18px;
        /* background: url('../assets/icon_tip@2x.png') center no-repeat;
        background-size: 14px 14px;
        width: 20px;
        &:before {
          content: '';
        } */
      }
    }
    .weui-panel{
      .card-head{
        padding:15px 15px 0;
        font-size:15px;
        font-weight:bold;
        line-height: 1;
      }
      .card-line{
        padding:10px 15px;
      }
      .card-content{
        position: relative;
        padding:10px 15px;
        font-size:14px;
        color: #979797;
        &:after{
           content: " ";
           position: absolute;
           left: 15px;
           bottom: 0;
           right: 0;
           height: 1px;
           border-bottom: 1px solid #E5E5E5;
           color: #E5E5E5;
           -webkit-transform-origin: 0 100%;
           transform-origin: 0 100%;
           -webkit-transform: scaleY(0.5);
           transform: scaleY(0.5);
         }
      }
      .card-content-box{
        position: relative;
        font-size:14px;
        &:after{
           content: " ";
           position: absolute;
           left: 15px;
           bottom: 0;
           right: 0;
           height: 1px;
           border-bottom: 1px solid #E5E5E5;
           color: #E5E5E5;
           -webkit-transform-origin: 0 100%;
           transform-origin: 0 100%;
           -webkit-transform: scaleY(0.5);
           transform: scaleY(0.5);
         }
      }
      .card-foot{
        padding:15px;
        .icon-star-group{
          display: inline-block;
        }
        .icon-info{
          display: inline-block;
          color: #666;
          line-height:20px;
          vertical-align: middle;
        }
      }
    }
    .card-first{
      margin-top:0;
    }
  }
  .icon-star{
    width:40px;
    height:40px;
    display: inline-block;
    vertical-align: middle;
    margin-right:25px;
    background: transparent url("../assets/icon_star_off.png") center no-repeat;
    -webkit-background-size:20px 20px;
    background-size:20px 20px;
    margin-right: 0;
    &.active{
       background-image: url("../assets/icon_star_on.png");
     }
  }
  .icon-tip{
    width:14px;
    height:14px;
    display: inline-block;
    vertical-align: middle;
    margin-right:10px;
    background: transparent url("../assets/tip_ok.png") no-repeat;
    -webkit-background-size:cover;
    background-size:cover;
  }
</style>
