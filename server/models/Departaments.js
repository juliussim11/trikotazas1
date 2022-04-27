module.exports = (sequelize, DataTypes) => {
  const Departaments = sequelize.define("Departaments", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Departaments.associate = (models) => {
    Departaments.belongsToMany(models.Questions, {
      through: "departament_question",
      foreignKey: "DepartamentId",
    });
  };

  return Departaments;
};
