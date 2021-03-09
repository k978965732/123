<template>
  <div class="page-wrap">
    <div class="book-list-wrapper">
      <div
        class="book-card-wrap"
        v-for="(item, index) in book_list"
        :key="index"
      >
        <div class="book-card">
          <div class="image-wrap">
            <div
              class="bg-image"
              :style="{ 'background-image': 'url(' + item.image + ')' }"
            ></div>
          </div>
          <div class="title-wrap">
            <div class="text">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      book_list: []
    };
  },
  mounted: function() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      let self = this;
      self.axios.get("https://fe-interview-api.unnotech.com/books").then(r => {
        self.book_list = r.data;
      });
    }
  }
};
</script>
