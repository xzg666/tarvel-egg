//获取本机信息、如内存大小、系统名称等
const os = require('os');

module.exports = () => {
    const data = {
        //字节大小
        memory: os.totalmem() / 1024 / 1024 / 1024 + 'G',
        platform : os.platform,
        cpus: os.cpus().length
    };
    return data;
}