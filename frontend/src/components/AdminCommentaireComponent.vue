<script>
import { mapState } from "vuex";
let moment = require("moment");

export default {
	data() {
		return {
			moment: moment,
			listComment: "",
		};
	},

	mounted() {
		this.componentLoaded = true;
		if (
			this.$store.state.user.userId == -1 ||
			this.$store.state.user.isAdmin == false
		) {
			this.$router.push("/register");
			return;
		}
		this.listComment = this.$store.dispatch("allCommentairesAdmin");
		this.$store.dispatch("userProfile");
	},
	computed: {
		...mapState({
			user: "profileUser",
			comment: "commentInfos",
		}),
		comments() {
			return this.$store.state.comments;
		},
	},
	methods: {
		commentId(id) {
			this.$router.push("/admincommentaire/" + id);
		},
	},
};
</script>

<template>
	<div v-if="user.isAdmin == true" class="container-sm" id="container__admin">
		<h4>Bienvenue sur la page d'administration</h4>
		<p>Vous verrez ici tout les commentaires en attente de modération.</p>
		<p>
			Pour valider un commentaire, cliquez d'abord sur la publication puis
			ensuite sur le bouton valider.
		</p>
		<p>
			Vous pouvez si vous jugez que c'est nécessaire, supprimer le commentaire.
		</p>
	</div>
	<h5 class="mt-3">Commentaire en attente de validation ..</h5>
	<div class="container-sm" v-if="user.isAdmin == true">
		<div
			v-for="comment in comments"
			:key="comment.id"
			:comment="comment"
			class="card p-2"
			style="width: 18rem">
			<div class="card-body" @click="commentId(comment.id)">
				<div class="d-flex flex-row align-items-center">
					<img
						v-if="comment.User.avatar !== null"
						:src="comment.User.avatar"
						alt="Avatar"
						class="rounded-circle"
						width="50"
						height="50" />
					<img
						v-else
						alt="Avatar"
						src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						class="img-fluid profile-image"
						width="50"
						height="50" />
					<p class="m-0 fw-bold">{{ comment.User.username }}</p>
				</div>
				<div class="dropdown-divider"></div>
				<div
					class="card-text d-flex justify-content-between align-items-md-center flex-column">
					<p class="card-text d-flex flex-start">{{ comment.comment }}</p>
					<span class="message__date">{{
						moment(comment.createdAt).locale("fr").fromNow()
					}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.m-0 {
	font-size: 1rem;
}
.container-sm {
	width: 30%;
}
.message__date {
	font-size: 0.9rem;
}
.card {
	width: 100% !important;
	font-size: 1.5rem;
	margin-top: 1rem;
	box-shadow: 10px 5px 5px #c7c7c741;
	width: auto;
	margin-bottom: 2rem;
	border: 1px rgba(0, 0, 0, 0.281) solid;
}
.card-body {
	cursor: pointer;
}
p.card-text {
	margin: 0.2rem;
	font-size: 1.3rem;
}
#container__admin {
	width: 60%;
	padding: 0.5rem;
	background-color: #0000000f;
	border-radius: 1rem;
	margin-top: 1rem;
}
@media (max-width: 768px) {
	.container-sm {
		margin: 0;
		width: 100%;
	}
	.card {
		width: 100%;
	}
	#container__admin {
		width: auto;
		padding: 0.5rem;
		background-color: #0000000f;
		border-radius: 1rem;
		margin: 1rem;
	}
}
</style>
