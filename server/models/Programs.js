module.exports = (sequelize, DataTypes) => {
  const Programs = sequelize.define("Programs", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Programs.associate = (models) => {
    Programs.belongsToMany(models.Questions, {
      through: "program_question",
      foreignKey: "ProgramId",
    });
  };

  return Programs;
};
