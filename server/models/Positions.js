module.exports = (sequelize, DataTypes) => {
  const Positions = sequelize.define("Positions", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Positions.associate = (models) => {
    Positions.belongsToMany(models.Questions, {
      through: "question_prog_pos_dep",
      as: "questions",
      foreignKey: "positionId",
    });
  };

  return Positions;
};
