<?php include('header.php') ?>

<div class="banner contact-banner">
	<div class="wrapper">
		<div class="row">
			<div class="col-sm-offset-1 col-sm-4 ">
                <?php include('img/enveloppe.svg') ?>
            </div>
			<div class="col-sm-6">
				<div class="contact-us">
					<p>Utilisez le formulaire ci-dessous, ou contactez-nous en utilisant :</p>
					<div class="details">
						<p><span>T</span> (+41) 079 123 56 76</p>
						<p><span>E</span> contact@bsfwire.ch</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<section class="contact-form">
	<div class="wrapper">
	<form id="contactus" action="mail.php" method="POST">
			<div class="row">
				<div class="col-sm-offset-1 col-sm-5">
					<input type="text" name="name" placeholder="Votre nom ou société">
				</div>
				<div class="col-sm-5">
					<input type="text" name="email" placeholder="Votre email">
				</div>
			</div>

			<div class="row">
				<div class="col-sm-offset-1 col-sm-10">
					<textarea name="message" placeholder="Votre message"></textarea>
				</div>
			</div>
			<div class="row">
				<div class=".infobox col-sm-offset-1 col-sm-7">
					<div id="message"></div>
				</div>
				<div class="col-sm-3">
					<input type="submit" value="SEND">
				</div>

			</div>

			<div class="clear"></div>
			
		</form>
	</div>
</section>


<?php include('footer.php') ?>