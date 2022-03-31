<script>
import useValidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
	name: "UpdatePublicationComponent",
	setup() {
		const state = reactive({
			post: {
				message: "",
				id: "",
			},
		});
		const rules = computed(() => {
			return {
				post: {
					message: {
						required,
						minLength: helpers.withMessage(
							"Votre publication est trop courte.",
							minLength(4)
						),
					},
				},
			};
		});
		const v$ = useValidate(rules, state);
		return {
			state,
			v$,
		};
	},
	data() {
		return {
			post: {
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
		updatePublication() {
			this.v$.$validate();
			if (this.v$.$error) {
				console.log("Erreur dans l'input");
			} else {
				this.$store.dispatch("updatePublication", {
					id: this.id,
					message: this.state.post.message,
				});
				window.alert("Message modifié, vous allez être rediriger.");
				this.$router.push("/home");
			}
		},
	},
};
</script>
<template>
	<div class="main--container">
		<div class="form-floating w-50 d-flex mt-3 flex-column m-auto">
			<div class="d-flex justify-content-center">
				<p>Vous pouvez mettre à jour votre message.</p>
			</div>
			<div class="form-floating mb-1">
				<input
					v-model="state.post.message"
					type="text"
					class="form-control mb-2 pt-0"
					placeholder="Message" />
			</div>
			<button
				@click="updatePublication()"
				class="btn btn-outline-success bg-success btn-sm">
				Mettre à jour
			</button>
			<span class="text-danger" v-if="v$.post.message.$error">{{
				v$.post.message.$errors[0].$message
			}}</span>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.btn {
	color: white;
}
.main--container {
	width: 70%;
	background: #eae7e152;
	border: 1px solid #0000003f;
	margin: auto;
	height: 100vh;
}
</style>
