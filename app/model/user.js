module.exports = app => {
    //Sequelize就是创建一个模型，文件名字与表的名字一致。映射！
    const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
    const User = app.model.define('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(20),
      password: STRING(64),
      avatar: TEXT('long'),
      phone: STRING(20),
      sign: STRING(300),
      createTime: DATE,
      updateTime: DATE
    });
  
    return User;
  }
