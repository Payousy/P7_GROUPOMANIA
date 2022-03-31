const { Sequelize } = require("sequelize");

const db = new Sequelize("groupomania", "root", "Mbeyt@87", {
  host: "localhost",
  dialect: "mysql",
});

//(async () => { await db.sync(); })();

module.exports = db;

/*function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}*/
