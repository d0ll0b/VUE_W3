import{createApp as c}from"https://unpkg.com/vue@3/dist/vue.esm-browser.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();c({data(){return{user:{username:"",password:""}}},methods:{login(){axios.post("https://vue3-course-api.hexschool.io/v2/admin/signin",this.user).then(r=>{const{token:s,expired:o}=r.data;document.cookie=`hexToken=${s};expires=${new Date(o)}; path=/`,window.location="products.html"}).catch(r=>{alert(r.response.data.message)})}}}).mount("#app");

createApp({
data() {
    return {
        user:{
            username: '',
            password: '',
        }
    }
},
methods: {
    login() {
    const api = `https://vue3-course-api.hexschool.io/v2/admin/signin`;
    axios.post(api, this.user).then((res) => {
        const { token, expired } = res.data;
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';
    }).catch((err) => {
        alert(err.response.data.message);
    })
    },
},
}).mount('#app');