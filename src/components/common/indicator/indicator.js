import './indicator.css';

function Indicator() {
  const div = document.createElement('div');
  div.classList.add('mask');
  div.innerHTML = '<div class="wrapper"><div class="spin"></div></div>';
  this.flag = false;
  this.open = () => {
    document.body.appendChild(div);
    this.flag = true;
  };
  this.close = () => {
    if (this.flag)document.body.removeChild(div);
    this.flag = false;
  };
}

export default new Indicator();
