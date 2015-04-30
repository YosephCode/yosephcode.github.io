/* Modulo app */
var app = angular.module('register', []);

/*--------------------------------------------------------------------------
	Controller CarsController 
	descrição: Contém as funções realizadas na tabela que lista os carros, 
	são elas Editar e Remover 
----------------------------------------------------------------------------*/
app.controller('CarsController', ['$scope','$http', function($scope, $http){
	
	/*-------------------------------------------------------
		$http.Get
		descrição: Pega os dados do json e insere no escopo
	---------------------------------------------------------*/
	$http.get('js/config/cars.json').success(function(data){
		$scope.cars = angular.fromJson(data.cars);	
		var crud = "read";
		$scope.$broadcast('LAST_IMAGE_CAR_ADD', crud);	
	});

	/*---------------------------------------------
		function: removeCar(index)
		descrição: Remove o carro da lista/tabela
	-----------------------------------------------*/
	$scope.removeCar = function(index){
  		$scope.cars.splice(index, 1);
	}
	
	/*----------------------------------------------------------
		function: updateDataCar(index)
		descrição: Mostra os dados do carro e permite alteração 
	------------------------------------------------------------*/
	$scope.updateDataCar = function(car){
		$scope.$broadcast('CAR_READY', $scope.cars[car]);
	}

	
	/*--------------------------------------------------------------------------
		evento: LAST_IMAGE_CAR_ADD
		descrição: Verifica se o carro adicionado/atualizado/lido tem imagem, 
		se não adiciona imagem da marca do carro ou da empresa
	---------------------------------------------------------------------------*/	
	$scope.$on('LAST_IMAGE_CAR_ADD', function (event, value, newValue) {
        
        if(value === "read") {
        	
        	angular.forEach($scope.cars, function(obj) {
			    if(obj.imagem == null || obj.imagem == undefined || obj.imagem == "")   {
			    	switch (obj.marca) {
					    case 'Volkswagem':
					    	obj.imagem = "http://www.eventimare.it/wp-content/uploads/2014/11/volkswagen.png";
					    	break;	
					    case 'Fiat':
					    	obj.imagem = "http://www.vectorsland.com/imgd/l2246-fiat-logo-79818.png";
					    	break;
					    default: 
					    	obj.imagem = "https://contaazul.com/img/fb_thumb3.jpg"; 
					}
			    }
		    });

        }else if(value === "addCar") {
        	
        	if($scope.cars[$scope.cars.length-1].imagem == null || $scope.cars[$scope.cars.length-1].imagem == undefined || $scope.cars[$scope.cars.length-1].imagem == ""){
				switch ($scope.cars[$scope.cars.length-1].marca) {
				    case 'Volkswagem':
				    	$scope.cars[$scope.cars.length-1].imagem = "http://www.eventimare.it/wp-content/uploads/2014/11/volkswagen.png";
				    	break;	
				    case 'Fiat':
				    	$scope.cars[$scope.cars.length-1].imagem = "http://www.vectorsland.com/imgd/l2246-fiat-logo-79818.png";
				    	break;
				    default: 
				    	$scope.cars[$scope.cars.length-1].imagem = "https://contaazul.com/img/fb_thumb3.jpg"; 
				}

				
			}

        }else if(value === "update"){
        	
        	if(newValue.imagem == null || newValue.imagem == undefined || newValue.imagem == ""){
				switch (newValue.marca) {
				    case 'Volkswagem':
				    	newValue.imagem = "http://www.eventimare.it/wp-content/uploads/2014/11/volkswagen.png";
				    	break;	
				    case 'Fiat':
				    	newValue.imagem = "http://www.vectorsland.com/imgd/l2246-fiat-logo-79818.png";
				    	break;
				    default: 
				    	newValue.imagem = "https://contaazul.com/img/fb_thumb3.jpg"; 
				}
			}
        }
    });


}]);