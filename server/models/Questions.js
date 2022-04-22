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
    programId: {
      type: DataTypes.STRING,
    },
    departamentId: {
      type: DataTypes.STRING,
    },
  });

  Questions.associate = (models) => {
    Questions.belongsToMany(models.Positions, {
      through: "question_position",
      as: "positions",
      foreignKey: "questionId"
    });
  };

  return Questions;
};
