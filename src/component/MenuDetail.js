export default function MenuDetail() {
    this.$target = document.createElement('div');
    this.$target.className = 'menuDetail';

    this.template = () => {

    };

    this.render = () => {}

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }
}