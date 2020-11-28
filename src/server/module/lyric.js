// 歌词

export default  (query, request) => {
  query.cookie.os = 'pc';
  const data = {
    id: query.id,
    lv: -1,
    kv: -1,
    tv: -1
  }
  return request(
    'POST',
    `https://music.163.com/api/song/lyric`,
    data,
    { crypto: 'linuxapi', cookie: query.cookie, proxy: query.proxy }
  )
}
