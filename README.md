# mask aog Demo
這是 Google語音助理理 Action 口罩配的 source code
Aog link: https://assistant.google.com/services/a/uid/0000008dad963124


<details>
    <summary>[Google語音助理] 口罩配 (直接問Google語音助理：OK Google! 我要跟 口罩配 說話) by <a href="https://www.facebook.com/voiceappstudio/">建宏語音工作室 </a> Wolke Lin
    </summary>
</details>

收錄：
https://g0v.hackmd.io/gGrOI4_aTsmpoMfLP1OU4A

記實：
https://medium.com/wolkesau/2020-開春首場全台開發者參與黑客松口罩配參賽全紀錄-81177a193d98

---

## Running
1. 用tsc build 出 bin
2. 自已補上 google map key // 沒有的話，只是Google Nest mini 就不能用而已
3. npm start
4. ngrok 3000
5. dialogflow 開新專案
6. 將 fulfilment 的 webhook url 指向 ngrok url
7. Default Welcome Intent 的 Fulfillment 設 Enable
8. 開動到 google Assisant 的 console
9. 應該就能測試了

