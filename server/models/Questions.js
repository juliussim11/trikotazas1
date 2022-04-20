module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    positionId: {
      type: DataTypes.STRING,
    },
    programId: {
      type: DataTypes.STRING,
    },
    departamentId: {
      type: DataTypes.STRING,
    },
  });

  return Questions;
};
