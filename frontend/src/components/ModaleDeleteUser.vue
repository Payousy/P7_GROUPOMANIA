<script>
export default {
	name: "ModaleDelete",
	props: ["revele", "toggleModale", "deleteProfile"],
};
</script>

<template>
	<div class="bloc-modal" v-if="revele">
		<div class="overlay" @click="toggleModale"></div>
		<div class="modal-card">
			<button class="btn-modale btn btn-secondary" @click="toggleModale">
				x
			</button>
			<p>Êtes vous sûr de vouloir supprimer ce compte ?</p>
			<div class="btn d-flex justify-content-evenly">
				<button class="btn-modal mt-3 btn btn-danger" @click="deleteProfile">
					Oui
				</button>
				<button class="btn-modal mt-3 btn btn-secondary" @click="toggleModale">
					Non
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bloc-modal {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.overlay {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.modal-card {
	height: 25%;
	z-index: 99999;
	background-color: #f1f1f1;
	color: #333;
	padding: 50px;
	position: fixed;
	top: 30%;
}
.btn-modale {
	position: absolute;
	top: 10px;
	right: 10px;
}
</style>
