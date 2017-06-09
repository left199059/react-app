import './indicator.css';

function Indicator() {
  const div = document.createElement('div');
  div.classList.add('mask');
  div.innerHTML = '<div class="wrapper"><div class="spin"></div></div>';
  this.open = () => {
    document.body.appendChild(div);
  };
  this.close = () => {
    document.body.removeChild(div);
  };
}

export default new Indicator();
