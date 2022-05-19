module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  });

  Questions.associate = (models) => {
    Questions.belongsToMany(models.Programs, {
      through: "program_question",
      className: "Programs",
      foreignKey: "QuestionId",
    });

    Questions.belongsToMany(models.Positions, {
      through: "position_question",
      className: "Positions",
      foreignKey: "QuestionId",
    });

    Questions.belongsToMany(models.Departaments, {
      through: "departament_question",
      className: "Departaments",
      foreignKey: "QuestionId",
    });

    Questions.hasMany(models.Images, {
      onDelete: "cascade",
    });
  };

  return Questions;
};
