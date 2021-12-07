const Service = require('egg').Service;
const BaseService = require('./base');

class CommentsService extends BaseService {
  async add(params) {
    return this.run(async(ctx)=>{
        const res = await ctx.model.Comment.create(params);
        return res;
    })
  }

  async lists(params,userId){
      return this.run(async (ctx,app)=>{
        const res =  await ctx.model.Comment.findAll({
              where:{
                  houseId:params.houseId,
                  userId
              },
              limit:params.pageSize,
              offset:(params.pageNum - 1)*params.pageSize,
              include:[
                  {
                      model:app.model.User,
                      attributes:['avatar','username']
                  }
              ]
          });
          return res;
      });
  }
}

module.exports = CommentsService;