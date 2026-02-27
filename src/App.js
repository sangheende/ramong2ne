import Header from './component/Header.js'
import Category from './component/Category.js'
import MenuDetail from './component/MenuDetail.js'
import MenuList from './component/MenuList.js'

import {request} from './api.js'

export default function App($app) {

    this.state = {
        startIdx : 0,//몇번째 메뉴부터 불러올지
        sortBy : '',//정렬 기준
        searchMenu : '',//검색어
        category : '',//메뉴 카테고리
        menuName : '',//현재 보여줄 메뉴
        allMenu: [] // 전체 메뉴 데이터
    };

    //헤더 및 검색기능
    const header = new Header({
        $app,initialState:{sortBy:this.state.sortBy,searchMenu:this.state.searchMenu},

        //헤더의 검색값
        headerSearchChange : async(searchMenu) => {

            let allMenu = this.state.allMenu;

            const menuName = await request(0, this.state.category, this.state.sortBy, searchMenu);
            // 검색값이 MenuList에 반영되도록
           const matchName = allMenu.filter(elm => elm.name.includes(searchMenu));

           //검색 결과가 없을 때
           let newMenu;
           if(matchName.length === 0){
               alert('검색 결과가 없습니다');
               newMenu = allMenu; // 전체 메뉴 보여주기
           } else {
               newMenu = matchName; // 검색 결과만 보여주기
           }
           this.setState({
               ...this.state,
               startIdx: 0,
               menuName: { menu: newMenu },
               searchMenu: searchMenu
           });

        }
    });

// Category 인스턴스 생성 (아직 append하지 않음)
    const category = new Category({
        $app,
        initialState: this.state.category,
        handleCategory: async (category) => {
            let categoryName = category.replace(/^[^ ]+ /, '');
            let allMenu = this.state.allMenu;

            let categoryMenu;

            if(categoryName === "전체"){
                categoryMenu = allMenu;
            } else if(categoryName === "계절메뉴"){
                categoryMenu = allMenu.filter(elm => elm.info.season);
            }else{
                categoryMenu = allMenu.filter(elm => elm.category.includes(categoryName));
            }

            this.setState({
                ...this.state,
                startIdx: 0,
                sortBy: 'total',
                category: category,
                menuName : {menu:categoryMenu},
                searchMenu: ''
            });
        }
    });

    const menuList = new MenuList({
        $app,
        initialState: this.state.menuName,
    });

    //세부 메뉴
    const menuDetail = new MenuDetail();


    this.setState = (newState)=> {
        this.state = newState;

        header.setState({
            searchMenu: this.state.searchMenu
        });
        category.setState(this.state.category);
        //메뉴 리스트에 상태 전달
        menuList.setState(this.state.menuName);



        if (window.feather) {
           window.feather.replace();
        }
    }

    const init = async() => {
        const menuName = await request(this.state.startIdx, this.state.sortBy,this.state.searchMenu,this.state.category,this.state.menuName)
        this.setState({
            ...this.state,
            allMenu: menuName.menu,
            menuName: {menu: menuName.menu},
        })
    }

    init();
}