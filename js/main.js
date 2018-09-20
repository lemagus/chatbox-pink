$('form.inputs').submit(function(){
	
	var message = $(this).find('input[name=message]').val();
	$('div.messages').append('<div class="me" >' + message +'</div>');
	
	return false;
	
});