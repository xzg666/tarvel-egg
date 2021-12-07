/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1638163222988_763';

  // add your middleware config here
  config.middleware = ['httpLog'];

  //post请求生效
  config.security = {
    csrf: {
      enable: false,
    },
  };

  //设置密钥
  config.jwt = {
    secret:'egg'
  }

  //连接redis
  config.redis = {
    client:{
      port:6379,
      host:'127.0.0.1',
      password:'123456',
      db:0,
    }
  }

  //egg-auth插件配置
  config.auth = {
    exclude:[
      '/api/user/login','/api/user/register','/api/common/cities',
      '/api/house/hot','/api/house/search','/api/house/detail',
    ]//这两个接口不需要进行这个中间件的判断
  }

  //egg-allowHosts配置项
  config.allowHost = ['localhost:8000','127.0.0.1'];//允许本站请求，前者为前端发送请求，后者为egg的模板引擎中的地址

  config.interfaceLimit ={
    maxCount:5,
    time: 3*1000,
    exclude:['/api/comments/lists']
  }


  config.interfaceCache = {
    expire: 10,
    include: ['/api/user/detail']
  };


  // config.mysql = {
  //   app:true,
  //   agent:false,
  //   client:{
  //     host:'127.0.0.1',
  //     port:'3306',
  //     user:'root',
  //     password:'root1234',
  //     database:'egg'
  //   }
  // };

  config.sequelize = {
    dialect:'mysql',
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'root1234',
    database:'egg',
    define: {
      timestamps:false,//不让sequelize设置时间戳
      freezeTableName:true //冻结sequelize自己设置表名称
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt:'egg',
    redisExpire:60*60*24,//redis过期时间设置成配置项
  };

  return {
    ...config,
    ...userConfig,
  };
};
