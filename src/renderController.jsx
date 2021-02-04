import React from "react";
import {api} from "./API/api";
import {pageMap} from "./MOCK/staticSets";
import staticFunctions from "./FUNC/staticFunc";
import {PageError} from "./components/pageError.jsx";

const {getPathname} = staticFunctions;
const screenSwitch = (path, apiIn) => {
  for (let i = 0; i < pageMap.length; i++) {
    if (pageMap[i].href === path) {
      return pageMap[i].component({
        apiIn,
      });
    }
  }
  return <PageError msg={`Ошибка 404. Страница не найдена.`} />;
};
const RenderController = (props) => {
  const {} = props;
  return <React.Fragment>
    {screenSwitch(getPathname(), api)}
  </React.Fragment>;
};
export {
  RenderController,
};
