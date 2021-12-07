const Controller = require('egg').Controller;
const BaseController = require('./base');

class OrdersController extends BaseController {
  async hasOrder() {
    const { ctx, app } = this;

    const result = await ctx.service.orders.hasOrder(ctx.params('id'));
    // console.log(res)
    this.success(result)
  }

  async addOrder() {
    const { ctx, app } = this;

    const result = await ctx.service.orders.addOrder({
      userId: ctx.userId,
      houseId: ctx.params('id'),
      isPayed: 0,
      createTime: ctx.helper.time()
    });
    this.success(result)
  }

  async delOrder(){
    const {ctx} = this;
    const res = await ctx.service.orders.delOrder(ctx.params('id'));
    this.success(res)
  }

  async lists(){
    const {ctx}= this;
    const res = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId
    })
    this.success(res)
  }

  //模拟支付接口
  async invokePay(params){
    return {
      orderNumber: params.id + new Date().getTime()
    }
  }

  async pay(){
    const {ctx,app} = this;
    const {id} = ctx.params();
    //首先查询订单是否存在，然后生成订单信息，最后更新数据库该订单的支付信息
    const order = await ctx.model.Orders.findByPk(id);

    if(order){
      console.log('order',order)
      try{
        const beforePay = await this.invokePay({id});
        console.log('beforePay',beforePay)
        const res = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber
        });
        this.success(res);
      }catch(error){
        this.error('订单支付失败');
      }
    }else{
      this.error('订单不存在！')
    }
  }
}

module.exports = OrdersController;