<template>
  <mdb-card class="card__registrasi">
    <mdb-card-body class="form__auth">
      <!-- Material form login -->
      <form @submit.prevent="RegistrasiProfile">
        <h4 class="h4 text-left mb-2">Daftar</h4>
        <p class="text-left">
          Buat akun baru untuk mengakses seluruh layanan dan informasi pelatihan
          PPKC
        </p>

        <!-- Input login -->
        <div class="form-group has-input">
          <mdb-icon far icon="user-circle" class="form-control-feedback" />
          <input
            type="text"
            class="form-control"
            placeholder="Nama"
            v-model="fields.nama"
            autofocus
          />
        </div>
        <div class="form-group has-input">
          <mdb-icon far icon="envelope" class="form-control-feedback" />
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="fields.email"
          />
        </div>
        <div class="form-group has-input">
          <mdb-icon icon="lock" class="form-control-feedback" />
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="fields.password"
          />
        </div>
        <div class="form-group has-input">
          <mdb-icon icon="lock" class="form-control-feedback" />
          <input
            type="password"
            class="form-control"
            placeholder="Ulangi Password"
            v-model="fields.confirm_password"
          />
        </div>

        <div class="form-group mt-5">
          <mdb-btn
            type="submit"
            block
            color="white"
            size="md"
            class="text-primary"
            ><div v-if="loading">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </div>
            <div v-else>Daftar</div></mdb-btn
          >
        </div>
      </form>
      <!-- Material form login -->
      <!-- <mdb-row class="row justify-content-center white-text">
				<mdb-col md="5" class="mt-2">
					<b-dropdown-divider class="line"></b-dropdown-divider>
				</mdb-col>
				<mdb-col md="2">
					<h6 v-if="$device.isMobile" class="text-center mt-2">Atau</h6>
					<small v-else>Atau</small>
				</mdb-col>
				<mdb-col md="5" class="mt-2">
					<b-dropdown-divider class="line"></b-dropdown-divider>
				</mdb-col>
			</mdb-row> -->

      <!-- <div class="form-group mt-3">
				<mdb-btn block color="white" size="md" class="text-primary">
					<mdb-icon fab icon="google" /> Daftar dengan Akun Google
				</mdb-btn>
			</div> -->

      <mdb-row
        :class="`${
          $device.isMobile
            ? 'justify-content-center black-text form__daftar-link'
            : 'justify-content-center black-text'
        }`"
      >
        <mdb-col md="12" xs="12" sm="12" lg="12">
          <h6
            :class="`${
              $device.isMobile
                ? 'text-center mt-5 mb-5'
                : 'text-center mt-5 mb-5'
            }`"
          >
            Sudah punya Akun ?
            <nuxt-link to="/auth/login">Masuk Sekarang</nuxt-link>
          </h6>
        </mdb-col>
      </mdb-row>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
export default {
  props: ["event_data", "validation", "show_alert", "loading"],
  data() {
    return {
      fields: {},
      showing_pass: false,
    };
  },

  methods: {
    RegistrasiProfile() {
      const params = {
        nama: this.fields.nama,
        email: this.fields.email,
        password: this.fields.password,
        confirm_password: this.fields.confirm_password,
      };
      this.$emit("registrasi-profile", params);
    },

    showPassword() {
      const password = document.querySelector("#password");
      if (password.type === "password") {
        password.type = "text";
        this.showing_pass = true;
      } else {
        password.type = "password";
        this.showing_pass = false;
      }
    },
  },
};
</script>
