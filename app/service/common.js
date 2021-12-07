const Service = require('egg').Service;
const BaseService = require('./base');

class CommonService extends BaseService {
  async getCities() {
    return [[{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' },{ label: '宁波', value: '10003' }]]
  }
}

module.exports = CommonService;