const Controller = require('egg').Controller;
const BaseController = require('./base');

class DemoController extends BaseController {
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot()
    this.success(result)
  }

  async search(){
    const { ctx, app } = this;
    const result = await ctx.service.house.search(ctx.params())
    // console.log('params',ctx.params())
    this.success(result)
  }

  async detail(){
    const { ctx, app } = this;
    const res = await ctx.service.house.detail(ctx.params('id'));
    this.success({
        info:res,
        banner:res.imgs
    })
  }
}

module.exports = DemoController;