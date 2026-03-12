import jsonData from './data/menu.json' with{type: 'json'};
const currentUrl = 'http://127.0.0.1:5500/';//url 가져오기
const Data = jsonData;

export const request = async (startIdx,sortBy,searchMenu,category,menuName)=>{
    try {
        let url = `${currentUrl}`;
        
        if(Data.menu){
            if(category && category !== '전체'){
                url += `category=${category}?starIdx=${startIdx}`;
            }else{
                url += `?starIdx=${startIdx}`;
            }
    
            if(sortBy){
                url += `&sort=${sortBy}`;
            }
    
            if(searchMenu){
                url += `&search=${searchMenu}`;
            }

            return Data;
        }
        
    } catch (error) {
        console.log('error')
    }

}

export const requestMenuDetail = async (menuId) => {
    try {
        let url = `${currentUrl}menu/${menuId}`;
        if(Data.menu){
            const menuDetailData = Data.menu.find(elm => elm.id === parseInt(menuId));

            return menuDetailData;
        }
    } catch (error) {
        console.log('error')
    }
}