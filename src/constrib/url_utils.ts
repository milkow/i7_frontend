export function objectToQuery(o: object): string {
  const parts = []
  Object.keys(o).forEach(k => {
    parts.push(`${k}=${o[k]}`)
  })
  return `?${parts.join('&')}`
}

export function queryToObject(q: string): any {
  q = q[0] === '?' ? q.substr(1) : q
  const parts = q.split('&')
  return parts.reduce((all, item) => {
    const kv = item.split('=')
    all[kv[0]] = kv[1]
    return all
  }, {})
}
