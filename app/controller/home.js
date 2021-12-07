'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx,app } = this;
    const res = await ctx.model.User.findAll()
    ctx.body = 'hi, egg'+JSON.stringify(res);
  }

}

module.exports = HomeController;
