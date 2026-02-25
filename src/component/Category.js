
export default function Category({$header, initialState, handleCategory}) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'category';

    this.handleCategory = handleCategory;

    this.template = () => {
        let temp = `
            <h3>카테고리</h3>
        `;
        return temp;
    };

    
    this.render = () => {
        this.$target.innerHTML = this.template();
    };

    this.setState = (newState) => {
        this.state = newState;
        this.render()
    };

    // this.render()
}