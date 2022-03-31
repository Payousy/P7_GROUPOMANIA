<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			usersList: "",
		};
	},
	mounted() {
		if (this.$store.state.user.userId == -1) {
			this.$router.push("/register");
			return;
		}
		this.usersList = this.$store.dispatch("allUsersAdmin");
	},
	computed: {
		...mapState({
			user: "profileUser",
		}),
	},
	methods: {
		userId(id) {
			this.$router.push("/adminuser/" + id);
		},
	},
};
</script>

<template>
	<div class="container-sm p-3 mb-3" id="container__admin">
		<h5 class="mt-3">
			Vous trouverez ici la liste des utilisateurs du site. Vous pouvez cliquez
			sur un profil pour le supprimer.
		</h5>
	</div>
	<div class="container-sm">
		<div v-for="user in user" :key="user.id" class="card p-2 mb-3">
			<div class="card-body" @click="userId(user.id)">
				<div>
					<img
						v-if="user.avatar !== null"
						:src="user.avatar"
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
					{{ user.username }}
				</div>
				<div class="dropdown-divider"></div>
				<div
					class="card-text d-flex justify-content-center align-items-md-center">
					<p class="card-text d-flex flex-start">{{ user.email }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.card {
	cursor: pointer;
	&:hover {
		transition: ease-in;
		border: 2px solid rgba(0, 0, 0, 0.171);
	}
}

#container__admin {
	width: 60%;
	padding: 0.5rem;
	background-color: #0000000f;
	border-radius: 1rem;
	margin-top: 1rem;
}
.container-sm {
	width: 30%;
}
</style>
