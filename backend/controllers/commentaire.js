const jwt = require("jsonwebtoken");
const fs = require("fs");
const models = require("../models");

exports.createComment = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	let comment = req.body.comment;
	let publicationId = req.params.id;

	models.User.findOne({
		where: { id: userId },
	})
		.then(function (user) {
			if (user.isAdmin === true) {
				models.Commentaire.create({
					UserId: userId,
					PublicationId: publicationId,
					comment: comment,
					status: 1,
				});
			} else {
				models.Commentaire.create({
					UserId: userId,
					PublicationId: publicationId,
					comment: comment,
					status: 0,
				});
			}
		})
		.then(function (createComment) {
			return res.status(200).json({
				idCommentaire: createComment,
			});
		})
		.catch(function (err) {
			return res.status(500).json({ err });
		})
		.catch(function (err) {
			return res.status(500).json({ err });
		});
};

exports.getComments = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	publicationId = req.params.id;

	models.Commentaire.findAll({
		include: models.User,
		where: { publicationId: publicationId, status: 1 },
	})
		.then(function (comment) {
			if (comment) {
				res.status(200).json({ comment });
			} else {
				res.status(404).json({ error: "Message non trouvé." });
			}
		})
		.catch(function (err) {
			res.status(500).json(console.log(err));
		});
};

exports.getCommentId = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	commentId = req.params.id;

	models.Commentaire.findOne({
		attributes: ["userId", "id", "comment"],
		include: models.User,
		where: { id: commentId },
	})
		.then(function (comment) {
			if (comment) {
				console.log(comment);
				res.status(200).json({ comment });
			} else {
				res.status(404).json({ error: "Message non trouvé." });
			}
		})
		.catch(function (err) {
			res.status(500).json(console.log(err));
		});
};

exports.updateComment = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	commentId = req.params.id;

	let comment = req.body.comment;

	models.Commentaire.findOne({
		attributes: ["id"],
		include: models.User,
		where: { id: commentId, userId: userId },
	})
		.then(function (commentFound) {
			commentFound
				.update({
					comment: comment,
				})
				.then(res.status(201).json({ message: "Mise à jour effectué." }));
		})
		.catch(function (err) {
			res
				.status(400)
				.json({ error: "Impossible de mettre  à jour le message." });
		});
};

exports.deleteComment = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	commentId = req.params.id;

	models.Commentaire.findOne({
		attributes: ["id"],
		where: { id: commentId, userId: userId },
	})
		.then(function (commentFound) {
			commentFound
				.destroy({
					where: { id: userId },
				})
				.then(res.status(200).json({ message: "Message supprimé." }));
		})
		.catch(function (err) {
			res.status(500).json({ err });
		});
};
