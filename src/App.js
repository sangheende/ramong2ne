import Header from './component/Header.js'
import Category from './component/Category.js'
import MenuDetail from './component/MenuDetail.js'
import MenuList from './component/MenuList.js'

import {request, requestMenuDetail} from './api.js'

export default function App($app) {

    this.state = {
        startIdx : 0,//몇번째 메뉴부터 불러올지
        sortBy : '',//정렬 기준
        searchMenu : '',//검색어
        category : '',//메뉴 카테고리
        menuName : '',//현재 보여줄 메뉴
        allMenu: [], // 전체 메뉴 데이터

        currentPage: window.location.pathname
    };

    // 컴포넌트 인스턴스 1회만 생성
    const header = new Header({
        $app,
        initialState: { sortBy: this.state.sortBy, searchMenu: this.state.searchMenu, currentPage: this.state.currentPage },
        headerSearchChange: async (searchMenu) => {
            let allMenu = this.state.allMenu;
            history.pushState(null, null, `/전체?search=${searchMenu}`);
            // 전체 메뉴에서 검색
            const matchName = allMenu.filter(elm => elm.name.includes(searchMenu));
            this.setState({
                ...this.state,
                category: '전체',
                startIdx: 0,
                menuName: { menu: matchName },
                searchMenu: searchMenu,
            });
            console.log(searchMenu);
        }
    });

    const category = new Category({
        $app,
        initialState: this.state.category,
        handleCategory: async (categoryName) => {
            let pureCategory = categoryName.replace(/^[^ ]+ /, '');
            let allMenu = this.state.allMenu;
            history.pushState(null, null, `/${pureCategory}`);
            let categoryMenu;
            if (pureCategory === "전체") {
                categoryMenu = allMenu;
            } else if (pureCategory === "계절메뉴") {
                categoryMenu = allMenu.filter(elm => elm.info.season);
            } else {
                categoryMenu = allMenu.filter(elm => elm.category.includes(pureCategory));
            }
            this.setState({
                ...this.state,
                startIdx: 0,
                sortBy: 'total',
                category: categoryName,
                menuName: { menu: categoryMenu },
                searchMenu: ''
            });
        }
    });

    const menuList = new MenuList({
        $app,
        initialState: this.state.menuName,

        handleMenuClick : (menuId) => {
            history.pushState(null,null,`menu/${menuId}`);
            this.setState({
                ...this.state,
                currentPage: `menu/${menuId}`
            })
        }
    });

    //세부 메뉴
    const menuDetail = new MenuDetail({
       $app, 
       initialState: {currentPage: this.state.currentPage},
        renderMenuDetail: async (id) => {
            const menuId = id.split('/')[1];
            const menuDetailData = await requestMenuDetail(menuId);

            return menuDetailData;
              
        }
            // const menuDetailData = await requestMenuDetail(menuId);
    });



    const render = () => {
        const path = this.state.currentPage;
        $app.innerHTML = '';

        if (path.startsWith('menu/')) {
            header.setState({ sortBy: this.state.sortBy, searchMenu: this.state.searchMenu, currentPage: this.state.currentPage });
            menuDetail.setState({currentPage: path});
            $app.appendChild(header.$target);
            $app.appendChild(menuDetail.$target);
        } else {
            header.setState({ sortBy: this.state.sortBy, searchMenu: this.state.searchMenu, currentPage: this.state.currentPage });
            category.setState({ ...this.state});
            menuList.setState(this.state.menuName);
            $app.appendChild(header.$target);
            $app.appendChild(category.$target);
            $app.appendChild(menuList.$target);
        }
    }

    this.setState = (newState) => {
        this.state = newState;
        render();
        if (window.feather) {
            window.feather.replace();
        }
    }

    const init = async() => {
         const path = this.state.currentPage;

            if (path.startsWith('menu/')) {
                

                render();
            }else {
                const menuName = await request(this.state.startIdx, this.state.sortBy,this.state.searchMenu,this.state.category,this.state.menuName)
                this.setState({
                    ...this.state,
                    allMenu: menuName.menu,
                    menuName: {menu: menuName.menu},
                })
            };
    }

    init();
}