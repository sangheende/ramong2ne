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
        menuName : '',//메뉴 이름
    };

    //헤더 및 검색기능
    const header = new Header({
        $app,initialState:{sortBy:this.state.sortBy,searchMenu:this.state.searchMenu},

        //헤더의 검색값
        headerSearchChange : async(searchMenu) => {

            const menuName = await request(0, this.state.category, this.state.sortBy, searchMenu);
            // 검색값이 MenuList에 반영되도록
           const matchName = menuName.menu.filter(elm => elm.name.includes(searchMenu));

           //검색 결과가 없을 때
           let newMenu;
           if(matchName.length === 0){
               alert('검색 결과가 없습니다');
               newMenu = menuName.menu; // 전체 메뉴 보여주기
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
            menuName: menuName,
        })
    }

    init();
}