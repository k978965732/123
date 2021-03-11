<template>
  <div class="page-wrap">
    <div class="book-list-wrapper">
      <div
        class="book-card-wrap"
        v-for="(item, index) in book_list"
        :key="index"
      >
        <router-link
          :to="{ name: 'BookDetail', params: { id: item.id } }"
          class="book-card"
        >
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
        </router-link>
      </div>
    </div>
    <div class="book-detail-wrapper" v-if="bookId != -1">
      <div class="details-box">
        <div
          class="book-name"
          v-html="
            bookId != -1 && book_list.length != 0
              ? book_list[bookId - 1].name
              : ''
          "
        >
          <!-- {{ book_list[$route.params.id].name }} -->
        </div>
        <div class="flex-wrap">
          <div class="wrap left-wrap">
            <div class="input-wrapper">
              <div class="title">
                價格
              </div>
              <div class="input-wrap">
                <div class="button-wrap">
                  <button @click="numberBtn('price', -1)">
                    -
                  </button>
                </div>
                <div class="input">
                  <input
                    type="number"
                    v-model.number="user_input.price"
                    :min="input_num_setting.min"
                  />
                </div>
                <div class="button-wrap">
                  <button @click="numberBtn('price', 1)">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div class="input-wrapper">
              <div class="title">
                數量
              </div>
              <div class="input-wrap">
                <div class="button-wrap">
                  <button>
                    -
                  </button>
                </div>
                <div class="input">
                  <input
                    type="number"
                    v-model.number="user_input.count"
                    :min="input_num_setting.min"
                  />
                </div>
                <div class="button-wrap">
                  <button>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="wrap right-wrap">
            <div class="confirm-wrap">
              <button @click="confirm()">
                <div class="text">
                  確認修改
                </div>
              </button>
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
      book_list: [],
      details: {},
      user_input: {
        price: "",
        count: ""
      },
      input_num_setting: {
        min: 0
      },
      bookId: -1
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
    },
    numberBtn(target, num) {
      this.user_input[target] += num;
    },
    confirm() {
      const self = this;
      if (self.user_input.price !== "" && self.user_input.count !== "") {
        if (confirm("確定修改嗎")) {
          self.axios
            .patch(
              "https://fe-interview-api.unnotech.com/profile/" +
                self.details.id,
              { price: self.user_input.price, count: self.user_input.count }
            )
            .then(r => {
              if (r.status == 200) {
                alert("修改成功");
              } else {
                alert("發生錯誤 請隔段時間再次嘗試");
              }
            });
        }
      }
    }
  },
  watch: {
    $route: {
      handler: function(newValue) {
        const self = this;
        const id = newValue.params.id;
        if (newValue.params.id != undefined) self.bookId = newValue.params.id;
        if (id != undefined && id > 0 && id <= 6) {
          self.axios
            .get("https://fe-interview-api.unnotech.com/profile/" + id)
            .then(r => {
              return (
                (self.details = JSON.parse(JSON.stringify(r.data))),
                (self.user_input = JSON.parse(JSON.stringify(r.data)))
              );
            });
        }
      },
      deep: true,
      immediate: true
    },
    user_input: {
      handler: function(newValue) {
        const self = this;
        Object.keys(newValue).forEach(key => {
          if (typeof newValue[key] != "number" || newValue[key] < 0) {
            return (self.user_input[key] = "");
          }
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
