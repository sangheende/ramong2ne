export default function MenuList({$app, initialState, handleMenuClick}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'menuList';
    this.handleMenuClick = handleMenuClick;

    // $app.appendChild(this.$target);

    let today = new Date();
    let month = today.getMonth() + 1;

    let seasonMenu;

   switch (month) {
        case 12:
        case 1:
        case 2:
            seasonMenu = "winter";
            break;
        case 3:
        case 4:
        case 5:
            seasonMenu = "spring";
            break;
        case 6:
        case 7:
        case 8:
            seasonMenu = "summer";
            break;
        case 9:
        case 10:
        case 11:
            seasonMenu = "fall";
            break;
    }
    
    
    this.template = () => {
        let temp = `<div class="menuList__content">`;
        if (this.state) {
            this.state.menu.forEach((elm) => {

                temp += `
                    <div class="menuList__item${Array.isArray(elm.info.season) && !elm.info.season.includes(seasonMenu) ? ' menuList__item--disabled' : ''}" id=${elm.id}>
                        <div class="menuList__item__thumnail">
                            <img src=${elm.image}></img>
                        </div>
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
        let menuItems = this.$target.querySelectorAll('.menuList__item');
        menuItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                this.handleMenuClick(e.currentTarget.id);
            })
        })
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }
}