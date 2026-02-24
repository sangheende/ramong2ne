export default function MenuList({$app, initialState}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'menuList';

    $app.appendChild(this.$target);

    
    this.template = () => {
        let temp = `<div class="menuList__content">`;
        if (this.state) {
            console.log(this.state.menu)
            this.state.menu.forEach((elm) => {
                temp += `
                    <div class="menuList__item" id=${elm.id}>
                        <img src=${elm.image}></img>
                        <div class="menuList__item__name">${elm.name}</div>
                        <div class="menuList__item__price">${elm.price}</div>
                    </div>
               `;
            });
            temp += `</div>`;
        }
        return temp;
    };

    this.render = () => {
        this.$target.innerHTML = this.template();
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }
}