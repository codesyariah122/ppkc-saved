<!-- Component base on directory /components/ppkc -->
<template>
  <div>
    <ppkcAlurPendaftaran
      :path="path"
      :lists="lists"
      :account="account"
      :non_account="non_account"
    />
  </div>
</template>

<script>
export default {
  name: "ppkc-alur_pendaftaran",
  layout: "default",

  data() {
    return {
      path: this.$route.name,
    };
  },

  async asyncData({ $axios }) {
    const lists = await $axios.$get("/web/alur-pendaftaran");
    const account = lists.result.account;
    const non_account = lists.result.non_account;

    return {
      lists,
      account,
      non_account,
    };
  },
};
</script>
