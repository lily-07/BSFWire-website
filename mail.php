<?php 

if (isset ($_POST['name']  )) {

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$formcontent="From: $name \nMessage: $message";
	$recipient = "rissel.melissa@gmail.com";
	$subject = "BSF Wire Inquiry";
	$mailheader = "From: $email \r\n";
	if (mail($recipient, $subject, $formcontent, $mailheader)){
		// if success
		echo "Thank You!";
	} else {
		// if mail not success
		echo 'Mail not sent';
		http_response_code(301);
	};

	
	

} else {
	// if data not posted
	echo 'Sorry, no data was sent';
	http_response_code(301);
}


?>