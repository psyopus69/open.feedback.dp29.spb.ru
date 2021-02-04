-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Окт 19 2020 г., 11:28
-- Версия сервера: 5.7.31-cll-lve
-- Версия PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ayysimtu_feedback_base`
--

-- --------------------------------------------------------

--
-- Структура таблицы `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `value` varchar(35) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `answers`
--

INSERT INTO `answers` (`id`, `aid`, `value`) VALUES
(1, 1, '1'),
(2, 2, '2'),
(3, 3, '3'),
(4, 4, '4'),
(5, 5, '5'),
(6, 6, 'да'),
(7, 7, 'нет'),
(8, 8, 'затрудняюсь ответить');

-- --------------------------------------------------------

--
-- Структура таблицы `controllerF`
--

CREATE TABLE `controllerF` (
  `id` int(11) NOT NULL,
  `ankid_qid` varchar(15) NOT NULL,
  `ankname` varchar(55) NOT NULL,
  `value` varchar(155) NOT NULL,
  `aid` varchar(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `controllerF`
--

INSERT INTO `controllerF` (`id`, `ankid_qid`, `ankname`, `value`, `aid`) VALUES
(1, '1_1', 'Оцените качество приема.', 'Удобство зоны ожидания приема.', '1,2,3,4,5'),
(2, '1_2', '', 'Качество обслуживания.', '1,2,3,4,5'),
(3, '1_3', '', 'Доброжелательность врача', '1,2,3,4,5'),
(16, '1_4', '', 'Удовлетворенность заключением врача.', '1,2,3,4,5'),
(17, '1_5', '', 'Наличие номерков предварительной записи.', '1,2,3,4,5'),
(18, '1_6', '', 'Длительность ожидания приема перед кабинетом.', '1,2,3,4,5'),
(19, '6_1', 'Качество работы регистратуры.', 'Оцените работу регистратуры.', '1,2,3,4,5'),
(20, '6_2', '', 'Удовлетворены качеством услуг?', '6,7'),
(21, '1_7', '', 'Готовы посоветовать поликлинику?', '6,7,8');

-- --------------------------------------------------------

--
-- Структура таблицы `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `href` varchar(35) NOT NULL,
  `name` varchar(35) NOT NULL,
  `branch` varchar(35) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `doctors`
--

INSERT INTO `doctors` (`id`, `href`, `name`, `branch`) VALUES
(1, 'Регистратура29', 'Регистратура 29', '29'),
(2, 'Регистратура61', 'Регистратура 61', '61'),
(3, 'МуштуковаМН', 'Муштукова М. Н.', '29'),
(4, 'КарушеваДМ', 'Карушева Д. М.', '61'),
(5, 'ЛутовиноваМА', 'Лутовинова. М. А.', '61'),
(6, 'КулыгинаЕП', 'Кулыгина Е. П.', '61'),
(7, 'АртемьеваТД', 'Артемьева.Т. Д.', '61'),
(8, 'РыбкаНМ', 'Рыбка Н. М.', '61'),
(9, 'ИвановаОВ', 'Иванова О. В.', '61'),
(10, 'ТурлыгинаИЮ', 'Турлыгина И. Ю.', '61'),
(11, 'ШерстенниковБЮ', 'Шерстенников Б. Ю.', '61'),
(12, 'ЕвлоеваТУ', 'Евлоева Т. У.', '61'),
(13, 'КарповаАР', 'Карпова А. Р.', '61'),
(14, 'ЮдинаЕЮ', 'Юдина Е. Ю.', '61'),
(15, 'ХиженковаМС', 'Хиженкова М. С.', '61'),
(16, 'НикитинаЕА', 'Никитина Е. А.', '61'),
(17, 'ПоповаИВ', 'Попова И. В.', '61'),
(18, 'РуппРА', 'Рупп Р. А.', '61'),
(19, 'ЯкимоваНА', 'Якимова Н. А.', '61'),
(20, 'МоторинаНИ', 'Моторина Н. И.', '29'),
(21, 'МихайловаАИ', 'Михайлова А. И.', '29'),
(22, 'ДроздоваЕМ', 'Дроздова Е. М.', '29'),
(23, 'БабичАН', 'Бабич А. Н.', '29'),
(24, 'ГрибковаЯВ', 'Грибкова Я. В.', '29'),
(25, 'МорозоваЮВ', 'Морозова Ю. В.', '29'),
(26, 'КачановецкаяСГ', 'Качановецкая С. Г.', '29'),
(27, 'СудаковаОД', 'Судакова О. Д.', '29'),
(28, 'БорисоваМА', 'Борисова М. А.', '29'),
(29, 'КузнецоваТД', 'Кузнецова Т. Д.', '29'),
(30, 'КовбасинаАЕ', 'Ковбасина А. Е.', '29'),
(31, 'БакутинаИВ', 'Бакутина И. В.', '29'),
(32, 'ГарянинРВ', 'Гарянин Р. В.', '29'),
(33, 'БольшаковаТЕ', 'Большакова Т. Е.', '29');

-- --------------------------------------------------------

--
-- Структура таблицы `feedback_store`
--

CREATE TABLE `feedback_store` (
  `id` int(3) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `doc_name` varchar(25) NOT NULL,
  `href` varchar(15) NOT NULL,
  `ankid` int(3) NOT NULL,
  `answers` varchar(155) NOT NULL,
  `userdata` varchar(555) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aid` (`aid`);

--
-- Индексы таблицы `controllerF`
--
ALTER TABLE `controllerF`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ankid_qid` (`ankid_qid`);

--
-- Индексы таблицы `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `href` (`href`);

--
-- Индексы таблицы `feedback_store`
--
ALTER TABLE `feedback_store`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `controllerF`
--
ALTER TABLE `controllerF`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT для таблицы `feedback_store`
--
ALTER TABLE `feedback_store`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
