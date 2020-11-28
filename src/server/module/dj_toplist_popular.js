// 24小时榜
export default (query, request) => {
  const data = {
    limit: query.limit || 100
    // 不支持 offset
  }
  return request(
    'POST', `https://music.163.com/api/dj/toplist/popular`, data,
    {crypto: 'weapi', cookie: query.cookie, proxy: query.proxy}
  )
}
