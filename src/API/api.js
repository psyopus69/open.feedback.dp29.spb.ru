import axios from "axios";

const necessaryParams = `&log=modxFeed&pass=hardPsOfModXFeed&secretJs=SoHardPassPhrase`;
const to = `https://feedback.pol29.shn-host.ru/index.php?id=2`;
const api = (obj) => {
  const {params, sql} = obj;
  return axios.create({
    baseURL: to + necessaryParams + (params === undefined ? `` : params) + (sql === `` ? `` : `&sql=` + sql),
    timeout: 1000 * 5,
    withCredentials: true,
  });
};
export {
  api,
};
