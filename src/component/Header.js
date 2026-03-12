export default function Header({$app, initialState, headerSearchChange}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'header';

    this.headerSearchChange = headerSearchChange;
    
    // $app.appendChild(this.$target);
    
    //header 구조
    this.template = () => {

        let temp = `
        <div class="header__content">
            <button class="header__content__func ${this.state.currentPage.startsWith('menu/') ? 'backBtn' : 'menuBtn'}" type="button">
                <i data-feather="${this.state.currentPage.startsWith('menu/') ? 'arrow-left' : 'menu'}"></i>
            </button>
            <div class="header__content__title">
                <a href="/ramong2ne">라몽이네 뚝떡공방</a>
            </div>
            <button class="header__content__btn" type="button">
            <i data-feather="search"></i>
            </button>
        </div>
        <div class="header__search">
            <div class="header__search__input">
            <i data-feather="search" class="header__search__input--icon"></i>
            <input class="header__search__input--input" type="text" placeholder="검색어를 입력하세요" />
            </div>
            <button class="header__search__closeBtn">취소</button>
        </div>
        `;
          
        return temp;
    };

    this.render = () => {
        this.$target.innerHTML = this.template();
        
        const searchBtn = this.$target.querySelector('.header__content__btn');
        const searchInput = this.$target.querySelector('.header__search__input--input');
        const searchCloseBtn = this.$target.querySelector('.header__search__closeBtn');

        //검색 버튼 클릭시 검색창 활성화
        searchBtn.addEventListener('click', (e) => {
            const searchSection = this.$target.querySelector('.header__search');
            searchSection.classList.toggle('active');
            searchInput.focus();
        })
        //취소 버튼 클릭시 검색창 비 활성화
        searchCloseBtn.addEventListener('click', (e) => {
            const searchSection = this.$target.querySelector('.header__search');
            searchSection.classList.remove('active');
        });
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.headerSearchChange(e.target.value);
                }
            });
        }


        const funcBtn = this.$target.querySelector('.header__content__func');
        funcBtn.addEventListener('click', (e) => {
            if (this.state.currentPage.startsWith('menu/')) {
                history.back();
            }
        });
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }
}