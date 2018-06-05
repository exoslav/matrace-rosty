export default `
  <div class="modal__header">
  	<button class="modal__close-button modal__close" type="button">Close</button>
  	<div class="modal__title">Přihlášení</div>
  </div>
  <div class="modal__body">
  	<form class="modal-login-form">
	  	<div class="general-form__field general-form__field--wide">
	  		<label for="login-form-modal-email">E-mail:</label>
	  		<input id="login-form-modal-email" type="email" />
	  	</div>
	  	<div class="general-form__field general-form__field--wide">
	  		<label for="login-form-modal-password">Heslo:</label>
	  		<input id="login-form-modal-password" type="email" />
	  	</div>

	  	<div class="modal-login-form__footer">
		  	<a class="modal-login-form__forgotten-password" href="#">Zapomenuté heslo</a>
		  	<button class="modal-login-form__submit" type="submit">Přihlásit se</button>
		  	<p class="modal-login-form__sign-up">Chcete také svůj účet? <span>Neváhejte a <a href="">zaregistrujte se.</span></a></p>
	  	</div>
  	</form>
  </div>
`;