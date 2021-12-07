'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

const path = require('path');

//config/plugin.js还需配置  插件egg-info
exports.info = {
  enable: true,
  path: path.join(__dirname,'../lib/plugin/egg-info')
} 
//config/plugin.js需配置 egg-auth插件，判断是否登录
exports.auth = {
  enable:true,
  path: path.join(__dirname,'../lib/plugin/egg-auth')
}
//config/plugin.js需配置 egg-notfound插件，判断发送请求的接口是否存在
exports.notFound = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-notFound')
};

exports.allowHost = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-allowHost')
};

exports.interfaceLimit = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-interfaceLimit')
};

exports.interfaceCache = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-interfaceCache')
};






//mysql配置
// exports.mysql = {
//   enable: true,
//   package: 'egg-mysql'
// };

//配置sequelize
exports.sequelize = {
  enable:true,
  package: 'egg-sequelize'
}

//配置jwt
exports.jwt = {
  enable:true,
  package: 'egg-jwt'
}

// 配置redis
exports.redis = {
  enable:true,
  package: 'egg-redis'
}


