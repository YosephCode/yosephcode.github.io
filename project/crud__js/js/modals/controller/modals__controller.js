/*------------------------------------------------------------------------------------------
	Controller ModalController
	descrição: contém as ações realizadas dentro das modals, são elas cadastrar e atualizar
--------------------------------------------------------------------------------------------*/
app.controller('ModalController', function ($scope) {

	/* Esconde a modal */
    $scope.showModal = false;
    

    /*---------------------------------------------------------- 
    	function: toggleModal()
    	descrição: Chama a modal (cadastrar/atualizar) 
    ------------------------------------------------------------*/
    $scope.toggleModal = function() {
		$scope.showModal = !$scope.showModal;
    };

    /*---------------------------------------------------------- 
    	function: setState(name)
    	descrição: Seta o estado da modal (cadastrar/atualizar) 
    ------------------------------------------------------------*/
    $scope.setState = function(name) {
    	$scope.template = 'js/modals/templates/modal-'+ name +'.html';
	}

    /*---------------------------------------------------------- 
    	function: addCar(car)
    	descrição: adiciona o carro na lista/tabela pela modal,
    	verifica imagem e zera dados escritos no form 
    ------------------------------------------------------------*/
	$scope.addCar = function(car) {
		$scope.car = angular.copy(car);
		$scope.$parent.cars.push($scope.car);
		
		$scope.showModal = false;
		
		var crud = "addCar";
		$scope.$emit('LAST_IMAGE_CAR_ADD', crud);	
		
		/* Zera o form de cadastro */
		$( '#newsletterform' ).each(function(){
		    this.reset();
		});
	}


    /*---------------------------------------------------------- 
    	evento: CAR_READY
    	descrição: adiciona o carro na lista/tabela pela modal,
    	verifica imagem e zera dados escritos no form 
    ------------------------------------------------------------*/
	$scope.$on('CAR_READY', function (event, car) {
        $scope.updateCar = car;
        $scope.setState('editar'); 
    });


    /*---------------------------------------------------------- 
    	function: updateImg(car)
    	descrição: verifica a imagem do carro e fecha a modal
    ------------------------------------------------------------*/

	$scope.updateImg = function(car){
		var crud = "update";
		$scope.$emit('LAST_IMAGE_CAR_ADD', crud, car);	
        
		$scope.showModal = false;
	}
});