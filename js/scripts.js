$(function() {

	function slidersize(){
		var $ace = $('#ace');
		var aceheight = $ace.height();
		var acewidth = $ace.width();
		$('.slider ul li').css({'height' : aceheight});
		$('.slider ul div').each(function(){
			 $this = $(this);
		 	 $div_height =  $this.height();
		 	 $doublepadding = aceheight - $div_height - 26;
		 	 $padding = $doublepadding * 0.5;
		 	 $this.parent().css({'padding-top' : $padding, 'padding-bottom' : $padding  });
		})
	}
	slidersize();
	$(window).on('resize', function(){
		slidersize();
	})



	function slidersize2(){
		var $ace = $('#computer');
		var aceheight = $ace.height();
		var acewidth = $ace.width();
		$('.slider ul li').css({'height' : aceheight});
		$('.slider ul div').each(function(){
			 $this = $(this);
		 	 $div_height =  $this.height();
		 	 $doublepadding = aceheight - $div_height - 26;
		 	 $padding = $doublepadding * 0.5;
		 	 $this.parent().css({'padding-top' : $padding, 'padding-bottom' : $padding  });
		})
	}
	slidersize2();
	$(window).on('resize', function(){
		slidersize2();
	})



	$('.slider').unslider({
		speed: 500,               //  The speed to animate each slide (in milliseconds)
		delay: 3000,              //  The delay between slide animations (in milliseconds)
		keys: true,               //  Enable keyboard (left, right) arrow shortcuts
		dots: true,               //  Display dot navigation
		fluid: true,              //  Support responsive design. May break non-responsive designs
		complete: function() {}  //  A function that gets called after every slide animation
	});

	function approche_box_size(){
		var approche1_height = $('#approche-1').height();
		var approche2_height = $('#approche-2').height();
		var approche3_height = $('#approche-3').height();
		var approche4_height = $('#approche-4').height();
		var approche5_height = $('#approche-5').height();

		var double_padding_1 = approche3_height + approche4_height + 180 - approche1_height;
		var padding_1 = double_padding_1 * 0.5;
		console.log(approche2_height);
		console.log(approche5_height);
		$('#approche-1').css({'padding-top' : padding_1, 'padding-bottom' : padding_1 });

		if (approche2_height > approche5_height) {
			double_padding_5 = 80 + approche2_height - approche5_height;
			padding_5 = double_padding_5 * 0.5 ;
			$('#approche-5').css({'padding-top' : padding_5, 'padding-bottom' : padding_5})
		} else {
			double_padding_2 = 80 + approche5_height - approche2_height;
			padding_2 = double_padding_2 * 0.5 ;
			$('#approche-2').css({'padding-top' : padding_2, 'padding-bottom' : padding_2})
		}
	}
	approche_box_size();
	$(window).on('resize', function(){
		approche_box_size();
	})


	function gearheight(){
		var gearheight = $('#gears').height() * 0.7;
		$('.travail-banner').css({'height' : gearheight })
		var function_form_height = $('.function_form').height();
		var function_form_padding_top = (gearheight - function_form_height) *0.3;
		var function_form_padding_bottom = (gearheight - function_form_height) *0.7;
		$('.function_form').css({'padding-top' : function_form_padding_top, 'padding-bottom' : function_form_padding_bottom})
	}
	gearheight();
	$(window).on('resize', function(){
		gearheight();
	})


//Email redirect

$('#contactus').on('submit' ,  function(e){
	e.preventDefault();
	var $data = $(this).serializeArray();

	$name = $data[0].value;
	$email = $data[1].value;
	$message = $data[2].value;

	$error = '';

	if ($name == ''){
		$error += 'Name is blank. ';
	}
	if ($email == ''){
		$error += 'Email is blank. ';
	} else if ($email.indexOf("@") == -1){
		$error += 'Email is invalid. ';
	}
	if ($message == ''){
		$error += 'Message is blank. ';
	}

	if ($error != '') {
		$('#message').html($error).addClass('warning').removeClass('success').fadeIn();
		setTimeout(function(){ $('#message').fadeOut(); }, 5000);
		

	}else {

		// if name and email and message are not blank send mail

		$.ajax({
			url : 'mail.php',
			method : 'POST',
			data : $data,
			success: function(data){
				console.log(data);
				$('#message').html('Message was sent').addClass('success').removeClass('warning').fadeIn();
				setTimeout(function(){ $('#message').fadeOut(); }, 5000);

			},
			error: function(data){
				console.log(data);
				$('#message').html('Message was not sent').removeClass('success').addClass('warning').fadeIn();
				setTimeout(function(){ $('#message').fadeOut(); }, 5000);
			}
		})

	}

	
	





} )
	
	
	
	


});