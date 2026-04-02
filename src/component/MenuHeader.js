export default function MenuHeader({$app, initialState, handleSortClick}) {
    this.state = {
        ...initialState, 
    };
    this.$target = document.createElement('div');
    this.$target.className = 'menuHeader';

    this.template = () => {
        let menuCount = this.state.menuName.menu ? this.state.menuName.menu.length : 0;
        return `
        <div class="menuHeader__total">
        <span class="menuHeader__total__text">상품</span>
        <span class="menuHeader__total__number">${menuCount}</span>
        </div>
        <div class="menuHeader__sort">
            <select class="menuHeader__sort__select">
                <option value="total" ${this.state.sortBy === 'total' ? 'selected' : ''}>전체</option>
                <option value="newer" ${this.state.sortBy === 'newer' ? 'selected' : ''}>신상품순</option>
                <option value="lowerPrice" ${this.state.sortBy === 'lowerPrice' ? 'selected' : ''}>낮은 가격순</option>
                <option value="higherPrice" ${this.state.sortBy === 'higherPrice' ? 'selected' : ''}>높은 가격순</option>
            </select>
        </div>
        `
    };
    
    this.render = () => {

        this.$target.innerHTML = this.template();

        let sortSelect = this.$target.querySelector('.menuHeader__sort__select');
        console.log(sortSelect.value)

        sortSelect.addEventListener('change', (e)=>{
            handleSortClick(e.target.value);
        })
    };
    
    this.setState = (newState) => {
        this.state = newState;
        this.render()

    };

}