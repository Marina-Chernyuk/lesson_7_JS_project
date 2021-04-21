// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: 'https://placehold.it/50x100',
          showCart: false,
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.imgPath = `img/${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
                    /*.then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })*/
            } else {
                const prod = Object.assign({quantity: 1}, item);
                item.imgPath = `img/${item.id_product}.jpg`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template: `<div class="header__control_cart">
                    <button class="btn-cart header__control_icon" type="button" @click="showCart = !showCart">
                        <svg width="32px" height="29px" fill="#000000" viewBox="0 0 32.000000 29.000000">
                            <g transform="translate(0,29) scale(0.1,-0.1)">
                                <path d="M0 281 c0 -6 11 -11 23 -11 22 0 26 -9 48 -92 l25 -93 81 -3 81 -3
                            25 55 c47 103 51 96 -52 96 -49 0 -93 -4 -96 -10 -4 -6 23 -10 74 -10 45 0 81
                            -2 81 -5 0 -2 -10 -25 -22 -50 l-22 -45 -67 0 -67 0 -23 88 c-24 85 -25 87
                            -57 90 -18 2 -32 -1 -32 -7z"/>
                                <path d="M74 35 c-4 -9 -2 -21 4 -27 15 -15 44 -1 40 19 -4 23 -36 29 -44 8z"/>
                                <path d="M242 28 c4 -30 43 -33 43 -3 0 13 -8 21 -23 23 -20 3 -23 0 -20 -20z"/>
                            </g>
                        </svg>
                    </button>
                    <div class="drop header__control_cart_drop" v-show="showCart">
                        <div class="header__control_cart_flex">
                            <cart-item v-for="item of cartItems" :key="item.id_product" :img="imgCart" :cart-item="item" @remove="remove">
                            </cart-item>
                        </div>
                        <div class="header__control_cart_total">
                        <div class="header__control_cart_total_text">total</div>
                        <div class="header__control_cart_total_text"> &#36;500.00</div>
                    </div>
                    <a href="checkout.html" class="header__control_cart_a">
                        <button class="header__control_cart_button header__control_cart_button_mb-11">checkout</button></a>
                    <a href="shopping_cart.html" class="header__control_cart_a">
                        <button class="header__control_cart_button">go&#160;to&#160;cart</button></a>
                    </div>
                </div>`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
                <div class="header__control_cart_part">
                     <img :src="img" alt="Some img" class="header__control_cart_img">
                        <div class="header__control_cart_text">
                            <h4 class="header__control_cart_part_title">{{ cartItem.product_name }}</h4>
                            <img src="img/1824.png" alt="1824" class="header__control_cart_part_img">
                            <p class="header__control_cart_part_quantity">Quantity: {{ cartItem.quantity }}</p>
                            <div class="product-single-price">$ {{ cartItem.price }} </div>
                        </div>                
                    <div class="right-block">
                        <div class="header__control_cart_part_circle">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                </div>
    `
})

