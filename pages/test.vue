<template>
  <div>
    <!-- <client-only>
      <VueDocPreview value="function () {\n  console.log('VueDocPreview')\n}" type="markdown" />
    </client-only>-->
    <button></button>
  </div>
</template>
 
<script>
import { getBooks } from "@/api/book";

export default {
  data() {
    return {
      clientID:
        "92755147524-ru1o72nkf5lmt73m5kemplk1c40urjsh.apps.googleusercontent.com",
      secret: "maqy_2sU46cYDiKA-hHOVYZO",
      apiKey: "AIzaSyANCNHNb0fGZZeAn5mYa5_6oGgjF96Zjbk"
    };
  },
  methods: {
    call() {
      const { status, data } = getBooks({ limit: 10, user_id: 1, page_num: 1 });
      console.log({ status, data });
    }
  },
  mounted() {
    this.call();
  }
};
</script>