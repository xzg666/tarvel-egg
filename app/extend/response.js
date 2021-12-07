module.exports = {
    //设置请求头，response扩展
    set token(token){
        console.log('token',this);
        //如果设置请求头的一些参数，可以直接使用this.set()方法
        return this.set('token',token);
    }
}