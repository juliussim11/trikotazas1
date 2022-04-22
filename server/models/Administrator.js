module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define("Administrator", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });

  return Administrator;
};
