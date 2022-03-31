const jwt = require("jsonwebtoken");
const fs = require("fs");
const models = require("../models");

exports.createPublication = (req, res, next) => {
	let imageUrl;
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	models.User.findOne({
		where: { id: userId },
	})
		.then((user) => {
			if (user !== null && user.isAdmin === true) {
				let message = req.body.message;
				if (req.file != undefined) {
					imageUrl = `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`;
				} else {
					imageUrl == null;
				}
				if (message == null && imageUrl == null) {
					res.status(400).json({ error: "Rien à publier." });
				} else {
					models.Publication.create({
						UserId: userId,
						message: message,
						image: imageUrl,
						status: 1,
					})
						.then((newMessage) => {
							res.status(201).json(newMessage);
						})
						.catch((err) => {
							res.status(500).json(err);
						});
				}
			} else {
				let message = req.body.message;
				if (req.file != undefined) {
					imageUrl = `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`;
				} else {
					imageUrl == null;
				}
				if (message == null && imageUrl == null) {
					res.status(400).json({ error: "Rien à publier." });
				} else {
					let date = new Date();
					models.Publication.create({
						UserId: userId,
						message: message,
						image: imageUrl,
						status: 0,
					})
						.then((newMessage) => {
							res.status(201).json(newMessage);
						})
						.catch((err) => {
							res.status(500).json(err);
						});
				}
			}
		})
		.catch((error) => res.status(500).json(error));
};

exports.getPublicationId = (req, res, next) => {
	let publicationId = req.params.id;

	models.Publication.findOne({
		include: models.User,
		attributes: ["UserId", "message", "image", "id", "createdAt"],
		where: { id: publicationId },
	})
		.then(function (publication) {
			if (publication) {
				res.status(200).json({ publication });
			} else {
				res.status(400).json({ error: "Publication introuvable." });
			}
		})
		.catch(function (err) {
			res.status(500).json({ err });
		});
};

exports.getPublications = (req, res, next) => {
	models.Publication.findAll({
		include: models.User,
		attributes: ["UserId", "message", "image", "id", "createdAt"],
		where: { status: 1 },
	})
		.then(function (publication) {
			if (publication) {
				res.status(200).json({ publication });
			} else {
				res.status(400).json({ error: "Publication introuvable." });
			}
		})
		.catch(function (err) {
			res.status(500).json({ err });
		});
};

exports.modifyMessage = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;

	let message = req.body.message;
	let publicationId = req.params.id;

	models.Publication.findOne({
		include: models.User,
		where: { id: publicationId, UserId: userId },
	})
		.then(function (publicationFound) {
			publicationFound
				.update({
					message: message,
				})
				.then(res.status(201).json({ message: "Mise à jour effectué." }));
		})
		.catch(function (err) {
			res.status(400).json({ err });
		});
};

exports.deletePublication = (req, res, next) => {
	const token = req.headers.authorization;
	const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
	const userId = decodedToken.userId;
	publicationId = req.params.id;

	models.Publication.findOne({
		where: { id: publicationId, UserId: userId },
	})
		.then(function (publicationFound) {
			if (publicationFound.image !== null) {
				const filename = publicationFound.image.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					publicationFound
						.destroy({
							where: { id: publicationId },
						})
						.then(res.status(200).json({ message: "Publication supprimer." }));
				});
			} else {
				publicationFound
					.destroy({
						where: { id: publicationId },
					})
					.then(res.status(200).json({ message: "Publication supprimer." }));
			}
		})
		.catch(function (err) {
			res.status(500).json(console.log(err));
		});
};
