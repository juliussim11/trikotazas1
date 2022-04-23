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
  });

  Questions.associate = (models) => {
    Questions.belongsToMany(models.Programs, {
      through: "question_position",
      as: "programs",
      foreignKey: "questionId",
    });
  };

  Questions.associate = (models) => {
    Questions.belongsToMany(models.Positions, {
      through: "question_position",
      as: "positions",
      foreignKey: "questionId",
    });
  };

  Questions.associate = (models) => {
    Questions.belongsToMany(models.Departaments, {
      through: "question_prog_pos_dep",
      as: "departaments",
      foreignKey: "questionId",
    });
  };

  return Questions;
};
