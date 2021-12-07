const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonController extends BaseController {
  async cities() {
    const { ctx, app } = this;
    const result = await ctx.service.common.getCities()
    this.success(result)
    
  }
}

module.exports = CommonController;