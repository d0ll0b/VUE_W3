import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delproductModal = null;

const app = {
    data(){
    return{
        api_url: "https://ec-course-api.hexschool.io/v2",
        api_path: "dollob_api",
        products: [],
        temp : {
            images_url: [],
        }, // 用於儲存 "查看細節" Data
        new_image: false
        }
    },
    mounted(){
        productModal = new bootstrap.Modal(document.querySelector('#productModal'),{
            keyboard: false
        });

        delproductModal = new bootstrap.Modal(document.querySelector('#delProductModal'),{
            keyboard: false
        });

        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin();
    },
    methods:{
        checkAdmin(){
            const api = `${this.api_url}/api/user/check`;
            axios.post(api).then((res) => {
                this.getData()
            }).catch((err) => {
                console.dir(err.response.data.message);
                window.location = 'login.html';
            })
        },
        getData(){
            const api = `${this.api_url}/api/${this.api_path}/admin/products`;
            axios.get(api).then((res) => {
                const { products } = res.data;
                this.products = products;
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        show_Model(flg, item){
            switch(flg){
                case 'new': 
                    this.new_image = true;
                    this.temp = {
                        images_url: [],
                    };
                    productModal.show();
                    break;
                case 'edit': 
                    this.new_image = false;
                    this.temp = { ...item };
                    productModal.show();
                    break;
                case 'delete': 
                    this.temp = { ...item };
                    delproductModal.show();
                    break;
            }
        },
        Update_product(){
            let api = '';
            if(this.new_image === true){
                api = `${this.api_url}/api/${this.api_path}/admin/product`;
                axios.post(api, { data: this.temp }).then((res) => {
                    alert('新增產品成功!!!');
                    productModal.hide();
                }).catch((err) => {
                    alert(err.response.data.message);
                })
            }else{

            }
        }
    },
    
    
}

Vue.createApp(app).mount('#app');