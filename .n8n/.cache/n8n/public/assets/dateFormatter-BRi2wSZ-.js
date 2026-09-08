import { j2 as dateformat } from "./index-40I5DMGP.js";
const convertToDisplayDateComponents = (fullDate) => {
  const mask = `d mmm${new Date(fullDate).getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? "" : ", yyyy"}#HH:MM:ss`;
  const formattedDate = dateformat(fullDate, mask);
  const [date, time] = formattedDate.split("#");
  return { date, time };
};
function convertToDisplayDate(fullDate) {
  const mask = `d mmm${new Date(fullDate).getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() ? "" : ", yyyy"}#HH:MM:ss`;
  const formattedDate = dateformat(fullDate, mask);
  const [date, time] = formattedDate.split("#");
  return { date, time };
}
const toDayMonth = (fullDate) => dateformat(fullDate, "d mmm");
const toTime = (fullDate) => dateformat(fullDate, "HH:MM:ss");
export {
  toTime as a,
  convertToDisplayDate as b,
  convertToDisplayDateComponents as c,
  toDayMonth as t
};
