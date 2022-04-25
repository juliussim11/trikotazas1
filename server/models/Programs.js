module.exports = (sequelize, DataTypes) => {
  const Programs = sequelize.define("Programs", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Programs.associate = (models) => {
  //   Programs.belongsToMany(models.Questions, {
  //     through: "question_prog_pos_dep",
  //     as: "questions",
  //     foreignKey: "programId",
  //   });
  // };

  Programs.associate = (models) => {
    Programs.hasMany(models.Questions);
  };

  return Programs;
};
