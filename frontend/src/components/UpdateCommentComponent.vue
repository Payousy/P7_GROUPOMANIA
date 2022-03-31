<script>
export default {
	name: "UpdatePublicationComponent",
	data() {
		return {
			comment: {
				comment: "",
				id: "",
			},
		};
	},

	mounted() {
		this.id = this.$route.params.id;
		if (this.$store.state.user.userId == -1) {
			this.$router.push("/register");
			return;
		}
	},

	methods: {
		updateComment() {
			this.$store.dispatch("updateComment", {
				id: this.id,
				comment: this.comment.comment,
			});
			window.alert('Votre commentaire a bien été modifié.')
			this.$router.push("/home");
		},
	},
};
</script>
<template>
	<div class="form-floating pt-5 mt-5 w-50 d-flex flex-column m-auto">
		<div class="d-flex justify-content-center">
			<p>Vous pouvez mettre à jour votre commentaire</p>
		</div>
		<div class="form-floating mb-1">
			<input
				v-model="comment.comment"
				type="text"
				class="form-control mb-2"
				placeholder="comment" />
		</div>
		<button v-if="comment.comment.length < 220 && comment.comment.length >= 3" @click="updateComment()" class="btn btn-outline-primary btn-sm">
			Mettre à jour
		</button>
		<span v-if="comment.comment.length < 3 " class="text-danger">Votre commentaire est trop court.</span>
		<span v-if="comment.comment.length > 220" class="text-danger">Votre commentaire est trop long !</span>

	</div>
</template>
<style></style>
