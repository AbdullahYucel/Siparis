<template>
    <div>
        <div class="layout" v-for="siparis in mevcut" :key="siparis.index">

            

            <div class="header">
                <div class="back-link">
                    <router-link to="/" class="router">◀◀</router-link>
                </div>
                <div class="headline">
                    <h1 class="customer-name">[ ~ {{siparis.customer_firstname}} ~ ]</h1>
                    <p class="order-number">{{siparis.order_number}}</p>
                </div>
            </div>

            <div class="main-content" v-for="kalem in siparis.products" :key="kalem.index">
                <h3 class="product-name">▶     {{kalem.product_name}}  ({{kalem.count}})  <span class="birim">({{ikili(kalem.sale_price)}} {{siparis.order_currency}})</span></h3>
                    <div v-if="kalem.fees.length>0" >
                        <p v-for="fee in kalem.fees" :key="fee.index" class="fee">↪  {{fee.translate.name}}  ({{fee.price}})
                        <span class="birim">({{ikili(fee.price_affect)}} {{siparis.order_currency}})</span></p>
                    </div>
                        
                <h4 class="toplam"> {{kalem.total_price}} {{siparis.order_currency}}</h4>
                

            </div>



            <div class="footer">
                <div class="name">{{siparis.status.name}}</div>
                <div class="date">{{siparis.status.created_at | subStr()}}</div>
                <div class="total-price">{{ ikili(siparis.products_total)}}  {{siparis.order_currency}}</div>
            </div>
        
        
        
        
        
        </div>
    </div>
</template>

<script>


export default {
    name:'Details',
    props: {
        
    },
    data() {
        return {
            mevcut:{},
            siparisler:[]
        }
    },
    async created() {
        const url=process.env.VUE_APP_API_KEY
        let h=new Headers()
        let encoded= window.btoa(`${process.env.VUE_APP_LOGIN}`)
        let auth = 'Basic ' + encoded
        h.append('Authorization',auth)
        sessionStorage.setItem('newToken',JSON.stringify(encoded))

        let req= new Request(url, {
            headers: h,
        })
        var token=await fetch(req).then((res)=>res.json()).then((res)=>  res.data.token)
        const newURL= process.env.VUE_APP_NEW_URL
        let newReq= new Request(newURL, {
            headers: {
                Authorization:'Bearer '+ token
            }
        })
        await fetch(newReq).then((res)=> res.json()).then((res)=> this.siparisler=res.data)
        let now= this.$route.params.order;
        this.mevcut= this.siparisler.filter((res)=> res.order_number === now)
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
    }

}
</script>

<style >
.layout {
    border:10px solid;
    margin: 0 30%;
    background-color: #f9dec9  ;
    border-radius: 30px;
    
    position: relative;
}

.header {
    justify-content: center;
    border-bottom: 10px solid;
    text-align: center;
    margin:0;
    
}
.back-link {
    position: absolute;
    left:5px;
    top:35px;
}
.main-content {
    justify-content: center;
    text-align: center;
    border-bottom:1px solid;
    background-color: #f8f7ff;
    padding: 20px;
}
h3 {
    margin:0 !important
}
.footer {
    
    text-align: center;
    display: flex;
}
.name {
flex:1 1;

    padding:10px 0;
}
.date {
flex:1 1;
border-left: 1px solid;
border-right: 1px solid;

    padding:10px 0;
}
.total-price {
flex:1 1;

    padding:10px 0;
}
.router {
    text-decoration: none;
    font-size:20px;
    font-weight: bold;
    border: 1px solid;
    border-radius: 20px;
    padding: 10px;
    background-color:#a9d6e5;
    color:darkblue;
}
.customer-name {
    color:685044
}
.product-name {
    color:#00296b
}
.fee {
    color:#a71e34
}
.name{
    color:red;
    font-weight: bold;
}
.total-price {
    font-weight: bold;
    font-size: 18px;
    color:white;
    background-color:green
}
.birim {
    font-weight: normal;
    margin-left: 20px;
    float: right;
}
.toplam {
    text-align: right;
}


@media screen and (max-width: 413px) {
    .birim {
        font-size: 13px;
        font-weight: normal;
        float: none;
    }
    .toplam {
        text-align: center;
    }

}
@media screen and (max-width: 1037px) {
    .layout {
        margin:0
    }

}
@media screen and (max-width: 350px) {
    .router {
        
    font-weight: bold;
        font-size: 14px;
    }
    .back-link {
        top:80px;
        
    font-weight: bold;
    }

}
</style>