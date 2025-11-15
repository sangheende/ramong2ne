export default function Category() {
    this.$target = document.createElement('div');
    this.$target.className = 'category';

    this.template = () => {

    };

    this.render = () => {}

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }
}