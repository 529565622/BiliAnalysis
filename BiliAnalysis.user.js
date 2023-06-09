// ==UserScript==
// @name         BiliBili本地解析(Miro)
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.2
// @description  try to take over the world!
// @author       Miro(https://vrchat.com/home/user/usr_20b8e0e4-9e16-406a-a61d-8a627ec1a2e3)
// @match        https://www.bilibili.com/video*
// @downloadURL  https://raw.githubusercontent.com/529565622/BiliAnalysis/main/BiliAnalysis.user.js
// @updateURL    https://raw.githubusercontent.com/529565622/BiliAnalysis/main/BiliAnalysis.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @run-at       document-idle
// ==/UserScript==
//20230405 修复解析1080p(需已登陆)
//20230626 修复加载慢导致无法添加按钮

(function () {
    'use strict';
    var button = document.createElement("button")
    button.textContent = "本地解析"
    button.style.width = "80px"
    button.style.align = "center"
    button.style.color = "#FFFFFF"
    button.style.background = "#00AEEC"
    button.style.border = "1px solid #F1F2F3"
    button.style.borderRadius = "6px"
    button.style.fontSize = '14px'
    button.addEventListener("click", clickBotton)
    setTimeout(function () {
        var like_comment = document.getElementsByClassName('left-entry')[0]
        like_comment.appendChild(button)
    }, 5000)
        setTimeout(function () {
        var like_comment = document.getElementsByClassName('left-entry')[0]
        like_comment.appendChild(button)
    }, 10000)
    function clickBotton() {
        var url = window.location.href
        var BV = /(?=BV).*?(?=\?|\/)/
        var P = /(?<=p=).*?(?=&vd)/
        var BV1 = url.match(BV)
        var P1 = url.match(P)
        if (P1 == null) {
        P1 = 1
        }
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', 'https://api.bilibili.com/x/player/pagelist?bvid=' + BV1, true);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = JSON.parse(httpRequest.responseText);
                var cid = json.data[P1-1].cid
                console.log(json.data[P1-1].cid);
                var httpRequest1 = new XMLHttpRequest();
                httpRequest1.open('GET', 'https://api.bilibili.com/x/player/playurl?bvid=' + BV1 + '&cid=' + cid + '&qn=64&type=&otype=json&platform=html5&high_quality=1', true);
                httpRequest1.withCredentials = true;
                httpRequest1.send();
                httpRequest1.onreadystatechange = function () {
                    if (httpRequest1.readyState == 4 && httpRequest1.status == 200) {
                        var json = JSON.parse(httpRequest1.responseText);
                        navigator.clipboard.writeText(json.data.durl[0].url).catch(e => console.error(e))
                        console.log(json.data.durl[0].url);
                    }
                };
            }
        };
        GM_notification({
            title: "解析成功",
            image: "https://i0.hdslb.com/bfs/archive/86848c76a76fe46d84d6ef1ab735d9398ed3ee8e.png",
            text: "解析成功",
            highlight: true,
            silent: false,
            timeout: 10000,
            onclick: function () {
            },
            ondone() {
            }
        })
    }
})();
