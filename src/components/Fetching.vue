<template>
    <div class="cell"> 
        <div  class="table" v-for="siparis in siparisler" :key="siparis.index">
            <div class="header">
                <div class="table-name"><h2>  {{siparis.customer_firstname}}  </h2></div>
                <div class="order-number">{{siparis.order_number}}</div>
            </div>

            <div class="products" >
            <h4 class="urun">SİPARİŞLER <hr/></h4>
            <p class="product-name" v-for="urun in siparis.products" :key="urun.index">● {{urun.product_name}} <span class="count">x{{urun.count}}</span></p>
            </div>


            
            <div class="footer">
                <div class="left">
                    <div class="active" v-if="siparis.status"> ACTİVE </div>
                    <div class="order-date">{{siparis.created_at | subStr}}</div>
                </div>
                <div class="right">
                    <div class="total-price">{{ikili(siparis.products_total) }} {{siparis.order_currency}}</div>
                    <router-link :to="siparis.order_number" class="router" >DETAYLAR ▶</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import moment from 'vue-moment'

// import Details from './Details'


Vue.use(moment);

export default {
    components:{
        // Details
    },
    data() {
        return {
            siparisler:[]
        }
    },
    mounted() {
        this.startFetch()
        setInterval(this.startFetch,5000) 


    },
    filters: {
        subStr:function(string) {
            return string.substring(11,19)
        },
        
    },
    methods: {
        ikili(val){
            return parseFloat(val).toFixed(2)
        },
        async startFetch() {
        const url='https://master.cofreex.eu/api/auth/login'
        let h=new Headers()
        let encoded= window.btoa('virtara:123456ab')
        let auth = 'Basic ' + encoded
        h.append('Authorization',auth)
        sessionStorage.setItem('newToken',JSON.stringify(encoded))

        let req= new Request(url, {
            headers: h,
        })
        var token=await fetch(req).then((res)=>res.json()).then((res)=>  res.data.token)
        const newURL= 'https://master.cofreex.eu/api/ecommerce/order/order'
        let newReq= new Request(newURL, {
            headers: {
                Authorization:'Bearer '+ token
            }
        })
        await fetch(newReq).then((res)=> res.json()).then((res)=> this.siparisler=res.data)
        console.log('FETCHED');
        }
    }

}
</script>

<style scoped>
.cell {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    max-width: 960px;
    margin:0 auto ;
}
.table {
    margin: 5px;
    padding: 10px;
    border:10px solid;
    position: relative;
    min-height: 400px;
    height: auto;
    border-radius: 40px;
    
    background-color: #F8F7FF;
}
.header {
    display: flex;
}
.table-name {
    color:red
}
.urun {
    font-size: 20px;
    text-align: left;
    color: black;
    white-space: nowrap;
    width: 45%;
}

.order-number {
    display: flex;
    justify-content: center;
    margin-left: auto;
    text-align: right;
    align-items: center;
}
.footer {
    margin-top: auto;
    position: absolute;
    bottom:0;
    padding-bottom: 20px;
    display: flex;
    width: 90%;
    border-top:1px solid;
}
.right {
    margin-left: auto;
    margin-top:10px
}
.left {
    padding-top: 20px;
}
.total-price {
    margin-bottom:20px;
    border-radius: 10px;
}
.next-page {
     background: green;
    height: 30px;
    border-radius: 20px;
    text-align: center;
}
.router {
     text-decoration: none;
    font-size:15px;
    font-weight: bold;
    border: 1px solid;
    border-radius: 20px;
    padding: 10px;
    background-color:#a9d6e5;
    color:darkblue;
}
.active {
    margin-bottom:10px;
    color:green;
    font-weight: bold;
    font-size: 20px;
    margin-bottom:5px;
    justify-content: center;
    align-items: center;
    text-align:center;
}
.order-date {
    font-weight: bold;
    font-size: 17px;
    padding: 10px;
    margin-top: 15px;
}

</style>