// 电台节目列表
import {toBoolean} from "../util"
export default  (query, request) => {
  const data = {
    radioId: query.rid,
    limit: query.limit || 30,
    offset: query.offset || 0,
    asc: toBoolean(query.asc)
  }
  console.log(toBoolean(query.asc))
  return request(
    'POST',
    `https://music.163.com/weapi/dj/program/byradio`,
    data,
    { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
  )
}
