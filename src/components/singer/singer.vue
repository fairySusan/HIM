<style lang="less">
    .singer{
        
    }
</style>

<template>
    <div class="singer">
        <mt-index-list>
            <mt-index-section v-for="items in singerList" :key="items.title" :index="items.title">
                <mt-cell v-for="item in items" :key="item.title" :title="item.name">
                </mt-cell>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>
<script>
import { getSingerList } from "api/singer";
import {ERR_OK} from 'api/config';
import Singer from 'common/js/singer'
export default {
    data(){
        return{
            singerList:[],
        }
    },
    created(){
        this._getSingerList();
    },
    methods:{
        _getSingerList(){
            getSingerList().then(res=>{
                if(res.code ===  ERR_OK){
                    this.singerList = this.sortSinger(res.data.list);
                    console.log(this.singerList);
                }
            })
        },
        //将数据进行A~Z的分组
        sortSinger(singerList){
            const HOT_SINGER_LEN = 10;
            const HOT_NAME = '热门';
            let map = {
                hot:{
                    title:HOT_NAME,
                    items:[]
                }
            }
            singerList.forEach((item,index)=>{
                if(index<HOT_SINGER_LEN){
                    map.hot.items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name
                    }))
                }
                const key = item.Findex;
            // 如果没有key字母，创建一个以key字母为标识的对象
                if(!map[key]){
                    map[key] = {
                        title:key,
                        items:[]
                    }
                }
                map[key].items.push(new Singer({
                    id:item.Fsinger_mid,
                    name:item.Fsinger_name
                }))
            });
            //把分好组的数组进行A~Z的顺序排序
            let hot = [];
            let ret = [];
            for(let key in map){
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
                }else if(val.title === HOT_NAME){
                    hot.push(val);
                }
                ret.sort((a,b) =>{
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
            }
            return hot.concat(ret);
        }
    }
}
</script>

