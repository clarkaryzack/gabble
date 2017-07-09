'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    body: DataTypes.STRING
  }, {
		//class methods are old and don't work:

    // classMethods: {
    //   associate: function(models) {
    //     // associations can be defined here
    //   }
    // }
		//
		// 	})
  });

	post.associate = function(models) {
		post.belongsTo(models.user,{
			as:'userALIAS',
			foreignKey:'userId'
		})
	};


  return post;
};
