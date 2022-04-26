module.exports = (sequelize, DataTypes) => {
  const QuestionProgram = sequelize.define("questionprogram", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return QuestionProgram;
};
