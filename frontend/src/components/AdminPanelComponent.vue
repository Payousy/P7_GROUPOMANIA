<script>
let moment = require("moment");
import { mapState } from "vuex";

export default {
	data() {
		return {
			moment: moment,
			list: [this.$store.dispatch("allPublicationsAdmin")],
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
		this.$store.dispatch("userProfile");
	},
	computed: {
		...mapState({
			user: "profileUser",
			publication: "publicationFeed",
			message: "publicationInfos",
		}),
		messages() {
			return this.$store.state.messages;
		},
	},
	methods: {
		publicationId(id) {
			this.$router.push("/adminpublications/" + id);
		},
	},
};
</script>

<template>
	<div v-if="user.isAdmin == true" class="container-sm" id="container__admin">
		<h4>Bienvenue sur la page d'administration</h4>
		<p>Vous verrez ici toutes les publications en attente de modération.</p>
		<p>
			Pour valider une publication, cliquez d'abord sur la publication puis
			ensuite sur le bouton valider.
		</p>
		<p>
			Vous pouvez si vous jugez que c'est nécessaire, supprimer cette
			publication.
		</p>
	</div>

	<nav>
		<router-link to="/admincommentaires/">Valider les commentaires</router-link>
		<router-link to="/adminuser/">Bannir des utilisateurs</router-link>
	</nav>
	<h5>Publications en attente de validation ..</h5>
	<div class="container-sm" v-if="user.isAdmin == true">
		<div
			v-for="message in messages"
			:key="message.id"
			:message="message"
			class="card p-2"
			style="width: 18rem">
			<div class="card-body" @click="publicationId(message.id)">
				<span class="d-flex align-items-center">
					<img
						v-if="message.User.avatar !== null"
						:src="message.User.avatar"
						class="rounded-circle"
						alt="Avatar"
						width="50"
						height="50" />
					<img
						v-else
						src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
						class="img-fluid profile-image"
						width="50"
						height="50" />
					{{ message.User.username }}
				</span>
				<div class="dropdown-divider"></div>
				<div
					class="card-text d-flex justify-content-between align-items-md-center">
					<p class="card-text d-flex flex-start">{{ message.message }}</p>
				</div>
				<span class="message__date">{{
					moment(message.createdAt).locale("fr").fromNow()
				}}</span>
			</div>
			<img
				v-if="message.image !== null"
				class="card-img-top"
				alt="Image de publication"
				:src="message.image" />
		</div>
	</div>
	<h4 onload="verificationAdmin()" v-else class="text-danger mt-3">
		Oups vous n'avez rien à faire ici.
	</h4>
</template>

<style lang="scss" scoped>
nav {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	& > a {
		padding: 1rem;
		border-radius: 1rem;
		background-color: #231f47;
		color: white;
		text-decoration: none;
		&:hover {
			background-color: lighten($color: #231f47, $amount: 20%);
		}
	}
}
.container-sm {
	width: 30%;
}
.message__date {
	font-size: 1rem;
	bottom: 5%;
	right: 1%;
}
.card {
	width: 100% !important;
	font-size: 1.5rem;
	margin-top: 1rem;
}
.card-body {
	position: relative;
	cursor: pointer;
}
p.card-text {
	margin: 0.2rem;
	font-size: 1rem;
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
