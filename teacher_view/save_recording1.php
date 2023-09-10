<?php

$folder_path2 = "../images/activities/listening/1/audio";

$files = glob($folder_path2.'/*');

// Deleting all the files in the list
foreach($files as $file) {

    if(is_file($file))

        // Delete the given file
        unlink($file);
}



if (isset($_FILES['audio'])) {
  $uploadDir = '../images/activities/listening/1/audio/'; // Directory where the file will be saved
  $fileName = 'r1.mp3'; // Name of the file

  $uploadPath = $uploadDir . $fileName;

  // Move the uploaded file to the specified directory
  if (move_uploaded_file($_FILES['audio']['tmp_name'], $uploadPath)) {
    echo "Recording saved successfully!";
  } else {
    echo "Error saving recording.";
  }
}



?>


