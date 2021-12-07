const os = require('os');

module.exports = {
    get info() {
        const data = {
            memory: os.totalmem() / 1024 / 1024 / 1024 + 'G',
            platform: os.platform,
            cpus: os.cpus().length,
            //这里的this指的是ctx上下文
            url:this.request.url
        };
        return data;
    }
}