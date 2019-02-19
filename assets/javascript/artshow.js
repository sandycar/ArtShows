// Variables



// functions
// console.log("hello")

var clientID = '924751e8b551e9ebd791',
  clientSecret = '2c10e18dafc2d9d8f18f57315157e2f6'

var token;
//   apiUrl = 'https://api.artsy.net/api/shows/924751e8b551e9ebd791" -H "X-XAPP-Token:',
//   xappToken;

// $.ajax({
//   url: apiUrl,
//   method: "POST",
//   data: { client_id: clientID, client_secret: clientSecret }
// })
// .then( function(data){
//   xappToken = data.token;
//   console.log(data.token);

//   // string literal `https://api.artsy.net/api/artists/${artist}`
//   // "https://api.artsy.net/api/artists/" + artist
//   $.ajax({
//     url: "https://api.artsy.net/api/shows/current",
//     headers: { "X-Xapp-Token": xappToken }
//   })
//   .then( function(data){
//     console.log(data)
//     console.log(data.name + 'was born in ' + data.birthday + ' in ' + data.hometown);
//   })

// })

// curl -v -X POST "https://api.artsy.net/api/tokens/xapp_token?client_id=...&client_secret=..."
function getToken(){
	$.ajax({
		url:"https://api.artsy.net/api/tokens/xapp_token?client_id="+clientID+"&client_secret="+clientSecret,
		method:"POST"
	})
	.then(function(data){
		console.log(data);
		console.log(data.token)
		token = data.token
	})
}

// curl -v "https://api.artsy.net/api/search?q=Andy+Warhol" -H "X-XAPP-Token:..."


function search(q){
	$.ajax({
		url:"https://api.artsy.net/api/search?q="+q,
		method:"GET",
		headers: { "X-Xapp-Token": token }
	})
	.then(function(response){
		// console.log(response)
		// console.log(response._embedded.results[1])
		var results=response._embedded.results
		// for (var i=0;i<results.length;i++){
		// 	// var element = results[i]
		// 	// console.log(element.type)
		// 	// This is the same ^^ and as the below:
		// 	console.log(results[i].type)
		// }
		// The above is almost the same as the function below:
		var filteredResults = results.filter(function(element){
			if (element.type != "show"){
				return false
			} else{ 
				return true
			}
		})
		console.log(filteredResults)

	})

}


getToken()

$('#searchForm').on('submit', function(){
	event.preventDefault()
	console.log($('#searchForm #userInput').val())
	var keyword = $('#searchForm #userInput').val()
	search(keyword);

})
