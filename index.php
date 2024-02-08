<?php


header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');

// Additional headers which may be sent along with the CORS request
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');

// Set the age to 1 day to improve speed/caching.
header('Access-Control-Max-Age: 86400');



$zip = new ZipArchive();
$filename = "./121231241244124.zip";

if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
    exit("Невозможно открыть <$filename>\n");
}

$text = json_decode(file_get_contents('php://input'), true);
/* $text = json_decode($_POST['text']); */
/* for ($i = 0; $i < 10; $i++) {
    $image = imagecreatefrompng('image.png');

    $background_color = imagecolorallocate($image, 0, 153, 0);

    $text_color = imagecolorallocate($image, 255, 0, 255);

    $font = 'roboto.ttf';
    imagettftext($image, 20, 0, 20, 190, $text_color, $font, "Geeks for geeks {$i}");
    
    imagepng($image, "images/newImage{$i}.png");
    $zip->addFile("images/newImage{$i}.png", "newImage{$i}.png");
    imagedestroy($image);
} */


/* for ($i = 0; $i < 10; $i++) {
    $image = imagecreatefrompng('image.png');

    $background_color = imagecolorallocate($image, 0, 153, 0);

    $text_color = imagecolorallocate($image, 255, 0, 255);

    $font = 'roboto.ttf';
    imagettftext($image, 20, 0, 20, 190, $text_color, $font, "Geeks for geeks {$i}");
    
    imagepng($image, "images/newImage{$i}.png");
    $zip->addFile("images/newImage{$i}.png", "newImage{$i}.png");
    imagedestroy($image);
} */

$font = 'roboto.ttf';
$font_black = 'roboto-black.ttf';

$i = 0;

foreach ($text['names'] as $value) {
    $image = imagecreatefrompng('image.png');

    $text_color = imagecolorallocate($image, 43, 43, 43);
    $second_text_color = imagecolorallocate($image, 147, 142, 198);
    
    imagettftext($image, 40, 0, 130, 255, $text_color, $font_black, $value);
    imagettftext($image, 40, 0, 700, 255, $text_color, $font_black, $text['group']);    

    imagettftext($image, 30, 0, 730, 374, $second_text_color, $font_black, $text['date_day']);
    imagettftext($image, 30, 0, 790, 374, $second_text_color, $font, $text['date_month']);
    imagettftext($image, 30, 0, 975, 374, $second_text_color, $font_black, "2024");

    imagettftext($image, 30, 0, 1090, 374, $second_text_color, $font_black, $text['time_hour']);
    imagettftext($image, 30, 0, 1134, 374, $second_text_color, $font, ":");
    imagettftext($image, 30, 0, 1145, 374, $second_text_color, $font_black, $text['time_minutes']);

    
    $i++;

    imagepng($image, "images/{$i}{$value}.png");
    $zip->addFile("images/{$i}{$value}.png", "{$i}{$value}.png");
    imagedestroy($image);
}


$zip->close();
$filesize = filesize($filename);
header('Content-Type: application/json');
    
/* header('Content-Disposition: attachment;filename="some-filename.zip"'); */
header("Content-Transfer-Encoding: Binary");
header('Pragma: no-cache');
header('Expires: 0');   
header('Content-Length: ' . $filesize);

$i = 0;

foreach($text['names'] as $value) {
    $i++;
    unlink("images/{$i}{$value}.png");
}



$file = file_get_contents($filename);

unlink($filename);

echo $file;


/*  $base64 = base64_encode($file);
 echo json_encode($file); */
/*  exit(); */
/*  return readfile($filename);  */

