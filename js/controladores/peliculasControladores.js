/*Definimos el objeto Ctrl que concentra todos los controladores con el patrón Modulo*/
var Ctrl = (function(){

/*Definimos el esqueleto de definición de los controladores creados en app.js*/
	var _todasLasPeliculasCtrl = function($scope,$rootScope,$http,$log,$window){	
		/*$rootScope nos permite crear una variable global para page, con el objetivo de que el resto de controladores tengan acceso*/
		$rootScope.page = 1
		/*El controlador recoge los fatos con una llamada AJAX a través del servicion $http*/
		$http.get('http://api.themoviedb.org/3/discover/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&language=es')
			/*Con los datos recibidos de la api se inicializa la variable peliculas del modelo*/
			.success(function(peliculas){
				/*Utilizamos $scope para conectar la variable con la vista
				Permite que los datos manejados en los controladores pasen a las vistas y viceversa. 
				Para que desde las vista puedan usarse estas variables se situan dentro del mustache
				*/
				$scope.peliculas = peliculas.results;
			})
			.error(function(err){
				$log.log("Fallo en la peticion AJAX " + err.code + "-" + err.message)
				$window.alert("Fallo en la peticion AJAX " + err.code + "-" + err.message)
			});

	};
	var _pageCtrl = function($scope, $rootScope,$http,$log,$routeParams,$window){
		/*En el $routeParams le metemos el valor de la variable que hemos asignado en app.js*/
		$http.get('http://api.themoviedb.org/3/discover/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&page='+ $routeParams.page + '&language=es')
			.success(function(peliculas){
				$scope.page = Number($routeParams.page)
				$scope.peliculas = peliculas.results;
			})
			
			.error(function(err){
				$log.log("Fallo en la peticion AJAX " + err.code + "-" + err.message)
				$window.alert("Fallo en la peticion AJAX " + err.code + "-" + err.message)
			});
			/*Establecemos los criterios con los que vamos a ordenar las tablas de las vistas genres_ids y buscar*/
			$scope.criterio = {}
			$scope.criterio.columna = 'title'
			$scope.criterio.sentido = false
		}
		
	var _titleCtrl = function($scope,$routeParams,$http,$log,$window){
			
		$http.get('http://api.themoviedb.org/3/movie/' + $routeParams.title + '?api_key=4584ae721cb020ce65a4bd25368ec31e&language=es')
			
			.success(function(pelicula){
				pelicula.poster_path = 'http://image.tmdb.org/t/p/w185' + pelicula.poster_path; 
				$scope.pelicula = pelicula;
			})

			.success(function(pelicula){ 
				$scope.pelicula = pelicula;
			})
			
			.error(function(err){
				$log.log("Fallo en la peticion AJAX " + err.code + "-" + err.message)
				$window.alert("Fallo en la peticion AJAX " + err.code + "-" + err.message)
			});

	};

	var _genre_idsCtrl = function($scope,$routeParams,$http,$log,$window){
			
		$http.get('http://api.themoviedb.org/3/discover/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&with_genres=' + $routeParams.genre_ids +'&language=es') 
			
			.success(function(peliculas){ 
				$scope.peliculas = peliculas.results;
				$scope.totalPages = peliculas.total_pages;
				$scope.page = peliculas.page;
				$scope.gen = $routeParams.genre_ids;

			})
			
			.error(function(err){
				$log.log("Fallo en la peticion AJAX " + err.code + "-" + err.message)
				$window.alert("Fallo en la peticion AJAX " + err.code + "-" + err.message)
			});

	};

	var _barraNavegacionCtrl = function($scope){

			/*Utilizamos angular.element para poder hacer uso de jquery desde el controlador*/
				angular.element("header > div > div > ul > li").on('mouseover',function(){
					angular.element(this).addClass("grande")
				})
				angular.element("header > div > div > ul > li").on('mouseleave',function(){
					angular.element(this).removeClass("grande")
				})
			}

	var _homeCtrl = function($scope){
		/*Capturo este evento cuando se termina de renderizar la pagina y despues se captura el evento ended del video*/
		$scope.$on('$viewContentLoaded', function(){
			var video = document.getElementById("video")
    		video.addEventListener('ended', function () {
    		/*abre la ruta en la misma pantalla que estamos visualizando*/	
			window.location.hash = '#/genres';			
			})
  		});
	}

	var _buscarCtrl = function($scope,$http,$routeParams,$rootScope){
		/*creamos la función asignada al botón buscar*/
		$scope.buscarPelis = function(t){
			$rootScope.page = 1;
			$rootScope.tit = t;
			window.location.hash = '#/buscador/' + t
		
		}
		/*habilitamos que con el botón enter se pueda realizar la búsqueda*/
		$scope.buscarEnter = function(tecla,t) {

 			if (tecla.which === 13){
 				$rootScope.page = 1;
				$rootScope.tit = t;
    			window.location.hash = '#/buscador/' + t;
    	}
	}
}

	var _buscarPeliCtrl = function($scope,$http,$routeParams,$log,$rootScope){
	$http.get('http://api.themoviedb.org/3/search/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&query=' + $routeParams.titulo + '&language=es') 
			
			.success(function(peliculas){ 
				$scope.page = $rootScope.page
				$scope.peliculas = peliculas.results;
				$scope.totalPages = peliculas.total_pages;

			})
			
			.error(function(err){
				$log.log("Fallo en la peticion AJAX " + err.code + "-" + err.message)
				$window.alert("Fallo en la peticion AJAX " + err.code + "-" + err.message)
			});
		}
	var _bpageCtrl = function($scope, $rootScope,$http,$log,$routeParams,$window){
	
		$http.get('http://api.themoviedb.org/3/search/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&query=' + $routeParams.titulo + '&page=' + $routeParams.id + '&language=es')
			.success(function(peliculas){
				$scope.page = Number($routeParams.id)
				$scope.tit = $rootScope.tit;
				$scope.peliculas = peliculas.results;
				$scope.totalPages = peliculas.total_pages;
			})
			
			.error(function(err){
				$log.log("Fallo en la peticion AJAX " + err.code + "-" + err.message)
				$window.alert("Fallo en la peticion AJAX " + err.code + "-" + err.message)
			});
		}

	var _gpageCtrl = function($scope, $rootScope,$http,$log,$routeParams,$window){
		
		$http.get('http://api.themoviedb.org/3/discover/movie?api_key=4584ae721cb020ce65a4bd25368ec31e&with_genres=' + $routeParams.genre_ids + '&page=' + $routeParams.id + '&language=es')
			.success(function(peliculas){
				$scope.page = Number($routeParams.id)
				$scope.gen = $routeParams.genre_ids;
				$scope.totalPages = peliculas.total_pages;
				$scope.peliculas = peliculas.results;
			})
			
			.error(function(err){
				$log.log("Fallo en la peticion AJAX " + err.code + "-" + err.message)
				$window.alert("Fallo en la peticion AJAX " + err.code + "-" + err.message)
			});
		}
	
	return {
		todasLasPeliculasCtrl: _todasLasPeliculasCtrl,
		pageCtrl: _pageCtrl,
		titleCtrl: _titleCtrl,
		genre_idsCtrl: _genre_idsCtrl,
		barraNavegacionCtrl: _barraNavegacionCtrl,
		homeCtrl: _homeCtrl,
		buscarCtrl: _buscarCtrl,
		buscarPeliCtrl: _buscarPeliCtrl,
		bpageCtrl: _bpageCtrl,
		gpageCtrl: _gpageCtrl
	}
})()