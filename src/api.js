import jsonData from './data/menu.json' with{type: 'json'};
const Data = jsonData;
export const request = async (startIdx,sortBy,searchMenu,category,menuName)=>{
    try {
        if(Data.menu){
            return Data;
        }
        
    } catch (error) {
        console.log('error')
    }

}