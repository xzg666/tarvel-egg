const Service = require('egg').Service;
const BaseService = require('./base');

class OrdersService extends BaseService {
  async hasOrder(houseId) {
   return this.run(async(ctx)=>{
    //    console.log('id',id)
    const res = await ctx.model.Orders.findOne({
        where:{
            userId:ctx.userId,
            houseId: houseId
        }
    });
    // console.log('res',res)
    return res;
   })
  }

  async addOrder(parmas){
    return this.run(async(ctx)=>{
      const res = await ctx.model.Orders.create(parmas);
      return res;
    })
  }

  async delOrder(id){
    return this.run(async(ctx)=>{
      const res = await ctx.model.Orders.destroy({
        where:{id}
      });
      return res;
    })
  }

  async lists(params){
    return this.run(async (ctx,app)=>{
      const res = await ctx.model.Orders.findAll({
        where:{
          isPayed:params.type,//请求传来的type
          userId: params.userId
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1)*params.pageSize,
        include:[
          {
            model:this.app.model.House,
            as:'house',//起了别名就必须写
            include:[
              {
                model:this.app.model.Imgs,
                attributes:['url'],
                limit:1
              }
            ]
          }
        ]
      })
      return res;
    })
  }

  async pay(params){
    return this.run(async(ctx)=>{
      const res= await ctx.model.Orders.update({
        isPayed:1,
        orderNumber: params.orderNumber
      },{
        where:{
          id: params.id
        }
      });
      return res;
    })
  }
}

module.exports = OrdersService;