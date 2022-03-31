<script>
import { mapState } from "vuex";
let moment = require("moment");
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
			comment: "commentInfos",
		}),
		message() {
			if (!this.componentLoaded) {
				return null;
			} else {
				return this.$store.state.message;
			}
		},
	},
	methods: {
		goToUpdate(id) {
			this.$router.push("/updatepublication/" + id);
		},
		deletePublication() {
			this.$store.dispatch("deletePublicationAdmin", { id: this.id });
			this.$router.push("/admin");
			window.alert(
				"La publication a bien été supprimé, vous allez être rediriger."
			);
		},
		switchStatus() {
			this.$store.dispatch("updateStatus", { id: this.id });
			this.$router.push("/admin");
			window.alert(
				"La publication a bien été validé, vous allez être rediriger."
			);
		},
	},
};
</script>
<template>
	<h6 class="mt-5">Ici vous pouvez valider une publication ou la supprimer</h6>
	<div class="container-sm" v-if="componentLoaded === true">
		<div class="card-body">
			<img
				v-if="message.User.avatar !== null"
				:src="message.User.avatar"
				class="rounded-circle"
				width="50"
				alt="Avatar"
				height="50" />
			<img
				v-else
				src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
				class="img-fluid profile-image"
				width="50"
				height="50" />
			<span>{{ message.User.username }}</span>
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
		<div class="d-flex">
			<button
				@click="switchStatus()"
				type="button"
				class="btn btn-success btn-sm m-1">
				Valider la publication
			</button>
			<button @click="deletePublication()" class="btn btn-danger m-1">
				Supprimer
			</button>
		</div>
	</div>
	<div v-else>
		<h1>test</h1>
	</div>
</template>
<style lang="scss" scoped>
.container-sm {
	width: 30%;
	box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
	margin-top: 2rem;
	padding: 1rem;
	border-radius: 0.5rem;
}
.badge {
	display: flex;
	align-content: flex-start;
	margin: 0.2rem;
	width: fit-content;
}
p.card-text {
	margin: 0.2rem;
	font-size: 1rem;
}
@media (max-width: 768px) {
	.btn {
		width: 40%;
	}
	.d-flex {
		justify-content: space-evenly;
	}
	.container-sm {
		width: 100% !important;
	}
}
</style>
