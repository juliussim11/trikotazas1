module.exports = (sequelize, DataTypes) => {
  const QuestionPosProgDep = sequelize.define("question_prog_pos_dep", {
    positionId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    programId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    departamentId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    questionId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  return QuestionPosProgDep;
};
