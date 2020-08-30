 (function(){
 		//PositionStack API Key
 		var apiKey = "109dd92bc334cb822d66d20befe81ad0";
 		//IpStack API Key
 		var geoKey = "37574f1b789e882985e3012a55ae5987";

 		var location = {
 			Latitude: undefined,
 			Longitude: undefined,
 			Adress: undefined,

	 		find: function(adress) {

	 			location.Adress = adress;

	 			$.ajax({
			 		type: 'GET',
			 		url: 'http://api.positionstack.com/v1/forward?access_key='+apiKey+'&query='+adress,
			 		dataType: 'json'
			 	})
			 	.done(function (data) {
			 		this.Latitude = data.data[0].latitude;
					this.Longitude = data.data[0].longitude;

					$.ajax({
					type: 'GET',
					url : 'http://api.openweathermap.org/data/2.5/weather?lat='+ this.Latitude +'&lon=' + this.Longitude + "&units=metric&appid=9f50a805aa0089a1edd1829a5db029f0",
					dataType: 'json'
					})
					.done(function( data ){
					
					console.log("Success!");

					console.log( data ); // Se imprime en consola la api
					$('#loader').find('img').fadeOut(150);

					html= '<div id="weather" class="border border-primary jumbotron"><h1 class="display-4">'+ location.Adress +' - '+ data.main.feels_like +'Cº <img class="float-right bg-white border border-primary" src="http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png"/></h1><p class="lead">The location got <strong>'+ data.main.humidity +'% of humidity</strong>, a <strong>pressure of '+ data.main.pressure +'</strong> a <strong>max temperature of '+ data.main.temp_max +'Cº</strong> and a <strong> minimun temperature of '+ data.main.temp_min +'Cº</strong> </p><hr class="my-4"><p>You can find a <strong>'+ data.weather[0].description +'</strong> and <strong>the temperature overall feels like '+ data.main.feels_like +'Cº</strong></p><div class="alert alert-primary alert-dismissible fade show" role="alert"><strong>Hey!</strong> one of our ninjas went out to check the weather for you! Many thanks for using us!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>'
					$('#content').append(html);
					})
					.fail(function(){
						console.log("Error!");
					})
					.always(function(){
						console.log("Retrieval complete!");
					});

				 })
			 }
		}

	$('#find').on('click', function() {
		location.find( $('#adress').prop('value') );
		$('#content').find('#weather').remove();
		$('#loader').find('img').fadeIn(150);
	});

	$.ajax({
		type: 'GET',
		url: 'https://api.ipgeolocation.io/getip',
		dataType: 'json'
	})
	.done(function (data) {
		$.ajax({
			type: 'GET',
			url: 'http://api.ipstack.com/' + data.ip + '?access_key=' + geoKey,
			dataType: 'json'
		})
		.done(function (data){
			$('#adress').prop('value',data.city+', '+ data.country_name );
			location.find( $('#adress').prop('value'));
		})
	})

	$('#loader').hide();


})();