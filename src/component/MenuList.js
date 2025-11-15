export default function MenuList({$app, initialState}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'menuList';

    $app.appendChild(this.$target);

    
    this.template = () => {
        let temp = `<div class="menuList__container">`;
        if (this.state) {
            this.state.menu.forEach((elm) => {
                temp += `
                    <div class="city-item" id=${elm.id}>
                        <img src=${elm.image}></img>
                        <div class="city-item-info">${elm.name}</div>
                        <div class="city-item-score">⭐️ ${elm.price}</div>
                    </div>
               `;
            });
            temp += `</div>`;
        }
        return temp;
    };

    this.render = () => {
        console.log(this.state.menuName)
        this.$target.innerHTML = this.template();
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }
}