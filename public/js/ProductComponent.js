Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: 'https://placehold.it/200x150'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`) // делаем запрос на сервер ( /api/products - путь к файлу js продуктов)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <figure class="product-item product__box_card">
                <a href="#"><img :src="img" alt="Some img" class="product__box_img"></a>
                <figcaption class="product__box_content">
                    <a href="#" class="product__box_name">{{product.product_name}}</a>
                        <div class="product__box_price">{{product.price}}</div>                 
                            <div  @click="$emit('add-product', product)" class="product__box_add-to-cart" >
                                <button class="product__box_card_add">
                                    <img class="product__box_add-to-cart_icon" src="../img/icon_1.png" alt="icon_1">
                                    <span class="product__box_add-to-cart_p">Add to Cart</span>
                                </button >
                            </div>                
                </figcaption>
            </figure>
    `
})