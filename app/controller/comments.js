const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommentsController extends BaseController {
  async add() {
    const { ctx, app } = this;
    const result = await ctx.service.comments.add({
      userId:ctx.userId,
      houseId:ctx.params('houseId'),
      msg:ctx.params('comment'),
      createTime: ctx.helper.time()
    });
    this.success(result)
  }

  async lists(){
    const { ctx, app } = this;
    // console.log('params',ctx.params(),ctx.params().houseId)
    const result = await ctx.service.comments.lists(ctx.params(),ctx.userId)
    this.success(result)
  }
}

module.exports = CommentsController;