/* 进度条组件 */
<style lang="less">
@import '../assets/less/var.less';
    .progress-bar{
        // position: fixed;
        // bottom: 30px;
        .color-bar{
            background-color:@themeColor;
            height:4px;
            position: absolute;
            top:0px;
        }
        .total-bar{
             background-color:#666;
             height:4px;
             
        }
        .circle-btn{
           position: absolute;
           top:-3px;
           width:10px;
           height:10px;
           background:@themeColor;
           border-radius:50%;

        }
    }
</style>
<template>
  <div class="progress-bar" ref="progressBar">
      <div class="color-bar" ref="colorBar"></div>
      <div class="total-bar"></div>
      <div class="circle-btn" ref="circleBtn" @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend="progressTouchEnd"></div>
  </div>
</template>
<script>
const CIRCLR_BTN = 10
export default {
  props:{
      percent:{
          type:Number,
          default:0
      }
  },
  data(){
      return{

      }
  },
  created(){
      this.touch={};
  },
  methods:{
        progressTouchStart(e){
            this.touch.initiated = true;//表示已经初始化了
            this.touch.startX = e.touches[0].pageX;//touches[0]表示第一个手指
            this.touch.startY = e.touches[0].pageY;
            this.touch.left = this.$refs.colorBar.clientWidth;

        },
        progressTouchMove(e){
            if(!this.touch.initiated){
                return;
            }
            let deltaX = e.touches[0].pageX - this.touch.startX;
            const barWidth = this.$refs.progressBar.clientWidth - CIRCLR_BTN;
            let offsetWidth = Math.min(barWidth, Math.max(0,this.touch.left+deltaX));
            this.$refs.colorBar.style.width = offsetWidth+'px';
            this.$refs.circleBtn.style.left = offsetWidth+'px';   
        },
        progressTouchEnd(e){
            this.touch.initiated = false;
            let percent = this.$refs.colorBar.clientWidth/this.$refs.progressBar.clientWidth;
            this.$emit("percentChange",percent);
        }
  },
  watch:{
      percent(newPercent){
          if(newPercent>=0 && !this.touch.initiated){
              const barWidth = this.$refs.progressBar.clientWidth - CIRCLR_BTN;
              const offsetWidth = newPercent*barWidth;
              this.$refs.colorBar.style.width = offsetWidth+'px';
              this.$refs.circleBtn.style.left = offsetWidth+'px';
          }
      }
  }
}
</script>


