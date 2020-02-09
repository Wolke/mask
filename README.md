# mask aog Demo
這是 Google語音助理理 Action 口罩配的 source code

## Running
1.用tsc build 出 bin
2.自已補上 google map key // 沒有的話，只是Google Nest mini 就不能用而已
3.npm start
4.ngrok 3000
5.dialogflow 開新專案
6.將 fulfilment 的 webhook url 指向 ngrok url
7.Default Welcome Intent 的 Fulfillment 設 Enable
8.開動到 google Assisant 的 console
9.應該就能測試了

