const dayjs = require('dayjs');

//帮助函数扩展
module.exports = {
    base64Encode(str=' '){
        return new Buffer(str).toString('base64');
    },
    //获取当前时间
    time(){
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    //获取某个时间的时间戳
    timeStamp(data){
        return new Date(data).getTime();
    },
    //从某个对象中排除某个属性
    unPick(source,arr){
        if(Array.isArray(arr)){
            let obj = {};
            for(let i in source){
                if(!arr.includes(i)){
                    obj[i] = source[i];
                }
            }
            return obj;
        }
    }
};