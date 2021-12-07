/**缓存接口
 * 1，接口地址作为redis中的key
 * 2，查询redis，有缓存，返回返回接口
 * 3，没有缓存，将接口返回结果保存到redis中
 */
module.exports = options => {
    // console.log('options',options);//拿到config.default的这个插件的配置
    return async (ctx, next) => {
        const { url } = ctx.request;
        const cahce = await ctx.app.redis.get(url);

        if (options.include.includes(url)) {
            if (cahce) {
                ctx.body = JSON.parse(cahce);
                return;
            } else {
                await next();
                await ctx.app.redis.set(url, JSON.stringify(ctx.response.body), 'EX', 8);
            }
        } else {
            await next();
        }
    }
}