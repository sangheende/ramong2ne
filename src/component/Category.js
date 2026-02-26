
export default function Category({$app, initialState, handleCategory}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'category';

    this.handleCategory = handleCategory;

    $app.appendChild(this.$target);
    this.template = () => {

        let categoryList = [
            '전체',
            '❄️ 계절메뉴',
            '🍘 구움과자',
            '🍡 떡 / 빵',
            '🍰 케이크',
            '💝 세트메뉴'
        ]

        let temp = ` `;

        categoryList.forEach((elm) => {
            temp += `<div class="category__item">${elm}</div>`
        });
        return temp;
    };

    
    this.render = () => {
        this.$target.innerHTML = this.template();
        let categoryItems = this.$target.querySelectorAll('.category__item');
        categoryItems.forEach((elm) => {
            elm.addEventListener('click', (e) => {
                // 모든 형제 노드에서 active 제거
                categoryItems.forEach(item => item.classList.remove('active'));
                // 외부 콜백 호출 (필요시)
                if (this.handleCategory) {
                    this.handleCategory(e.target.textContent);
                }
            });
        });
    };
            
    this.setState = (newState) => {
        this.state = newState;
        this.render()
    };

    // this.render()
}