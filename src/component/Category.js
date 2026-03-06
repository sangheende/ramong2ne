
export default function Category({$app, initialState, handleCategory}) {
    this.state = {
        ...initialState,
        selectedIdx : 0       
    },
    this.$target = document.createElement('div');
    this.$target.className = 'category';

    this.handleCategory = handleCategory;

    $app.appendChild(this.$target);

    let categoryList = [
        '전체',
        '❄️ 계절메뉴',
        '🍘 구움과자',
        '🍡 떡 / 빵',
        '🍰 케이크',
        '💝 세트메뉴'
    ]
    
    this.template = () => {

        let temp = `<div class="category__list">`

        categoryList.forEach((elm, idx) => {
            temp += ` <div class="category__item ${this.state.selectedIdx === idx? 'active' : ''}">${elm}</div> `
        })

        return temp + '</div>';
    };
    
     // 이벤트 위임: 최초 1회만 등록
    this.$target.addEventListener('click', (e) => {
        const item = e.target.closest('.category__item');
        if (item) {
            const idx = Array.from(this.$target.querySelectorAll('.category__item')).indexOf(item);
            if (idx !== -1) {
                this.setState({ selectedIdx: idx });
                if (this.handleCategory) {
                    this.handleCategory(categoryList[idx]);
                }
            }
        }
    });

    this.render = () => {
        this.$target.innerHTML = this.template();
    };
            
    this.setState = (newState) => {
        this.state = {
            ...this.state,
            ...newState
        };
        this.render()


        console.log('카테고리 setState 호출', newState);
    };

    // this.render()
}