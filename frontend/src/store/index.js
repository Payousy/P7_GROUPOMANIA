import { createStore } from "vuex";
const axios = require("axios");
const instance = axios.create({
	baseURL: "http://localhost:3000/api/",
});

let user = sessionStorage.getItem("user");
if (!user) {
	user = {
		userId: -1,
		token: "",
	};
} else {
	try {
		user = JSON.parse(user);
		instance.defaults.headers.common["Authorization"] = user.token;
	} catch (ex) {
		user = {
			userId: -1,
			token: "",
			isAdmin: "",
		};
	}
}

export default createStore({
	state: {
		status: "",

		user: user,

		profileUser: {
			email: "",
			username: "",
			bio: "",
			isAdmin: "",
			avatar: "",
		},

		publicationInfos: {
			UserId: "",
			id: "",
			message: "",
			image: "",
			username: "",
			status: "",
			createdAt: "",
		},
	},

	commentInfos: {
		id: "",
		PublicationId: "",
		UserId: "",
		comment: "",
		createdAt: "",
		avatar: ""
	},

	getters: {},

	mutations: {
		setStatus(state, status) {
			state.status = status;
		},
		logUser(state, user) {
			instance.defaults.headers.common["Authorization"] = user.token;
			sessionStorage.setItem("user", JSON.stringify(user));
			state.user = user;
		},
		logoutUser: function (state) {
			state.user = {
				userId: -1,
				token: "",
			};
			sessionStorage.removeItem("user");
		},
		profileUser(state, profileUser) {
			state.profileUser = profileUser;
		},
		publicationFeed(state, publicationFeed) {
			state.publicationFeed = publicationFeed;
		},
		publicationInfos(state, publicationInfos) {
			state.publicationInfos = publicationInfos;
		},
		commentInfos(state, commentInfos) {
			state.commentInfos = commentInfos;
		},
		updateProfile(state, profileUser) {
			state.profileUser = profileUser;
		},
		updatePublication: function (state, publicationInfos) {
			state.publicationInfos = publicationInfos;
		},
		setMessage: function (state, message) {
			state.message = message;
		},
		setComment: function (state, comment) {
			state.comment = comment;
		},
		setMessages: function (state, messages) {
			state.messages = messages.slice().reverse();
		},
		setComments: function (state, comments) {
			state.comments = comments.slice().reverse();
		},
	},
	actions: {
		createAccount: ({ commit }, userInfos) => {
			commit("setStatus", "loading");
			return new Promise((resolve, reject) => {
				instance
					.post("/auth/signup", userInfos)
					.then(function (response) {
						commit("setStatus", "created");
						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_create");
						reject(error);
					});
			});
		},
		signIn: ({ commit }, userInfos) => {
			commit("setStatus", "loading");
			return new Promise((resolve, reject) => {
				commit;
				instance
					.post("/auth/login", userInfos)
					.then(function (response) {
						commit("setStatus", "");
						commit("logUser", response.data);
						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_signIn");
						reject(error);
					});
			});
		},
		userProfile: ({ commit }) => {
			instance
				.get("/auth/profile")
				.then(function (response) {
					commit("profileUser", response.data);
				})
				.catch(function (error) {
					return error
				});
		},
		userProfileId: ({ commit }, user) => {
			instance
				.get("/auth/profile/" + user.id)
				.then(function (response) {
					commit("profileUser", response.data);
				})
				.catch(function (error) {
					return error
				});
		},
		updateProfile({ commit }, profileUser) {
			instance
				.put("/auth/update", profileUser)
				.then(function (reponse) {
					commit("profileUser", reponse.data);
				})
				.catch(function (error) {
					commit("setStatus", "profileUser");
					return error
				});
		},
		deleteProfile({ commit }, profileUser) {
			instance.delete("/auth/delete", profileUser).then(function (reponse) {
				commit("profileUser", reponse.data);
			});
		},
		///////////////////// ACTION LIES AUX PUBLICATIONS /////////////////////
		publicationPost: ({ commit }, publicationInfos) => {
			commit("publicationInfos", "created");
			return new Promise((resolve, reject) => {
				commit;
				instance
					.post("/publications", publicationInfos)
					.then(function (response) {
						commit("publicationInfos", response);
						resolve(response);
					})
					.catch(function (error) {
						commit("setStatus", "error_signIn");
						reject(console.log(error));
					});
			});
		},
		publicationId: ({ commit }, messages) => {
			instance
				.get("/publications/" + messages.id)
				.then(function (response) {
					commit("setMessage", response.data.publication);
					this.feed = response.data.publication.data;
				})
				.catch(function (error) {
					return error
				});
		},
		allPublications: ({ commit }) => {
			instance
				.get("/publications")
				.then(function (response) {
					commit("setMessages", response.data.publication);
					this.list = response.data.publication;
				})
				.catch(function (error) {
					return error
				});
		},
		updatePublication({ commit }, message) {
			instance
				.put("/publications/" + message.id, {
					message: message.message,
				})
				.then(function (response) {
					commit("publicationInfos", response.data);
				})
				.catch(function (error) {
					return error
				});
		},
		deletePublication({ commit }, message) {
			instance.delete("/publications/" + message.id).then(function (reponse) {
				commit("publicationInfos", reponse.data);
			});
		},
		///////////////////// ACTION LIES AUX COMMENTAIRES /////////////////////
		createComment: ({ commit }, comment) => {
			let comments = comment;
			commit("commentInfos");
			return new Promise((resolve, reject) => {
				commit;
				instance
					.post("/comments/" + comment.id, comments)
					.then(function (response) {
						commit("commentInfos", response.data);
						resolve(response);
					})
					.catch(function (error) {
						commit;
						reject(error);
					});
			});
		},
		allComments: ({ commit }, message) => {
			instance
				.get("/comments/" + message.id)
				.then(function (response) {
					commit("setComments", response.data.comment);
					this.listComment = response.data.comment;
				})
				.catch(function (error) {
					return error
				});
		},
		commentId: ({ commit }, comment) => {
			instance
				.get("/comments/comment/" + comment.id)
				.then(function (response) {
					commit("setComment", response.data.comment);
					this.OneComment = response.data.comment.id;
				})
				.catch(function (error) {
					return error
				});
		},
		deleteComment({ commit }, comment) {
			instance
				.delete("/comments/delete/" + comment.id)
				.then(function (reponse) {
					commit("commentInfos", reponse.data);
				});
		},
		updateComment({ commit }, comment) {
			instance
				.put("/comments/update/" + comment.id, {
					comment: comment.comment,
				})
				.then(function (response) {
					commit("commentInfos", response.data);
				})
				.catch(function (error) {
					return error
				});
		},
		///////////////////// ACTION LIES AUX ADMINISTRATEURS /////////////////////
		allPublicationsAdmin: ({ commit }) => {
			instance
				.get("/admin")
				.then(function (response) {
					commit("setMessages", response.data.publication);
					this.list = response.data.publication;
				})
				.catch(function (error) {
					return error
				});
		},
		allCommentairesAdmin: ({ commit }) => {
			instance
				.get("/admin/commentaire")
				.then(function (response) {
					response.data.commentaire.forEach((element) => console.log(element));
					commit("setComments", response.data.commentaire);
					this.listComment = response.data.commentaire;
				})
				.catch(function (error) {
					return error
				});
		},
		allUsersAdmin: ({ commit }) => {
			instance.get("/admin/users").then(function (response) {
				console.log(response.data.users);
				commit("profileUser", response.data.users);
			});
		},
		userById: ({ commit }, user) => {
			instance.get("/admin/users/" + user.id).then(function (response) {
				commit("profileUser", response.data);
			});
		},
		updateStatus({ commit }, message) {
			instance
				.put("/admin/updatestatus/" + message.id, {
					status: message.status,
				})
				.then(function (response) {
					commit("publicationInfos", response.data);
				})
				.catch(function (error) {
					return error
				});
		},
		updateStatusComment({ commit }, comment) {
			instance
				.put("/admin/updatestatuscomment/" + comment.id, {
					status: comment.status,
				})
				.then(function (response) {
					commit("publicationInfos", response.data);
				})
				.catch(function (error) {
					return error
				});
		},
		deleteUser({ commit }, user) {
			instance
				.delete("/admin/users/delete/" + user.id)
				.then(function (reponse) {
					commit("profileUser", reponse.data);
				});
		},
		deleteCommentAdmin({ commit }, comment) {
			instance
				.delete("/admin/commentaire/delete/" + comment.id)
				.then(function (reponse) {
					commit("commentInfos", reponse.data);
				});
		},
		deletePublicationAdmin({ commit }, publication) {
			instance
				.delete("/admin/publication/delete/" + publication.id)
				.then(function (reponse) {
					commit("publicationInfos", reponse.data);
				});
		},
	},
	modules: {},
});
