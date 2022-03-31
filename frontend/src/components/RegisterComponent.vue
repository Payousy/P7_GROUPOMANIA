<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { mapState } from "vuex";
import { reactive, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      email: "",
      username: "",
      password: "",
      bio: "",
    });
    const rules = computed(() => {
      return {
        email: {
          required,
          email: helpers.withMessage(
            "Votre adresse e-mail est incorrect ou existe déjà.",
            email
          ),
        },
        username: {
          required,
          minLength: helpers.withMessage(
            "Votre nom d'utilisateur est trop court.",
            minLength(3)
          ),
          maxLength: helpers.withMessage(
            "Votre nom d'utilisateur est trop long.",
            maxLength(20)
          ),
        },
        password: {
          required,
          minLength: helpers.withMessage(
            "Votre mot de passe est trop court.",
            minLength(3)
          ),
          maxLength: helpers.withMessage(
            "Votre mot de passe est trop long.",
            maxLength(20)
          ),
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
      mode: "login",
      serverError: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId !== -1) {
      this.$router.push("/profile");
      return;
    }
  },
  computed: {
    validated() {
      if (this.mode == "create") {
        if (
          this.state.email !== "" &&
          this.state.password !== "" &&
          this.state.username !== ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.state.email !== "" && this.state.password !== "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchSignup() {
      this.mode = "create";
    },
    switchLogin() {
      this.mode = "login";
    },
    createAccount() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const customer = this;
        this.$store
          .dispatch("createAccount", {
            email: this.state.email,
            username: this.state.username,
            bio: this.state.bio,
            password: this.state.password,
          })
          .then(function () {
            customer.signIn();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("Input error");
      }
    },
    signIn() {
      const customer = this;
      this.$store
        .dispatch("signIn", {
          email: this.state.email,
          password: this.state.password,
        })
        .then(function (response) {
          console.log(response);
          customer.$router.push("/profile");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<template>
  <main class="form-signin">
    <form v-on:submit.prevent>
      <span v-if="status === 'error_create'" class="text-danger">
        L'adresse email existe déjà.
      </span>
      <h1 v-if="mode == 'login'" class="h3 mb-3 fw-normal">
        <span v-if="status == 'error_signIn'" class="text-danger fs-5"
          >Votre adresse e-mail ou votre mot de passe est incorrect.</span
        >
        <span v-else>Connectez-vous</span>
      </h1>
      <h1 v-if="mode == 'create'" class="h3 mb-3 fw-normal">Inscrivez vous</h1>

      <div class="form-floating">
        <input
          v-model="state.email"
          type="email"
          class="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
        />
        <span class="text-danger" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
        <label for="floatingInput">Adresse e-mail</label>
      </div>

      <div v-if="mode == 'create'" class="form-floating">
        <input
          v-model="state.username"
          type="username"
          class="form-control"
          id="floatingUsername"
          placeholder="Nom d'utilisateur"
        />
        <span class="text-danger" v-if="v$.username.$error">
          {{ v$.username.$errors[0].$message }}
        </span>
        <label for="floatingPassword">Nom d'utilisateur</label>
      </div>

      <div v-if="mode == 'create'" class="form-floating">
        <input
          v-model="state.bio"
          type="bio"
          class="form-control"
          id="floatingBio"
          placeholder="Biographie"
        />
        <label for="floatingPassword">Présentez vous (optionnel)</label>
      </div>

      <div class="form-floating">
        <input
          v-model="state.password"
          type="password"
          class="form-control"
          id="floatingPassword"
          autocomplete="on"
          placeholder="Mot de passe"
        />
        <span class="text-danger" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </span>
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <button
        v-if="mode == 'login'"
        @click="signIn()"
        class="w-100 btn btn-lg btn-primary"
        :class="{ disabled: !validated }"
        type="submit"
      >
        <span v-if="status == 'loading'">Connexion en cours ...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        v-else
        @click="createAccount()"
        class="w-100 btn btn-lg btn-primary"
        :class="{ disabled: !validated }"
        type="submit"
      >
        <span v-if="status == 'loading'">Création en cours ...</span>
        <span v-else>Créer mon compte</span>
      </button>
      <div class="container">
        <span v-if="mode == 'login'">Tu n'as pas encore de compte ?</span>
        <span v-else>Tu as déjà un compte ?</span>
        <button
          v-if="mode == 'login'"
          type="button"
          class="signin btn btn-sm"
          @click="switchSignup"
        >
          Créer un compte
        </button>
        <button
          v-else
          type="button"
          class="m-1 btn btn-warning btn-sm"
          @click="switchLogin"
        >
          Connexion
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.btn-primary {
  color: #fff;
  background-color: rgba(202, 0, 0, 0.75) !important;
  border: none;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.signin {
  color: rgb(164, 0, 0);
  font-weight: bold;
}
</style>
