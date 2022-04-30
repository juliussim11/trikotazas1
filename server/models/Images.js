module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define("Images", {
    image: {
      //type: DataTypes.BLOB("long"),
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Images;
};
