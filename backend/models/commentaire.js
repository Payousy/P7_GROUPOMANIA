"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association head
      models.Commentaire.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.Commentaire.belongsTo(models.Publication, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Commentaire.init(
    {
      UserId: DataTypes.INTEGER,
      PublicationId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Commentaire",
    }
  );
  return Commentaire;
};
