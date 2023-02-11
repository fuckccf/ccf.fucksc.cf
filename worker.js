export default {
    async fetch(request, env) {
        const HOST = new URL(request.url).hostname
        if (request.url.endsWith("fuck.js"))
            return new Response(
                `
// ==UserScript==
// @name         I-Fxxx-CCF
// @namespace    https://€€£.fucksc.cf/
// @version      0.1
// @description  将中国计算机学会官网所有的 CCF 改成 €€£
// @author       €€£
// @match        *://*.ccf.org.cn/*
// @match        *://*.noi.cn/*
// @match        *://*.cspro.org/*
// @match        *://*.yocsef.org.cn/*
// @icon         https://avatars.githubusercontent.com/u/91953449
// @grant        none
// @homepage     https://github.com/fuckccf/I-Fxxx-CCF
// @license      WTFPL
// ==/UserScript==

(function() {

var kwd = {
    "GESP": "₲E$₽",
    "Grade": "₲rade",
    "Programming": "₽rogramming",
    "CCSP": "€€$₱",
    "CSP": "€$₱",
    "CCCF": "€€€£",
    "CCF": "€€£",
    "CNCC": "€₦€€",
    "中国计算机学会": "中国收钱协会",
    "Certified": "€ertified",
    "Software": "$oftware",
    "Professional": "₱rofessional",
    "China": "€hina",
    "Computer": "€ollecting-money",
    "Federation": "£ederation"
}

Object.keys(kwd).forEach(k => {
    document.querySelectorAll("div,p,a,h1,h2,h3,h4,h5,h6,span")?.forEach((el) => {
        if (el.innerHTML.includes(k) && !el.innerHTML.includes("版权"))
            el.innerHTML = el.innerHTML.replaceAll(k,kwd[k])
    })
    document.title = document.title.replaceAll(k,kwd[k])
})
Object.keys(kwd).forEach(k => {
    document.querySelectorAll("*[href], *[src]")?.forEach((el) => {
        if (el.href?.includes(encodeURI(kwd[k])))
            el.href = decodeURI(el.href).replaceAll(kwd[k],k)
        if (el.src?.includes(encodeURI(kwd[k])))
            el.src = decodeURI(el.src).replaceAll(kwd[k],k)
    })
})
document.querySelector(".header .logo")?.remove()
var img = document.createElement("img")
img.src = "https://avatars.githubusercontent.com/u/91953449";
img.alt = "中国收钱协会"
img.className = "logo"
document.querySelector(".header .tt")?.append(img)
document.body.insertAdjacentHTML("beforeend", \`
<style>
    body > div.index-xf {
        display: none !important;
    }
    </style>
\`)

})();
`,
                {
                    headers: { "content-type": "text/javascript" },
                }
            );
        let res = await fetch(
            new URL(new URL(request.url).pathname, "https://www.ccf.org.cn/"),
            request
        );
        let headers = res.headers;
        let html = "";
        if (headers.get("content-type").includes("text/html")) {
            html = await res.text();
            html =
                html
                    .replaceAll(
                        "upgrade-insecure-requests",
                        "upgrade-insecure-requests; script-src https://" + HOST + "/fuck.js"
                    )
                    .replaceAll(
                        "11010802032778号",
                        " 备你妈的案"
                    ).replaceAll(
                        "13000930号-4",
                        " 备你妈的案"
                    )  + '<script src=" https://' + HOST + '/fuck.js"></script>';
            return new Response(html, { headers });
        } else {
            return new Response(await res.arrayBuffer(), { headers });
        }
    },
};
