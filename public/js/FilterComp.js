Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `

    <form class="header__form" action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <details class="header__block">
            <summary class="header__browse">Browse</summary>
            <div class="drop drop_browse">
                <div class="drop_flex">
                    <h3 class="drop_title">women</h3>
                    <ul class="drop_ul">
                        <li><a href="#" class="drop_link">Dresses</a></li>
                        <li><a href="#" class="drop_link">Tops</a></li>
                        <li><a href="#" class="drop_link">Sweaters/Knits</a></li>
                        <li><a href="#" class="drop_link">Jackets/Coats</a></li>
                        <li><a href="#" class="drop_link">Blazers</a></li>
                        <li><a href="#" class="drop_link">Denim</a></li>
                        <li><a href="#" class="drop_link">Leggings/Pants</a></li>
                        <li><a href="#" class="drop_link">Skirts/Shorts</a></li>
                        <li><a href="#" class="drop_link">Accessories</a></li>
                    </ul>

                </div>
            </div>
        </details>
        <label>
            <input class="header__input" type="text" v-model="userSearch" placeholder="Search for Item...">
        </label>
        <button type="submit" class="header__cearch"><span class="loupe"></span></button>

    </form>`

})