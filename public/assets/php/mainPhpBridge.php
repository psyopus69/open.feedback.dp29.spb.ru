<?php
/*  necessary  $goLog ; $goPs ; $secretJs + $sql ; $answers (qid_aid1,aid2;...;qidN_aid1,aid2) && $ankidPost && $href && $userdata && $countAnkId if need */
//echo "someP = ".$someP."  |  secretJs = ".$secretJs."  |  sql = ".$sql."  |  goLog = ".$goLog."  |  goPs = ".$goPs;
// if counter use, need $pageName = reactMain | 
$hosts = $_SERVER['HTTP_ORIGIN'];
header('Access-Control-Allow-Origin: '.$hosts);
header('Access-Control-Allow-Credentials: true');
header('Content-Type: charset=utf-8');
$logins=[];
$logins[0] = ['modxFeed', 'hardPsOfModXFeed'];
$logins[1] = ['modxViewers', 'hardPsOfViewers'];
$secretSession = "SoHardPassPhrase";

// Test your connection
//echo $o = ($xpdo->connect()) ? 'Connected' : 'Not Connected';
$today = date('j/m/y H:i:s');
if($secretJs==$secretSession && (($goLog==$logins[0][0] && $goPs==$logins[0][1]) || ($goLog==$logins[1][0] && $goPs==$logins[1][1])) ){
$checkP="no";
$role;
$name;
$howMuchWordsLengs = 35;// <- len of end datas from table. for func mb_strimwidth()
//if($goLog!=""&&$goPs!=""){
$host = 'localhost';
$username = '*';
$password = '*';
$dbname = '*';
$port = 3306;
$charset = 'utf8';
$dsn = "mysql:host=$host;dbname=$dbname;port=$port;charset=$charset";
$xpdo = new xPDO($dsn, $username, $password);

		if($sql == "selectAllDoctors"){
$objects = [];
$results = $xpdo->query("SELECT * FROM `doctors` ORDER BY `href`");
	while ($r = $results->fetch(PDO::FETCH_ASSOC)) {
$object = [
      'name' => $r["name"],
      'href' => $r["href"],
      'branch' => $r["branch"],
    ];
	array_push($objects, $object);
}
  echo json_encode( $objects );
  return;
		}

		if($sql == "selectAllAnswers"){
$objects = [];
$results = $xpdo->query("SELECT * FROM `answers`");
	while ($r = $results->fetch(PDO::FETCH_ASSOC)) {
$object = [
      'aid' => (int)$r["aid"],
      'value' => $r["value"],
    ];
	array_push($objects, $object);
}
  echo json_encode( $objects );
  return;
		}

		if($sql == "selectSchema"){
$objects = [];
$forPr = [];
$results = $xpdo->query("SELECT * FROM `controllerF`");
	while ($r = $results->fetch(PDO::FETCH_ASSOC)) {
	//	$fSplit = $r["ankid_qid"];
		$fSplit = explode("_", $r["ankid_qid"]);
		$ankid = $fSplit[0];
		$qid = $fSplit[1];
		$fSplit2 = explode(",", $r["aid"]);
		$fakeAids = [];
		for ($i=0; $i<count($fSplit2); $i++){
			array_push($fakeAids, (int)$fSplit2[$i]);
		}

$object = [
      'ankid' => (int)$ankid,
      'qid' => (int)$qid,
      'ankname' => $r["ankname"],
      'aids' => $fakeAids,
	  'value' => $r["value"]
    ];
	array_push($forPr, $object);
}
//------
		for ($i2=0; $i2<count($forPr); $i2++){
			$needAdd = true;
			if ($i2 == 0) {
				if ((int)array_values($forPr[$i2])[1] == 1) {
								$objectFirst = [
					'ankid' => (int)array_values($forPr[$i2])[0],
					'questions' => [
					[
					'qid' => (int)array_values($forPr[$i2])[1],
					'ankname' => array_values($forPr[$i2])[2],
					'aids' => array_values($forPr[$i2])[3],
					'value' => array_values($forPr[$i2])[4]
					],
					],
				];
				} else {
									$objectFirst = [
					'ankid' => (int)array_values($forPr[$i2])[0],
					'questions' => [
					[
					'qid' => (int)array_values($forPr[$i2])[1],
					'aids' => array_values($forPr[$i2])[3],
					'value' => array_values($forPr[$i2])[4]
					],
					],
				];

				}

				array_push($objects, $objectFirst);
			$needAdd = false;
			}
			else {
			for ($i=0; $i<count($objects); $i++){
				$faa = $objects[$i]['questions'];
				if (array_values($objects[$i])[0] == array_values($forPr[$i2])[0]) {
					if ((int)array_values($forPr[$i2])[1] == 1) {
					array_push($objects[$i]['questions'], [
					'qid' => (int)array_values($forPr[$i2])[1],
					'ankname' => array_values($forPr[$i2])[2],
					'aids' => array_values($forPr[$i2])[3],
					'value' => array_values($forPr[$i2])[4],
				]);
					} else {
					array_push($objects[$i]['questions'], [
					'qid' => (int)array_values($forPr[$i2])[1],
					'aids' => array_values($forPr[$i2])[3],
					'value' => array_values($forPr[$i2])[4],
				]);
					}


			$needAdd = false;
				}
		}
			}

		if ($needAdd) {
								if ((int)array_values($forPr[$i2])[1] == 1) {
					$objectFirst = [
					'ankid' => (int)array_values($forPr[$i2])[0],
					'questions' => [
					[
					'qid' => (int)array_values($forPr[$i2])[1],
					'ankname' => array_values($forPr[$i2])[2],
					'aids' => array_values($forPr[$i2])[3],
					'value' => array_values($forPr[$i2])[4],
					],
					],
				];
								} else {
					$objectFirst = [
					'ankid' => (int)array_values($forPr[$i2])[0],
					'questions' => [
					[
					'qid' => (int)array_values($forPr[$i2])[1],
					'aids' => array_values($forPr[$i2])[3],
					'value' => array_values($forPr[$i2])[4],
					],
					],
				];
								}

				array_push($objects, $objectFirst);
		}
		}
  echo json_encode( $objects );
		return;
		}

		if ($sql == "postFeedback") {
	if ($answers == '' || $ankidPost == '' || $href == ''|| $userdata == '') {
		$object = [
      'answer' => "wrong data!",
      'answers' => $answers,
	  'ankidPost' => $ankidPost,
      'href' => $href,
	  'userdata' => $userdata,
    ];
  echo json_encode( $object );
	} else {
		$results2 = $xpdo->query("SELECT * FROM `doctors` WHERE href = '$href'");
		while ($r = $results2->fetch(PDO::FETCH_ASSOC)) {
			$doc_name = $r["name"];
			$doc_branch = $r["branch"];
		}
		if ($doc_name == '') {
			$doc_name = 'не найден';
			$doc_branch = 'врач не найден';
		}

$ip = $_SERVER['REMOTE_ADDR'];
$link = "INSERT INTO `feedback_store` (`ip`, `doc_name`, `href`, `ankid`, `answers`, `userdata`) VALUES ('$ip', '$doc_name', '$href', '$ankidPost', '$answers', '$userdata')";
		$results = $xpdo->query($link);
		$ankPostedId = $xpdo->lastInsertId($link);
		if ($results) {
			$results = 'success';
		}
		$object = [
      'answer' => $results,
      'answers' => $answers,
	  'ankidPost' => $ankidPost,
      'href' => $href,
	  'userdata' => $userdata,
    ];
sendReview($answers, $userdata, $doc_name, $ankidPost, $ip, $ankPostedId, $doc_branch);
  echo json_encode( $object );
	}
	return;
}

		if ($sql == "countAnk") {
			if ($countAnkId == '') {
		$object = [
      'answer' => 'wrong',
      'countAnkId' => $countAnkId,
    ];
			echo json_encode( $object );
			return;
		}
			$results = $xpdo->query("SELECT * from `feedback_store` WHERE `feedback_store`.`ankid` = ".$countAnkId);
		$object = [
      'answer' => 'success',
      'countAnkId' => $countAnkId,
      'count' => $results->rowCount(),
    ];
  echo json_encode( $object );
return;
		}

		if ($sql == "getActiveReviews") {
		$results = $xpdo->query("SELECT * from `controllerF`");
		$fakeActiveAnk = [];
			while ($r = $results->fetch(PDO::FETCH_ASSOC)) {
				$ankid = explode('_', $r['ankid_qid']);
				$ankid = $ankid[0];
				if (count($fakeActiveAnk) == 0) {
					array_push($fakeActiveAnk, $ankid);
				}
				$needpush = true;
				for($i = 0; $i < count($fakeActiveAnk); $i++) {
					if ($fakeActiveAnk[$i] == $ankid) {
						$needpush = false;
						break;
					}
					//array_push($fakeActiveAnk, $r['ankid']);
				}
				if ($needpush) {
					array_push($fakeActiveAnk, $ankid);
				}
			}
					$object = [
					  'answer' => 'success',
					  'activeReviews' => $fakeActiveAnk,
					];
  echo json_encode( $object );
  return;
		}
		if ($sql == "getStatistic") {
$objects = [];
$results = $xpdo->query("SELECT * FROM `feedback_store`");
	while ($r = $results->fetch(PDO::FETCH_ASSOC)) {
		if (count($objects) == 0) {
			$results2 = $xpdo->query("SELECT * FROM `controllerF` where `controllerF`.`ankid_qid` = '".$r['ankid']."_1'");
			while ($r2 = $results2->fetch(PDO::FETCH_ASSOC)) {
					$needAnkName = $r2['ankname'];
			}
		$object = [
		  'ankid' => $r["ankid"],
		  'name' => $needAnkName,
		  'answers' => [
				$r["href"].":".$r["answers"]
		  ],
		  'count' => 1,
		];
		array_push($objects, $object);
		}
		else {
			$needAdd = true;
			for($i = 0; $i < count($objects); $i++) {
				if ($objects[$i]['ankid'] == $r['ankid']) {
			array_push($objects[$i]['answers'], $r["href"].":".$r["answers"]);
			$objects[$i]['count'] = $objects[$i]['count'] + 1;
					$needAdd = false;
					break;
				}
			}
			if ($needAdd) {
				$results2 = $xpdo->query("SELECT * FROM `controllerF` where `controllerF`.`ankid_qid` = '".$r['ankid']."_1'");
			while ($r2 = $results2->fetch(PDO::FETCH_ASSOC)) {
					$needAnkName = $r2['ankname'];
			}
				$object = [
				'ankid' => $r["ankid"],
				'name' => $needAnkName,
				'answers' => [
				$r["href"].":".$r["answers"],
					],
				'count' => 1,
				];
				array_push($objects, $object);
			}
		}
}
  echo json_encode( $objects );
  return;
		}

		if ($sql == "test" && $userdata != '') {
			echo $userdata;
		}

		if ($sql == 'addVisit' || $sql == 'getCount') {
					$today = date("m.d.y");
		if ($pageName == '') {
					$object = [
		  'name' => $pageName,
		  'sql' => $sql,
		  'answer' => 'wrong name',
		];	
  echo json_encode( $object );
  return;
		}
		if ($sql == 'addVisit') {
		//$results2 = $xpdo->query("SELECT * FROM `counters` where `counters`.`name` = '$pageName'");
		$results2 = $xpdo->query("SELECT * FROM `counters` where `counters`.`date` = '$today' and `counters`.`name` = '$pageName'");
		while ($r2 = $results2->fetch(PDO::FETCH_ASSOC)) {
			$needDayDate = $r2['date'];
		}
			if ($needDayDate != $today) {
				$xpdo->query("INSERT INTO `counters` (`name`, `date`) VALUES ('$pageName', '$today')");
			} else {
				$xpdo->query("UPDATE `counters` SET `value` = `counters`.`value` + 1 WHERE `counters`.`date` = '$today' and `counters`.`name` = '$pageName'");
			}	
		$object = [
		  'name' => $pageName,
		  'sql' => $sql,
		  'answer' => 'success, date: '.$needDayDate.', today: '.$today,
		];	
  echo json_encode( $object );
  return;
	}
		if ($sql == 'getCount')	{
		$results2 = $xpdo->query("SELECT * FROM `counters` where `counters`.`name` = '$pageName' and `counters`.`date` = '$today'");
		while ($r2 = $results2->fetch(PDO::FETCH_ASSOC)) {
				$needDayCounter = $r2['value'];
		}	
		if ($needDayCounter == '') {
			$needDayCounter = 0;
		}	
		$object = [
		  'name' => $pageName,
		  'sql' => $sql,
		  'date' => 'today: '.$today,
		  'data' => $needDayCounter,
		];	
  echo json_encode( $object );
  return;
	}
}
	$object = [
	  'answer' => 'wrong',
	  'sql' => $sql,
	];
	echo json_encode($object);
}
else{
	echo "no no no ...";
}

function sendReview($answers, $userdata, $doc_name, $ankidPost, $ipCl, $ankPostedId, $doc_branch){
$host = 'localhost';
$username = 'ayysimtu_feedAdm';
$password = 'BaseAdmBest69';
$dbname = 'ayysimtu_feedback_base';
$port = 3306;
$charset = 'utf8';
$dsn = "mysql:host=$host;dbname=$dbname;port=$port;charset=$charset";
$xpdo = new xPDO($dsn, $username, $password);	
$forAnswersByAid = [];
$forMsgReview = 'Новая анкета.\r\nID записи: '.$ankPostedId.'\r\nIP: '.$ipCl.'\r\n\r\n';
$resultsAns = $xpdo->query("SELECT * FROM `answers`");
while ($r2 = $resultsAns->fetch(PDO::FETCH_ASSOC)) {
	$forAnswersByAid[$r2['aid']] = $r2['value'];	
}
$userAnsByQid = [];
$splitAns = explode(',', $answers);
for ($i=0; $i < count($splitAns);$i++) {
	$rezAn = explode('_', $splitAns[$i]);
	$userAnsByQid[$rezAn[0]] = $rezAn[1];
}
$results = $xpdo->query("SELECT * FROM `controllerF` WHERE ankid_qid LIKE '".$ankidPost."_%' ORDER BY `ankid_qid`");
$firstName = false;
	while ($r = $results->fetch(PDO::FETCH_ASSOC)) {
		if (!$firstName) {
			$forMsgReview .= 'Название: '.$r['ankname'].'\r\nИмя врача: '.$doc_name.'\r\nПодразделение: '.$doc_branch.'\r\n\r\n';
			$firstName = true;
		}
		$qidFrom = explode('_', $r['ankid_qid']);
		$forMsgReview .= $r['value'].' - '.$forAnswersByAid[$userAnsByQid[$qidFrom[1]]].'\r\n';
}
$expUD = explode('},{', $userdata);  //objects
for ($i=0; $i < count($expUD);$i++) {
	$expOb = explode("value", $expUD[$i]);
	$expObEnd = explode(':', $expOb[1]);
	$ff = explode('"`', $expObEnd[1]);  //  delete end of string obj.
	$ff = explode('`"', $ff[1]);  //  delete end of string obj.
	if ($i == 0) {
	$user_name = $ff[0];
	}
	else if ($i == 1) {
	$user_date = $ff[0];
	}
	else if ($i == 2) {
	$ff = explode('}', $ff[0]);  //  delete end of string obj.
	$user_msg = $ff[0];
	}
}
$forMsgReview .= '\r\nДанные пользователя: \r\n'.
'Имя Ребенка: '.$user_name.'\r\nДата рождения Ребенка: '.$user_date.'\r\nСообщение: '.$user_msg.'\r\n';
$to  = "gggrow69@gmail.com" ;
//$to .= ",gordeeva.dp29@yandex.ru,proff812@inbox.ru";
  mail($to,"Новый опрос #$ankPostedId", str_replace('\r\n',"\r\n",$forMsgReview));
}

?>
