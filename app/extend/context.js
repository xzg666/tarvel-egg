module.exports = {
    //获取请求的各种参数
    params(key){
        const method = this.request.method;
        if(method === 'GET'){
            return key ? this.query[key] : this.query;
        }else{
            return key ? this.request.body[key] : this.request.body;
        }
    },

    //根据token拿到用户名，定义这个方法
    get username(){
        const token = this.request.header.token;
        //根据传来的token验证出username中
        const tokenCache = token ? this.app.jwt.verify(token,this.app.config.secret) : undefined;
        return tokenCache ? tokenCache.username : undefined;
    },
    get userId(){
        const token = this.request.header.token;
        //根据传来的token验证出username中
        const tokenCache = token ? this.app.jwt.verify(token,this.app.config.secret) : undefined;
        return tokenCache ? tokenCache.id : undefined;
    }
}