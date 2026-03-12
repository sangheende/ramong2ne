export default function MenuDetail({$app,initialState , renderMenuDetail}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'menuDetail';
    this.renderMenuDetail = renderMenuDetail;

    // $app.appendChild(this.$target);
    this.template = async () => {
        let menuData = await this.renderMenuDetail(this.state.currentPage);
        
        let taste = menuData.info.taste? menuData.info.taste.map((item)=> {
            return `
<div class="menuDetail__taste__item">
                    <div class="menuDetail__taste__item--img"></div>
                    <p class="menuDetail__taste__item--name">${item}</p>
                </div>`
        }).join('') : '';

        let temp = `
        <div class="menuDetail__item">
            <div class="menuDetail__item__img">
                <img src="${menuData.image}" alt="${menuData.name}">
            </div>
            <div class="menuDetail__item__content">
                <div class="menuDetail__item__title">
                    <h2 class="menuDetail__item__title--name">${menuData.name}</h2>
                    <p class="menuDetail__item__title--price">${menuData.price}</p>
                </div>        
                <p class="menuDetail__item__desc">${menuData.info.desc}</p>
                <div class="menuDetail__item__taste" style="display: ${menuData.info.taste? 'block' : 'none'}">
                   <div class="menuDetail__taste__list">
                        ${menuData.info.taste? taste : ''}
                    </div>
                </div>
                <div class="menuDetail__item__info">
                    <div class="menuDetail__item__info--use"><i data-feather="thumbs-up"></i>${menuData.info.use}</div>
                    <div class="menuDetail__item__info--custody"><i data-feather="package"></i>${menuData.info.custody}</div>
                    <div class="menuDetail__item__info--storage"><i data-feather="pocket"></i>${menuData.info.storage}</div>
                    <div class="menuDetail__item__info--warning"><i data-feather="alert-triangle"></i>${menuData.info.warning}</div>
                </div>
            </div>
        </div>
        `;
        return temp;

    };
    
    this.render = async () => {
        this.$target.innerHTML = await this.template();
        if (window.feather) {
            window.feather.replace();
            }
        };  
    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }
}