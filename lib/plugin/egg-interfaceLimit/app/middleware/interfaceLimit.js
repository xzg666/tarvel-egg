/**3s内最多允许3个接口请求
 * 1.设置计数器，每次请求+1；保存开始时间
 * 1.超过3s，计数器大于3，则提示请求频繁；计数器清零，起始时间修改为当前时间
 * 2.超过3s，计数器小于3，计数器清零，起始时间修改为当前时间
 */
module.exports = options => {
    // console.log('options',options);//拿到config.default的这个插件的配置
    let count = 0;
    let firstTime = new Date().getTime();
    return async(ctx,next) => {
        const {url} = ctx.request
        if(!options.exclude.includes(url)){
            if(new Date().getTime() - firstTime >= options.time){
                if(count >= options.maxCount){
                    count = 0;
                    firstTime = new Date().getTime();
                    ctx.body = {
                        status: 500,
                        errMsg:'请求太频繁'
                    };
                    return;
                }else{
                    count = 0;
                    firstTime = new Date().getTime();
                    await next();
                }
            }else{
                count ++;
                await next();
            }

        }else{
            await next();
        }
    }
}