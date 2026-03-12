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
                    
                </div>
                <hr />
                <div class="menuDetail__item__caution">
                    <div class="menuDetail__item__caution__title">안내 사항</div>
                    <ul class="menuDetail__item__caution__list">
                        <li class="menuDetail__item__caution__item">
                            <em class="menuDetail__item__caution__item--title"><i data-feather="message-circle"></i>주문 안내</em>
                            <p class="menuDetail__item__caution__item--desc">- 주문 문의 : 카카오톡 채널 <a href="http://pf.kakao.com/_xhvXxcxj/" target="_blank">'라몽이네 뚝떡공방'</a></p>
                            <p class="menuDetail__item__caution__item--desc">- 주문은 최소 2~3일 전에 주문해주세요</p>
                        </li>
                        <li class="menuDetail__item__caution__item">
                            <em class="menuDetail__item__caution__item--title"><i data-feather="truck"></i>배송 안내</em>
                            <p class="menuDetail__item__caution__item--desc">- 답례품: 픽업, 퀵, 택배 배송 가능</p>
                            <p class="menuDetail__item__caution__item--desc">- 케이크: 픽업만 가능, 청주 시내권은 배달 가능</p>
                        </li>
                        <li class="menuDetail__item__caution__item">
                            <em class="menuDetail__item__caution__item--title"><i data-feather="info"></i>특정 알러지가 있으신 경우 꼭 말씀해주세요</em>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="menuDetail__order">
            <a class="menuDetail__order__button" href="http://pf.kakao.com/_xhvXxcxj/" target="_blank">카카오톡으로 문의하기</a>
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