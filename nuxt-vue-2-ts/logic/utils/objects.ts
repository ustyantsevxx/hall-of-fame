export const collectObjectValues = (ob: object) => {
  const values: any[] = []

  for (const key in ob) {
    if (typeof ob[key] === 'object') {
      values.push(...collectObjectValues(ob[key]))
    } else {
      values.push(ob[key])
    }
  }
  return values
}
