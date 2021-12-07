'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/detail', controller.user.detail);//判断用户是否存在的接口
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/edit', controller.user.edit);
  router.post('/api/common/cities', controller.common.cities);
  router.post('/api/house/hot', controller.house.hot);
  router.post('/api/house/search', controller.house.search);
  router.post('/api/house/detail', controller.house.detail);
  router.post('/api/comments/add',userExist, controller.comments.add);
  router.post('/api/comments/lists', controller.comments.lists);
  router.post('/api/orders/hasOrder',userExist, controller.orders.hasOrder);
  router.post('/api/orders/addOrder',userExist, controller.orders.addOrder);
  router.post('/api/orders/delOrder',userExist, controller.orders.delOrder);
  router.post('/api/orders/lists',userExist, controller.orders.lists);
  router.post('/api/orders/pay',userExist, controller.orders.pay);
};
