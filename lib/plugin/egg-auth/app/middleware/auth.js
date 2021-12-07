module.exports = options => {
    console.log('options',options);
    return async(ctx,next) => {
        const url = ctx.request.url;
        // const user = ctx.session[ctx.username];

        // 从前端请求中解析出token
        const token = ctx.request.token;//一般是ctx.request.header.token,但是我们做了扩展
        // 根据username从redis中获取token
        const userToken = await ctx.app.redis.get(ctx.username)
        const user = userToken ? userToken === token : userToken;
        console.log('user',user)

        if(!user && !options.exclude.includes(ctx.request.url.split('?')[0])){
            ctx.body = {
                status : 1001,
                errMsg: '用户未登录！'
            };
        }else{
            await next();
        }
    }
}