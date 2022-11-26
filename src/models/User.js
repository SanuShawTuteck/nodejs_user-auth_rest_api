
const Sequelize = require('sequelize');

module.exports = (sequelize, DataType) => {
    const User = sequelize.define(
        'T_USER',       //table name
        {
            id: {
                type: DataType.UUID,
                defaultValue: DataType.UUIDV1,
                primaryKey: true,
            },
            name: {
                type: DataType.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataType.STRING(50),
                validate: { isEmail: true },
                allowNull: false,
            },
            password: {
                type: DataType.STRING(255),
                allowNull: false,
            },
            created_by: {
                type: DataType.UUID,
                defaultValue: DataType.UUIDV1,
                allowNull: false,
            },
            updated_by: {
                type: DataType.UUID,
                defaultValue: DataType.UUIDV1,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        },
        {
            freezeTableName: true
        },
        // {
        //     timestamps: true,
        //     createdAt: true,
        //     updatedAt: true,
        // },
        {
            hooks: {
                afterCreate: async (user, options) => {
                    await user.update({ updated_by: user.id })
                    await user.update({ created_by: user.id })
                    console.log("upDated");
                }
            }
        }
    );
    return User;
}


