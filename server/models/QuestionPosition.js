module.exports = (sequelize, DataTypes) => {
    const QuestionPosition = sequelize.define("position_question", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
  
    return QuestionPosition;
  };
  