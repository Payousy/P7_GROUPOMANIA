<script>
import { mapState } from "vuex";
import ModaleDeleteComponent from "./ModaleDeleteComponent.vue";
export default {
	data() {
		return {
			componentLoaded: false,
			OneUser: "",
			id: "",
			revele: false,
		};
	},
	mounted() {
		this.componentLoaded = true;
		if (this.$store.state.user.userId == -1) {
			this.$router.push("/register");
			return;
		}
		this.OneUser = this.$store.dispatch("userById", {
			id: this.$route.params.id,
		});
	},
	computed: {
		...mapState({
			user: "profileUser",
		}),
		user() {
			if (!this.componentLoaded) {
				return null;
			} else {
				return this.$store.state.profileUser;
			}
		},
	},
	methods: {
		deleteProfile() {
			this.$store.dispatch("deleteUser", {
				id: this.$route.params.id,
			});
			this.$router.push("/adminuser");
			window.alert("Compte supprimé avec succès, vous allez être rediriger.");
		},
		toggleModale() {
			this.revele = !this.revele;
		},
	},
	components: { ModaleDeleteComponent },
};
</script>

<template>
	<h4 class="mt-4">
		Vous pouvez sur cette page, bannir un utilisateur du site. Attention cette
		action est irréversible.
	</h4>
	<div
		v-if="componentLoaded === true"
		class="d-flex justify-content-center card m-auto">
		<p class="fw-bold m-0 align-items-center p-3">
			<img
				v-if="user.customer.avatar !== null"
				:src="user.customer.avatar"
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
			{{ user.customer.username }}
		</p>
		<div class="dropdown-divider"></div>
		<p>{{ user.customer.email }}</p>
	</div>
	<ModaleDeleteComponent
		v-bind:revele="revele"
		v-bind:toggleModale="toggleModale"
		v-bind:deleteProfile="deleteProfile"></ModaleDeleteComponent>
	<div class="btn btn-danger" @click="toggleModale">Bannir cet utilisateur</div>
</template>

<style lang="scss" scoped>
.card {
	width: 40%;
	box-shadow: 10px 5px 5px #c7c7c741;
	border: 1px rgba(0, 0, 0, 0.281) solid;
}
.d-flex {
	width: 20%;
}
.btn {
	width: 20%;
}
@media (max-width: 768px) {
	.card {
		width: 70%;
	}
	.btn {
		width: 70%;
	}
}
</style>
