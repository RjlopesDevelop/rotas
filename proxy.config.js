const proxy = [
    {
      context: '/api',
      target: 'http://localhost:5000',
      pathRewrite: {'^/rota' : ''}
    }
  ];
  export default proxy;