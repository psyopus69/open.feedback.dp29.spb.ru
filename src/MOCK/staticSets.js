import React from "react";
import {sqlRequests} from "../API/sqlRequests";
import withAsyncFabric from "../HOC/withAsyncFabric";
import withCustomState from "../HOC/withCustomState";
import {AsyncFabric} from "../components/asyncFabric.jsx";
import {PageStatistic} from "../components/pageStatistic.jsx";
import {Generator} from "../components/generator.jsx";

const mockPageInfo = {
  hrefs: {
    statistic: {
      all: `all`,
    },
  },
  statisticTables: [
    {
      name: `doctors`,
      sql: sqlRequests.selectAllDoctors,
    },
    {
      name: `statistic`,
      sql: sqlRequests.getStatistic,
    },
    {
      name: `answers`,
      sql: sqlRequests.selectAllAnswers,
    },
    {
      name: `schema`,
      sql: sqlRequests.selectSchema,
    },
  ],
  formUserFields: {
    fields: [
      {
        name: `Имя Ребенка (прикрепленного)`,
        type: `string`,
        range: 10,
        placeholder: `Иванов И.И.`,
        require: {
          schema: {
            min: 2,
            max: 25,
            type: `any`,
          },
        }
      },
      {
        name: `Дата рождения Ребенка`,
        type: `number`,
        range: 12,
        placeholder: `12/04/2017`,
        require: {
          schema: {
            min: 6,
            max: 15,
            type: `any`,
          },
        }
      },
      {
        name: `Телефон для обратной связи`,
        type: `number`,
        range: 12,
        placeholder: `8 999 111 22 33`,
        require: {
          schema: {
            min: 7,
            max: 15,
            type: `any`,
          },
        }
      },
      {
        name: `Сообщение (не более 3500 символов)`,
        type: `textarea`,
        range: {
          rows: 13,
          cols: 500,
        },
        placeholder: `Введите сообщение`,
        require: {
          schema: {
            min: 0,
            max: 3501,
            type: `any`,
          },
        }
      },
    ],
  },
  fabricTables: [
    {
      name: `doctors`,
      sql: sqlRequests.selectAllDoctors,
    },
    {
      name: `answers`,
      sql: sqlRequests.selectAllAnswers,
    },
    {
      name: `schema`,
      sql: sqlRequests.selectSchema,
    },
  ],
  generatorTables: [
    {
      name: `doctors`,
      sql: sqlRequests.selectAllDoctors,
    },
    {
      name: `schema`,
      sql: sqlRequests.selectSchema,
    },
  ],
  generatorFields: {
    fields: [
      {
        name: `Имя Врача`,
        placeholder: `Все врачи (общий список)`,
        tableName: `doctors`,
      },
      {
        name: `Номер анкеты`,
        placeholder: `Все анкеты (общий список)`,
        tableName: `schema`,
      },
    ],
  },
  errorTimeShow: 3000,
  qrSize: 256,
  globalDomainName: `https://feedback.pol29.shn-host.ru`,
  // globalDomainName: `http://localhost:1337`,
  generatorForm: {
    minWidth: 450,
  },
};
const pageMap = [
  {
    name: `feedback`,
    href: `/feedback`,
    component: function getComponent(params) {
      const {apiIn} = params;
      const AsyncFabricWrapped = withAsyncFabric(withCustomState(AsyncFabric));
      return <AsyncFabricWrapped tablesSchema={mockPageInfo.fabricTables} api={apiIn} />;
    },
  },
  {
    name: `statistic`,
    href: `/statistic`,
    component: function getComponent(params) {
      const {apiIn} = params;
      const PageStatisticWrapped = withAsyncFabric(PageStatistic);
      return <PageStatisticWrapped api={apiIn} tablesSchema={mockPageInfo.statisticTables} />;
    },
  },
  {
    name: `firstScreen`,
    href: `/`,
    component: function getComponent() {
      return <div>It works! Width: {window.innerWidth}px</div>;
    },
  },
  {
    name: `generator`,
    href: `/generator`,
    component: function getComponent(params) {
      const GeneratorWrapped = withAsyncFabric(Generator);
      const {apiIn} = params;
      return <GeneratorWrapped tablesSchema={mockPageInfo.generatorTables} api={apiIn} />;
    },
  },
];
const pS = [
  {
    login: `adm`,
    password: `pas`,
    role: `FullUser`,
    name: `Администратор`,
  },
  {
    login: `adm`,
    password: `her`,
    role: `admin`,
    name: `Supa dupa admin`,
  },
];
export {
  mockPageInfo,
  pageMap,
  pS,
};
