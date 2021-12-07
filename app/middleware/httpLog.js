const dayjs = require('dayjs');
const fs = require('fs');

module.exports = options => {
    return async (ctx,next) => {
        const sTime = Date.now();
        const startTime = dayjs(Date.now()).format('YYYY-MM-DD HH:MM:SS');
        const req = ctx.request;
        await next();
        //洋葱模型返回来完成以下code
        const log = {
            method: req.method,
            url:req.url,
            data:req.body,
            startTime,
            endTime:dayjs(Date.now()).format('YYYY-MM-DD HH:MM:SS'),
            timeLength: Date.now() - sTime
        };
        console.log('req.info',log)
    }
}