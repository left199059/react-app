// import React, { Component } from 'react';

function Toast(msg, during = 2000) {
  const div = document.createElement('div');
  div.classList.add('mui-toast-container');
  div.innerHTML = `<div class="mui-toast-message">${msg}</div>`;
  document.body.appendChild(div);
  div.classList.add('mui-active');
  setTimeout(() => {
    document.body.removeChild(div);
  }, during);
}

export default Toast;
