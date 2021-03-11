# booklist

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 專案的架構、邏輯說明

    整個專案大致分成book list書本列表與book detail書本細節兩部分。
    將書籍從api引入，點擊書籍以動態網址的方式加入id。
    當網址中id餐書改變會再次傳送api抓到該書籍的詳細資料。
    以v-model的方式偵測input的改變，點擊確認修改即傳送新輸入的資料至伺服器。

## 你對於所有使用到的第三方 library 的理解，以及為何使用它
    axios: 接收傳送api的套件。
    vue-router: vue的路徑管理器。

## 在這份專案中你遇到的困難、問題，以及解決的方法
    api傳送過程中會有一點時間的delay導致瀏覽器偵錯工具中會出現錯誤訊息，一開始的時候沒有發現是哪個部分，發現之後用v-html判斷是否接收到資料有再加入。

    其餘沒什麼太大的問題，除了由於本身仍在職中時間方面有點趕沒什麼時間加入一些酷炫的效果
    預期；將書籍方式以slider呈現，套件選擇為splide，這是一套專門製作slider的套件同時支援原生js、vuejs、reactjs之前多次使用沒什麼問題，使用彈性也大。

    手機板的部分雖然依照要求將book detail寫在列表下方但點擊書籍後，要滑到最下方才看到輸入框，若之後有時間優化，想法是以popup方式呈現。