import jsonData from './data/menu.json' with{type: 'json'};
const currentUrl = window.location.href;//url 가져오기
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

        const response = await fetch(url);
        
    } catch (error) {
        console.log('error')
    }

}

export const requestMenuDetail = async (menuId) => {
    try {
        const response = await fetch(`${currentUrl}menu/${menuId}`);
        if (response) {
            let data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log('error')
    }
}