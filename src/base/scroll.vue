<style lang="less">

</style>
<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props:{
    /** * 1 滚动的时候会派发scroll事件，会截流。 
    * 2 滚动的时候实时派发scroll事件，不会截流。 
    * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件 
    */
    probeType:{
        type:Number,
        default:1
    },
    /* 点击列表是否派发click事件 */
    click:{
        type:Boolean,
        default:true
    },
    /*是否开启横向滚动  */
    scrollX:{
        type:Boolean,
        default:true
    },
    /*是否开启纵向滚动  */
    scrollY:{
        type:Boolean,
        default:true
    },
    /* 是否派发滚动事件 */
    listenScroll:{
        type:Boolean,
        default:false
    },
    /* 是否派发滚动到底部的事件，用于上拉加载 */
    pullup:{
        type:Boolean,
        default:false
    },
    /* 是否派发滚动到顶部的事件，用于下拉刷新 */
    pulldown:{
        type:Boolean,
        default:false
    },
    /* 列表的数据 */
    data:{
        type:Array,
        default:null
    }
  },
  mounted(){
    setTimeout(()=>{
        this.initScroll();
    },2000);
  },
  methods:{
    initScroll(){
        if (!this.$refs.wrapper) {
            return 
        }
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            click:this.click,
            scrollX:this.scrollX,//开启横向滚动
            scrollY:this.scrollY
        })
        if (this.listenScroll) {
          let self = this
          this.scroll.on('scroll', (pos) => {
            self.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
            console.log("run scroll00");
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
    },
    enable(){
        this.scroll && this.scroll.enable();
        console.log("run scroll");
    },
    disable(){
        this.scroll && this.scroll.disable();
    },
    refresh(){
        this.scroll && this.scroll.refresh();
        console.log("refresh");
    },
    scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch:{
    data(){
        setTimeout(()=>{
            this.refresh()
            console.log("data",this.data);
        },20);
    }
  }
}
</script>


