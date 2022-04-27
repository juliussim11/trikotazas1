module.exports = (sequelize, DataTypes) => {
  const QuestionDepartament = sequelize.define("departament_question", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return QuestionDepartament;
};
