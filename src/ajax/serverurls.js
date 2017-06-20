const SERVERS = {
  develop: {
    authServer: 'http://118.190.66.52:10500',
    httpAppServer: 'http://121.42.151.43:10100',
    oilServer: 'http://121.42.151.43:10200',
    strokeService: 'http://118.190.66.52:10900',
    insService: 'http://121.42.151.43:10300/',
    // 驾驶DNA key
    dnaKey: 'D542B97C56D9905E8C6E17BA0BB45A72',
    dnaRegister: 'http://115.28.253.244:7030',
  },
  produce: {
    authServer: 'https://auth.kcnzq.com:1050',
    httpAppServer: 'https://app.kcnzq.com:1010',
    oilServer: 'https://oil.kcnzq.com:1020',
    strokeService: 'https://stroke.kcnzq.com:1090',
    insService: 'https://app.kcnzq.com:1030/',
    // 驾驶DNA key
    dnaKey: 'CF4728C33E622BD92F3C02E7700DF23A',
    dnaRegister: 'https://sdk.kcnzq.com:7034',
  },
};

export default SERVERS.develop;
