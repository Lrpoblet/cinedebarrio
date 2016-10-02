/*Definimos el modulo de nuestra App (ngRoute)*/
var peliculasModule = angular.module('peliculasApp',['ngRoute']);

/*Creamos la directiva para la barra de navegación*/
peliculasModule.directive ("barraNavegacion", function(){
	return {
		restrict: "E",
		templateUrl: "barraNavegacion.html",
		controller: Ctrl.barraNavegacionCtrl
	}
})

/*Definimos el controlador de la función del botón de búsqueda*/
peliculasModule.controller ("buscarCtrl", Ctrl.buscarCtrl);

/*Configuramos las rutas de la App con el objeto $routeProvider*/
peliculasModule.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	/*Cada ruta tendrá su vista(templateUrl) y su controlador(controller) para la petición ajax
	*/
	when("/todasLasPeliculas",{
		templateUrl: "todasLasPeliculas.html",
		controller: Ctrl.todasLasPeliculasCtrl 
	}).

	when("/genres",{
		templateUrl: "genres.html",
		controller: Ctrl.genresCtrl
	}).

	when("/genre_ids/:genre_ids",{
		templateUrl:"genre_ids.html",
		controller: Ctrl.genre_idsCtrl
	}).

	when("/",{
		templateUrl: "home.html",
		controller: Ctrl.homeCtrl
	}).
	when("/contact",{
		templateUrl: "contact.html",
		controller: Ctrl.contactCtrl
	}).

	when("/title/:title",{
		templateUrl: "title.html",
		controller: Ctrl.titleCtrl
	}).

	when("/page/:page",{
		templateUrl: "todasLasPeliculas.html",
		controller: Ctrl.pageCtrl
	}).
	when("/buscador/:titulo",{
		templateUrl: "buscar.html",
		controller: Ctrl.buscarPeliCtrl
	}).
	when("/bpage/:titulo/:id",{
		templateUrl: "buscar.html",
		controller: Ctrl.bpageCtrl
	}).
	when("/gpage/:genre_ids/:id",{
		templateUrl: "genre_ids.html",
		controller: Ctrl.gpageCtrl
	}).
	otherwise({
		redirectTo: "/"
	})
}]);