export default formatDt = (dt) => {
  let created = new Date(dt);
  console.log(created);
  return created.getDate()+(created.getMonth()+1)+created.getYear()
}
