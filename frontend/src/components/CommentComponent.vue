<script>
import { mapState } from "vuex";
export default {
	name: "ReadComment",
	data() {
		return {
			componentLoaded: false,
			OneComment: "",
			id: "",
		};
	},
	mounted() {
		this.componentLoaded = true;
		this.id = this.$route.params.id;
		if (this.$store.state.user.userId == -1) {
			this.$router.push("/register");
			return;
		}
		this.$store.dispatch("commentId", { id: this.$route.params.id });
		this.$store.dispatch("userProfile");
	},
	computed: {
		...mapState({
			user: "profileUser",
			comment: "commentInfos",
		}),
		comment() {
			if (!this.componentLoaded) {
				return null;
			} else {
				return this.$store.state.comment;
			}
		},
	},
	methods: {
		deleteComment() {
			if (
				window.confirm("Êtes vous sûr de vouloir supprimer ce commentaire ?")
			) {
				this.$store.dispatch("deleteComment", { id: this.id });
				window.alert(
					"Votre commentaire a bien été supprimer, vous allez être rediriger."
				);
				this.$router.push("/home");
			}
		},
		deleteCommentAdmin() {
			if (
				window.confirm("Êtes vous sûr de vouloir supprimer ce commentaire ?")
			) {
				this.$store.dispatch("deleteCommentAdmin", { id: this.id });
				window.alert("Votre commentaire a bien été supprimé.");
				this.$router.push("/home");
			}
		},
		goToUpdate(id) {
			this.$router.push("/updatecomment/" + id);
		},
	},
};
</script>

<template>
	<div class="main--container" v-if="componentLoaded === true">
		<h6 class="mt-3">Commentaire</h6>
		<div class="d-flex card">
			<p id="commentary__username" class="badge mr-2">
				<img
					v-if="comment.User.avatar !== null"
					:src="comment.User.avatar"
					class="rounded-circle"
					alt="Avatar de profile"
					width="40"
					height="40" />
				<img
					v-else
					src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
					class="img-fluid profile-image"
					width="70" />
				{{ comment.User.username }} :
			</p>
			<div class="dropdown-divider"></div>
			<p class="m-0 p-3">{{ comment.comment }}</p>
			<div v-if="this.$store.state.user.userId === this.comment.userId">
				<span @click="deleteComment()" class="delete__button">Supprimer</span>
				<span @click="goToUpdate(id)" class="edit__button">Modifier</span>
			</div>
			<div v-if="this.$store.state.user.isAdmin === true">
				<span @click="deleteCommentAdmin()" class="delete__button"
					>Supprimer</span
				>
			</div>
		</div>
	</div>
	<div v-else></div>
</template>

<style lang="scss" scoped>
.d-flex {
	width: 50%;
	margin: 1rem auto auto auto;
	height: auto;
	box-shadow: 10px 5px 5px #c7c7c700;
}
.delete__button {
	position: absolute;
	top: 25%;
	right: 5%;
	color: rgb(161, 40, 3);
	font-size: 0.8rem;
	cursor: pointer;
	&:hover {
		color: red;
	}
}

.main--container {
	width: 70%;
	background: #eae7e152;
	border: 1px solid #0000003f;
	margin: auto;
	height: 100vh;
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
#commentary__username {
	width: fit-content;
	margin: 0.5rem;
	color: black;
	font-size: 1rem;
}
.card {
	box-shadow: 10px 5px 5px #c7c7c741;
	width: 50%;
	margin-bottom: 2rem;
	border: 1px rgba(0, 0, 0, 0.281) solid;
}
@media (max-width: 768px) {
	.card {
		width: auto;
	}
}
</style>
