<script>
let moment = require("moment");
import { mapState } from "vuex";

export default {
	name: "ReadPublication",
	data() {
		return {
			moment: moment,
			componentLoaded: false,
			list: [this.$store.dispatch("allPublications")],
			listComment: "",
			id: "",
			feed: "",
			comment: {
				username: "",
				comments: "",
			},
		};
	},
	mounted() {
		this.componentLoaded = true;
		this.id = this.$route.params.id;
		this.listComment = this.$store.dispatch("allComments", {
			id: this.$route.params.id,
		});
		if (this.$store.state.user.userId == -1) {
			this.$router.push("/register");
			return;
		}
		this.$store.dispatch("publicationId", { id: this.$route.params.id });
		this.$store.dispatch("userProfile");
	},
	computed: {
		...mapState({
			user: "profileUser",
			publication: "publicationFeed",
			message: "publicationInfos",
		}),
		message() {
			if (!this.componentLoaded) {
				return null;
			} else {
				return this.$store.state.message;
			}
		},
		comments() {
			if (!this.componentLoaded) {
				return null;
			} else {
				return this.$store.state.comments;
			}
		},
	},
	methods: {
		goToUpdate(id) {
			this.$router.push("/updatepublication/" + id);
		},
		deletePublication() {
			if (window.confirm("Êtes vous sûr de vouloir supprimer ce poste ?")) {
				this.$store.dispatch("deletePublication", { id: this.id });
				window.alert(
					"Votre publication a bien été supprimer, vous allez être rediriger."
				);
				this.$router.push("/home");
			}
		},
		deletePublicationAdmin() {
			if (window.confirm("Êtes vous sûr de vouloir supprimer ce poste ?")) {
				this.$store.dispatch("deletePublicationAdmin", { id: this.id });
				this.$router.push("/home");
				window.alert(
					"La publication a bien été supprimé, vous allez être rediriger."
				);
			}
		},
		createComment() {
			this.$store.commit("commentInfos");
			this.$store.dispatch("createComment", {
				id: this.id,
				comment: this.comment.comments,
			});
			if(this.user.isAdmin === true){
				window.alert(
					"Votre commentaire a été posté."
				);
				window.location.reload();
			} else {
			window.alert(
				"Votre commentaire a bien été posté, un administrateur va le valider."
			);
			window.location.reload();
			}
		},
		goToComment(id) {
			this.$router.push("/comments/" + id);
		},
	},
};
</script>
<template>
	<head>
		<link
			href="https://fonts.googleapis.com/icon?family=Material+Icons"
			rel="stylesheet" />
	</head>
	<div class="main--container" v-if="componentLoaded === true">
		<h6 class="mt-3">Publication</h6>
		<div class="card">
			<div class="card-body">
				<div class="d-flex align-items-center fw-bold">
					<img
						v-if="message.User.avatar !== null"
						:src="message.User.avatar"
						class="rounded-circle"
						alt="Avatar de profile"
						width="40"
						height="40" />
					<img
						v-else
						src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						class="rounded-circle"
						alt="Avatar"
						width="70" />
					{{ message.User.username }}
					a publié
				</div>
				<span
					@click="goToUpdate(id)"
					class="edit__button"
					v-if="this.$store.state.user.userId === this.message.UserId"
					>Modifier</span
				>
				<span v-else></span>
				<span
					@click.prevent="deletePublication(id)"
					class="delete__button"
					v-if="this.$store.state.user.userId === this.message.UserId && this.$store.state.user.isAdmin === false"
					>Supprimer</span
				>
				<span
					class="delete__button"
					@click="deletePublicationAdmin(id)"
					v-if="this.$store.state.user.isAdmin === true"
					>Supprimer</span
				>
				<div class="dropdown-divider"></div>
				<div
					class="card-text d-flex justify-content-between align-items-md-center flex-column">
					<p class="card-text d-flex flex-start fw-bold">
						{{ message.message }}
					</p>
					<span>{{ moment(message.createdAt).locale("fr").fromNow() }}</span>
				</div>
			</div>
			<img
				v-if="message.image !== null"
				class="card-img-top"
				alt="Photo de publication"
				:src="message.image" />
			<div class="dropdown-divider"></div>
			<h6 class="comment__title">Commentaires</h6>
			<div class="cards">
				<input
					v-model="this.comment.comments"
					class="form-control"
					type="text"
					placeholder="Un commentaire ?"
					aria-label="Votre message" />
				<button
					v-if="this.comment.comments.length < 120"
					id="send__button"
					@click="createComment()"
					type="button"
					class="btn btn-secondary">
					Envoyez
				</button>
				<span v-else class="text-danger">Votre commentaire est trop long.</span>
			</div>
			<div
				@click="goToComment(comment.id)"
				class="d-flex"
				id="commentary__list"
				v-for="comment in comments"
				:key="comment.id">
				<p
					id="commentary__username"
					class="d-flex align-items-center m-0 fw-bold">
					<img
						v-if="comment.User.avatar !== null"
						:src="comment.User.avatar"
						class="rounded-circle"
						alt="Avatar de profile"
						width="40"
						height="40" />
						
					{{ comment.User.username }} a commenté
				</p>
				<span class="material-icons position-absolute">more_horiz</span>
				<p class="comment--text m-0 position-relative">{{ comment.comment }}</p>
				<span class="comment--date">{{
					moment(comment.createdAt).locale("fr").fromNow()
				}}</span>
			</div>
		</div>
	</div>
	<div v-else>
		<h1>Chargement..</h1>
	</div>
</template>
<style lang="scss" scoped>
.comment--date {
	align-self: flex-end;
}
.comment__title {
	margin-bottom: 0rem;
	margin-top: 0.5rem;
}
img {
	margin-right: 0.5rem;
}
.main--container {
	width: 70%;
	background: #eae7e152;
	border: 1px solid #0000003f;
	margin: auto;
	height: fit-content;
	min-height: 100vh;
}
.card {
	box-shadow: 10px 5px 5px #c7c7c741;
	border: 1px rgba(0, 0, 0, 0.281) solid;
	width: 50%;
	margin: 1rem auto auto auto;
}
#send__button {
	margin: 0.5rem;
}
#commentary__list {
	flex-direction: column;
	align-items: flex-start;
	background-color: rgba(75, 75, 75, 0.075);
	margin: 0.8rem;
	width: 90%;
	padding: 0.5rem;
	border-radius: 0.3rem;
	cursor: pointer;
	&:hover {
		transition-timing-function: ease-in;
		transition: 0.1s;
		border: 1.6px solid rgba(0, 0, 0, 0.178);
	}
	#commentary__username {
		width: 100%;
		margin-right: 1rem;
	}
}

.comment--text {
	margin-left: 3rem !important;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: normal;
	max-width: 70%;
}
.material-icons {
	right: 9%;
	&:hover {
		color: #6e0505;
	}
}
.form-control {
	width: 90%;
	display: flex;
	margin: 0.5rem;
}
.message__date {
	font-size: 1rem;
	position: absolute;
	bottom: 5%;
	right: 1%;
}
.cards {
	display: flex;
	align-items: center;
	width: 100% !important;
	font-size: 1rem;
}
.card-body {
	position: relative;
}
.card-img-top {
	max-height: 300px;
	max-width: fit-content;
	margin: auto;
}
.edit__button {
	position: absolute;
	top: 5%;
	right: 5%;
	font-size: 0.8rem;
	color: rgb(126, 132, 134);
	cursor: pointer;
	&:hover {
		color: rgb(57, 131, 153);
	}
}
.delete__button {
	position: absolute;
	top: 15%;
	right: 5%;
	color: rgb(161, 40, 3);
	font-size: 0.8rem;
	cursor: pointer;
	&:hover {
		color: red;
	}
}
p.card-text {
	margin: 0.2rem;
}

@media (max-width: 768px) {
	.card {
		width: auto;
	}
	.delete__button {
		width: fit-content;
		top: 1%;
		left: 1%;
	}
	.edit__button {
		top: 1%;
	}
}
</style>
