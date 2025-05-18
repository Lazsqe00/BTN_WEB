Vue.createApp({
    data() {
        return {
            //login
            loginUsername: localStorage.getItem('loginUsername') || '',
            searchKeyword: '',
            cartCount: 0,
            slides: [
                'images/slide1.jpg',
                'images/slide2.jpg',
                'images/slide3.jpg'
            ],
            currentSlide: 0,
            products: [
                { image: 'images/p4.png', name: 'Đầm Đỏ', price: '400.000đ', showOverlay: false },
                { image: 'images/p1.png', name: 'Áo Sơ Mi Nam', price: '500.000đ', showOverlay: false },
                { image: 'images/p10.png', name: 'Áo Nam', price: '685.000đ', showOverlay: false },
                { image: 'images/p12.png', name: 'Váy Bling', price: '430.000đ', showOverlay: false },
                { image: 'images/p6.png', name: 'Váy Họa Tiết', price: '1.750.000đ', showOverlay: false },
                { image: 'images/p8.png', name: 'Áo sơ mi nam', price: '580.000đ', showOverlay: false }
            ],
        };
    },
    computed: {
        filteredProducts() {
            if (!this.searchKeyword.trim()) {
                return this.products;
            }
            const keyword = this.removeVietnameseTones(this.searchKeyword.toLowerCase());
            return this.products.filter(product => {
                const name = this.removeVietnameseTones(product.name.toLowerCase());
                return name.startsWith(keyword);
            });
        }
    },
    methods: {
        removeVietnameseTones(str) {
            str = str.toLowerCase();
            // Loại bỏ dấu tiếng Việt
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            // Loại bỏ ký tự đặc biệt, dấu câu, khoảng trắng thừa nếu cần
            str = str.replace(/[^a-z0-9\s]/g, "");
            return str;
        },
        showSlide(index) {
            this.currentSlide = index;
        },
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        },
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        },
        handleOverlay(index) {
            this.products.forEach(product => {
                product.showOverlay = false;
            });
            this.products[index].showOverlay = !this.products[index].showOverlay;
        },
       
        addToCart(index){
                this.cartCount++;
                this.products[index].showOverlay = false;
         },
    },

   mounted() {
               setInterval(() =>{
                    this.nextSlide();
               }, 3000);
         },
}).mount('#app');
