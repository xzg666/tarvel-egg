module.exports = options => {
    // console.log('options',options);//拿到config.default的这个插件的配置
    return async(ctx,next) => {
        const {referer} = ctx.request.header;
        // console.log('referer',referer)
        if(referer){
        //    //我们只需要url，因此可以使用eggjs内置的URL方法拿到host
            const url = new URL(referer);
            if(options.includes(url.host)){
                await next();
            }else{
                ctx.body = {
                    status:403,
                    errMsg:`host ${url.host} 被禁止！`
                };
            }
        }else{
             //eggjs模板引擎发送请求没有referer只有一个完整的地址。所以直接内部发送请求next
            await next();
        }
    }
}