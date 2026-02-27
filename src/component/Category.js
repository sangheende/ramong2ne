
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
    
    this.render = () => {
        this.$target.innerHTML = this.template();
        
        let categoryItems = this.$target.querySelectorAll('.category__item');
        
        categoryItems.forEach((elm) => {
            
            elm.addEventListener('click', (e) => {
                console.log(categoryList.indexOf(e.target.textContent))
                if(this.handleCategory){
                    this.setState({
                        selectedIdx : categoryList.indexOf(e.target.textContent)
                    })
                    this.handleCategory(e.target.textContent)

                }
            });
        });
    };
            
    this.setState = (newState) => {
        this.state = {
        ...this.state,
        ...newState
    };
        this.render()
    };

    // this.render()
}