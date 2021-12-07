module.exports = {
    get token(){
        console.log('header',this.header);
        //如果获取请求头的一些参数，可以直接使用this.get()方法
        return this.get('token');
    }
}