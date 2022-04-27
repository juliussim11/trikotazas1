module.exports = (sequelize, DataTypes) => {
  const Positions = sequelize.define("Positions", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Positions.associate = (models) => {
    Positions.belongsToMany(models.Questions, {
      through: "position_question",
      foreignKey: "PositionId",
    });
  };

  return Positions;
};
