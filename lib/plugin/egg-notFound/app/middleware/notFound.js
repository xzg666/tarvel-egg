module.exports = options => {
    return async (ctx, next) => {
        // console.log('ctx-app-router',ctx.app.router)
        const flag = ctx.app.router.stack.filter(item =>{
            //对发送请求的路径对服务器每一个路由的正则进行发test判断，是否存在
            return item.regexp.test(ctx.request.url);
        });
        
        if(flag.length){
            await next();
        }else{
            ctx.body = {
                status:400,
                errMsg: '接口' + ctx.request.url + '不存在！'
            };
        }
        
    }
}