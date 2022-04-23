module.exports = (sequelize, DataTypes) => {
  const Departaments = sequelize.define("Departaments", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Departaments.associate = (models) => {
    Departaments.belongsToMany(models.Questions, {
      through: "question_prog_pos_dep",
      as: "questions",
      foreignKey: "departamentId",
    });
  };

  return Departaments;
};
