// dj非热门类型

export default  (query, request) => {

  return request(
    'POST', `http://music.163.com/weapi/djradio/category/excludehot`, {},
    {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
  )
};
