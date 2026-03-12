import App from './src/App.js';

const $app = document.getElementById('app');
window.app = new App($app);

window.addEventListener('popstate', () => {
  window.app.setState({ 
    ...window.app.state,
    currentPage: window.location.pathname }
);
});