export default function Header({$app, initialState, headerSearchChange}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'header';

    this.headerSearchChange = headerSearchChange;
    
    $app.appendChild(this.$target);
    
    //header 구조
    this.template = () => {

       
        let temp = `
        <div class="header__content">
          <i data-feather="menu"></i>
          <div class="header__content__title">
            <a href="index.html">라몽이네 뚝떡공방</a>
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
        

        const searchInput = this.$target.querySelector('.header__search__input--input');
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.headerSearchChange(e.target.value);
                }
            });
        }
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();


        console.log('Header setState 호출', newState);
    }
}