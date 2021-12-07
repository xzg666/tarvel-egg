const Service = require('egg').Service;
const BaseService = require('./base');

class CommonService extends BaseService {

    // //公共sql属性抽离
    commonAtrr(app){
        return{
            order:[
                ['showCount','Desc']//根据表的showCount降序排序
            ],
            attributes: {
                exclude: ['startTime', 'endTime', 'publishTime']//不展示这些数据
            },
            include:[
                {
                    model:app.model.Imgs,
                    limit:1,
                    attributes:['url']
                }
            ]
        }
    }

  async hot() {
    return this.run(async(ctx,app)=>{
        const res = await ctx.model.House.findAll({
            limit:4,
            ...this.commonAtrr(app)
        });
        return res;
    })
  }

  async search(params){
      return this.run(async (ctx,app)=>{
        const { lte, gte, like } = app.Sequelize.Op;
        const where = {
          cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        //   startTime: {
        //     [gte]: params.startTime
        //   },
        //   endTime: {
        //     [lte]: params.endTime
        //   },
          name: {
            [like]: '%' + params.houseSubmitName + '%' //搜索查询
          }
        };
        if(!params.houseSubmitName){
          delete where.name;
        }
        const result = await ctx.model.House.findAll({
          ...this.commonAtrr(app),
          limit: 8,
          offset: (params.pageNum - 1) * params.pageSize,
            where
        });
        return result;
      })
  }

  async detail(id){
      return this.run(async(ctx,app)=>{
          const res = await ctx.model.House.findOne({
              where:{
                  id
              },
              include:[
                  {
                      model:app.model.Imgs,
                      attributes:['url']
                  }
              ]
          });

          //展示之后该条数据的showCount+1
          await ctx.model.House.update({
              showCount:res.showCount + 1
          },{
              where:{
                  id
              }
          })
          return res;
      })
  }

  
}

module.exports = CommonService;