'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

	like.associate = function(models) {
		like.belongsTo(models.post,{
			as:'postALIAS',
			foreignKey:'postId'
		})
	};

	like.associate = function(models) {
		like.belongsTo(models.user,{
			as:'userALIAS',
			foreignKey:'userId'
		})
	};

  return like;
};
