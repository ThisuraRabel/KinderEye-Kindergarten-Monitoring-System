
<?php


$folder_path1 = "../images/activities/speaking";

// List of name of files inside
// specified folder
$files = glob($folder_path1.'/*');

// Deleting all the files in the list
foreach($files as $file) {

    if(is_file($file))

        // Delete the given file
        unlink($file);
}


if ($_FILES["image1"]["error"] == UPLOAD_ERR_OK) {
  $tmp_name = $_FILES["image1"]["tmp_name"];
  $name = $_FILES["image1"]["name"];
  $destination = "../images/activities/speaking/" .  "image1.jpg";

  if (move_uploaded_file($tmp_name, $destination)) {
    echo "File 1 uploaded: $name<br>";
  } else {
    echo "Error uploading file 1.<br>";
  }
} else {
  echo "No file 1 uploaded.<br>";
}

if ($_FILES["image2"]["error"] == UPLOAD_ERR_OK) {
  $tmp_name = $_FILES["image2"]["tmp_name"];
  $name = $_FILES["image2"]["name"];
  $destination = "../images/activities/speaking/" . "image2.jpg";

  if (move_uploaded_file($tmp_name, $destination)) {
    echo "File 2 uploaded: $name";
  } else {
    echo "Error uploading file 2.";
  }
} else {
  echo "No file 2 uploaded.";
}

if ($_FILES["image3"]["error"] == UPLOAD_ERR_OK) {
  $tmp_name = $_FILES["image3"]["tmp_name"];
  $name = $_FILES["image3"]["name"];
  $destination = "../images/activities/speaking/" . "image3.jpg";

  if (move_uploaded_file($tmp_name, $destination)) {
    echo "File 3 uploaded: $name";
  } else {
    echo "Error uploading file 3.";
  }
} else {
  echo "No file 3 uploaded.";
}


if ($_FILES["image4"]["error"] == UPLOAD_ERR_OK) {
  $tmp_name = $_FILES["image4"]["tmp_name"];
  $name = $_FILES["image4"]["name"];
  $destination = "../images/activities/speaking/" . "image4.jpg";

  if (move_uploaded_file($tmp_name, $destination)) {
    echo "File 4 uploaded: $name";
  } else {
    echo "Error uploading file 4.";
  }
} else {
  echo "No file 4 uploaded.";
}

if ($_FILES["image5"]["error"] == UPLOAD_ERR_OK) {
  $tmp_name = $_FILES["image5"]["tmp_name"];
  $name = $_FILES["image5"]["name"];
  $destination = "../images/activities/speaking/" . "image5.jpg";

  if (move_uploaded_file($tmp_name, $destination)) {
    echo "File 5 uploaded: $name";
  } else {
    echo "Error uploading file 5.";
  }
} else {
  echo "No file 5 uploaded.";
}


?>
