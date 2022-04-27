module.exports = (sequelize, DataTypes) => {
  const QuestionProgram = sequelize.define("program_question", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return QuestionProgram;
};
