'use strict';
const Controller = require('egg').Controller;
const md5 = require('md5');
const BaseController = require('./base');

class UserController extends BaseController {
  //颁发token方法
  async jwtSign({id,username}){
    const {ctx,app} = this;
    // const {username} = ctx.params();
    console.log('params',ctx.params())
    const token = app.jwt.sign({
      id,
      username
    },app.config.jwt.secret);
    // ctx.session[username] = 1;//登录了就存个session标识
    await app.redis.set(username,token,'EX',app.config.redisExpire)//将token存到redis中，存在5s
    return token;
  }
  //返回参数方法
  parseResult(ctx,result){
    return{
      ...ctx.helper.unPick(result.dataValues,['password']),
      createTime:ctx.helper.timeStamp(result.createTime),
    }
  }

  //注册接口
  async register() {
    const { ctx, app } = this;
    const params = ctx.params()
    const user = await ctx.service.user.getUser(params.username);
    // console.log('user',user.username,user.id)
    if(user){
      ctx.body = {
        status:500,
        errMsg:'用户已存在！'
      };
      return;
    }

    const result = await ctx.service.user.add({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time()
    });
    console.log(result,ctx.helper.time());
    if(result){
      const token = await this.jwtSign({
        id:result.id,
        username:result.username
      });
      this.success({
        ...this.parseResult(ctx,result),
        token
      })
      // ctx.body = {
      //   status:200,
      //   data:{
      //    ...this.parseResult(ctx,result),
      //     token
      //   }
      // };
    }else{
      this.error('注册失败~')
    }
  }

  //login interface
  async login(){
    const { ctx, app } = this;
    const {username,password} = ctx.params();
    // console.log('params',username,password,ctx.request.body)
    const user = await ctx.service.user.getUser(username,password);
    // console.log('user',user.username,user.id)
    
    if(user){
      const token = await this.jwtSign({
        id:user.id,
        username:user.username
      });
      this.success({
        ...this.parseResult(ctx,user),
        token
      })
      // ctx.body = {
      //   status:200,
      //   data:{
      //     ...this.parseResult(ctx,user),
      //     token
      //   }
      // }
    }else{
      this.error('用户不存在~')
    }
  }

  //用户详情接口
  async detail(){
    const {ctx} = this;
    const user = await ctx.service.user.getUser(ctx.username);
    if(user){
      this.success({
        ...this.parseResult(ctx,user)
      })
      // ctx.body = {
      //   status :200,
      //   data: {
      //     ...this.parseResult(ctx,user)
      //   }
      // }
    }else{
      this.error('用户不存在~')
    }
  }
  //退出接口
  async logout(){
    const {ctx,app} = this;
    try{
      // ctx.session[ctx.username] = null;//ctx.username是context扩展从token拿到
      await app.redis.del(ctx.username)
      this.success('ok')
      // ctx.body = {
      //   status : 200,
      //   data:'ok'
      // }
    }catch(error){
      this.error('退出登录失败~')
    }
  }

  //编辑个人信息接口
  async edit(){
    const { ctx } = this;
    const result = await ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
      sign: ctx.helper.escape(ctx.params('sign'))//对用户输入进行过滤，防止xss攻击！
    });
    // console.log('result',result)
    this.success(result);
  }
}

module.exports = UserController;