<?php
/*  for javascriptCourse => questions */
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:1337');
header('Access-Control-Allow-Credentials: true');   

$objects = [
    [
      'type' => 'genre',
      'genre' => 'shanson',
      'answers' => [
	  [
		'src' => 'https://dp29.spb.ru/jsFor/4k%20-%20%D0%A7%D1%91%D1%80%D0%BD%D1%8B%D0%B9%20%D0%BC%D0%B0%D1%82%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%BF%D0%BE%D0%B4%D0%B0%D1%80%D0%BE%D0%BA.mp3',
		'genre' => 'shanson',
		],
	  [
		'src' => 'https://dp29.spb.ru/jsFor/%D0%92%D0%B5%D1%81%D0%BE%D0%B2%D1%8B%D0%B5%20-%20%D0%B1%D0%B5%D0%BB%D1%8B%D0%B9%20%D1%81%D0%BD%D0%B5%D0%B3.mp3',
		'genre' => 'rap',
		],
	  [
		'src' => 'https://dp29.spb.ru/jsFor/%D0%9D%D0%B5%D0%B1%D1%80%D0%BE%20-%20%D0%AF%20%D0%A7%D0%B8%D1%82%D0%B0%D1%8E%20%D0%A5%D0%BE%D0%BF%D1%87%D0%B8%D0%BA%20%28Beat%20Police%20prod.%29.mp3',
		'genre' => 'pop',
		],
	  [
		'src' => 'https://dp29.spb.ru/jsFor/%D0%9F%D0%B0%D1%88%D0%B0%20%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%20-%20%D0%9B%D1%8E%D1%82%D1%8B%D0%B5%20%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D0%B8.mp3',
		'genre' => 'rock',
		],
        ]
    ],
        [
      'type' => 'artist',
      'song' => [
				'artist' => 'Gorillaz',
				'src' => 'https://dp29.spb.ru/jsFor/%D0%9D%D0%B5%D0%B1%D1%80%D0%BE%20-%20%D0%AF%20%D0%A7%D0%B8%D1%82%D0%B0%D1%8E%20%D0%A5%D0%BE%D0%BF%D1%87%D0%B8%D0%BA%20%28Beat%20Police%20prod.%29.mp3',
				],
      'answers' => [
      [
        'src' => 'https://Bi2',
        'artist' => 'Bi 2',
      ],
      [
        'src' => 'https://Madonna',
        'artist' => 'Madonna',
      ],
      [
        'src' => 'https://Gorillaz',
        'artist' => 'Gorillaz',
      ],
      // {
      //   src: `https://Shakira`,
      //   artist: `Shakira`,
      // }
        ]
    ],
  ];

  echo json_encode( $objects );

?>