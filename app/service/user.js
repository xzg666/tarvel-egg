const Service = require('egg').Service;
const md5 = require('md5');
const BaseService = require('./base');

class UserService extends BaseService {
  async getUser(username,password) {
    return this.run( async ()=>{
      const {ctx,app} = this;
      const _where = password ? {username,password:md5(password+app.config.salt)} : {username};
      //查询单条数据
      const result = await ctx.model.User.findOne({
        where:_where
      });
      return result;
    })
  }

  async add(params){
    return this.run(async()=>{
      const {ctx} = this;
      const result = await ctx.model.User.create(params);
      return result;
    })
  }

  //编辑修改个人信息
  async edit(params){
    return this.run(async (ctx)=>{
      const result = await ctx.model.User.update(params,{
        where:{
          username:ctx.username
        }
      });
      return result
    })
  }
}

module.exports = UserService;