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

    const header = new Header();
    const category = new Category();
    const menuDetail = new MenuDetail();
    const menuList = new MenuList({
        $app,
        initialState: this.state.menuName,
    });

    this.setState = (newState)=> {
        this.state = newState;

        //메뉴 리스트에 상태 전달
        menuList.setState(this.state.menuName);
    }

    const init = async() => {
        const menuName = await request(this.state.startIdx, this.state.sortBy,this.state.searchMenu,this.state.category,this.state.menuName)
        this.setState({
            ...this.state,
            menuName: menuName,
        })

        console.log(menuName)
    }

    init();
}