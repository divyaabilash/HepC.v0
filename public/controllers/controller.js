var mainApp = angular.module("mainApp", ['ngRoute']);
 
mainApp.config(function($routeProvider) {
    $routeProvider
        .when('/signIn', {
            templateUrl: 'AdminLogin.html',
            controller: 'AdminController'
        })		
	    .when('/home',{
			templateUrl : 'RegisterAdminOrPatient.html',
			controller: 'AdminPatientRegContrller'
		})
		.when('/patientRegister',{
			templateUrl : 'PatientRegistration.html',
			controller: 'PatientController'
		})
		.when('/doctorRegister',{
			templateUrl : 'DoctorRegistration.html',
			controller : 'DoctorController'
		})
		.when('/adminRegister',{
			templateUrl: 'AdminRegistration.html',
			controller: 'AdminRegController'
		})
		.when('/viewExistingPatients',{
			templateUrl : 'ViewPatients.html',
			controller : 'ViewPatientsController'
		})
		.when('/viewExistingAdmins',{
			templateUrl : 'ViewAdmin.html',
			controller : 'ViewAdminController'
		})
		.when('/viewExistingDoctors',{
			templateUrl : 'ViewDoctors.html',
			controller : 'ViewDoctorsController'
		})
		.when('/bookGroupAppointment',{
			templateUrl : 'BookGroupAppointment.html',
			controller : 'BookGrpAppntController'
		})
        .otherwise({
            redirectTo: '/signIn'
        });
});

mainApp.controller('AdminController',function($scope,$http,$location){
	
	console.log("Hello World from Controller");

	$scope.onSignIn = function(fName){
		console.log("name-->"+fName);
		$http.get('/adminReg/'+fName).then(function(response){
			console.log(response);
			var dataLength = response.data.length;

			if(dataLength>0){
				console.log("Valid User");
				$scope.message = "Valid User Id";
				$location.path('/home');
			}else{
					console.log("Invalid User");
					$scope.message = "Invalid User Id. Do you want to register?";	
			}			

		},function(response){
			$scope.message = "Error occurred";
		});
	};

	$scope.register = function(){
		console.log("Inside register() function");
		$location.path('/adminRegister');
	}

});

mainApp.controller('AdminRegController', function($scope, $http){
		
		$scope.onSubmit = function(){
			console.log("Entered on submit ");
			console.log($scope.admin);
			$http.post('/adminReg', $scope.admin).then(function(response){
					$scope.message = "Registered Successfully";
			},function(response){
				$scope.message = "An Error occurred";
			}); 
		};

		$scope.checkNameInDb = function(fName){
			console.log("name-->"+fName);
			$http.get('/adminReg/'+fName).then(function(response){
				console.log(response);
				var dataLength = response.data.length;
				
				if(dataLength>0){
					console.log("response: "+$scope.adminName);
					$scope.userExists = "User already exists";
					$scope.admin.fName = '';
					document.getElementById('firstName').focus();
					return false;
				}else{
					console.log("No value");
					$scope.userExists = "";
					
				}
			},function(response){
				console.log("Error");
				$scope.userExists = "Error occurred";
			});
		};
		
});

mainApp.controller('AdminPatientRegContrller',function($scope,$http,$location){

		$scope.registerNewAdmin = function(){
			console.log("Entered New Admin Reg function ");
			$location.path('/adminRegister');
		};
		$scope.registerNewPatient = function(){
			console.log("Entered New Patient Reg function ");
			$location.path('/patientRegister');
		};
		$scope.registerNewDoctor = function(){
			console.log("Entered New Doctor Reg function ");
			$location.path('/doctorRegister');
		};
		$scope.bookGroupAppointment = function(){
			console.log("Entered Group booking Appointment");
			$location.path('/bookGroupAppointment');
		};
		$scope.viewExistingPatients = function(){
			console.log("Entered View Existing Patients");
			$location.path('/viewExistingPatients');
		};
		$scope.viewExistingAdmins = function(){
			console.log("Entered View Existing Admins");
			$location.path('/viewExistingAdmins');
		};
		$scope.viewExistingDoctors = function(){
			console.log("Entered View Existing Doctors");
			$location.path('/viewExistingDoctors');
		};
});

mainApp.controller('PatientController', function mySuccess($scope, $http){
			
			$scope.onSubmit = function(){
				console.log('Entered Patient submit');
				console.log($scope.patient);
				$http.post('/patientReg',$scope.patient).then(function(req, res){
					$scope.message = "Registered patient successfully";
				},function(response){
					$scope.message = "An error occurred during insertion";
				});
			};

			$scope.checkPatientNameInDb = function(fName){
				console.log('Entered check Patient function');
				$http.get('/checkPatient/'+fName).then(function(response){
					console.log(response);
					var dataLength = response.data.length;
					if(dataLength>0){
						$scope.message = "Patient already exists";
					}
				},function(response){
						$scope.message = "";
				});
			};		
});

mainApp.controller('DoctorController', function($scope, $http){
			
			$scope.onSubmit = function(){
				console.log('Entered on Submit function');
				console.log($scope.doctor);
				$http.post('/doctorReg', $scope.doctor).then(function(req,res){
					$scope.message = "Registered Doctor Successfully";
				},function(response){
					$scope.message = "An error occurred during Doctor insertion.";
				});
			};

			$scope.checkNameInDb = function(fName){
				console.log("Entered check Name in DB func.");
				console.log($scope.doctor);
				$http.get('/doctorDetails/'+fName).then(function(response){
					var dataLength = response.data.length;
					if(dataLength>0){
						$scope.message = "This doctor Name already exists";
						$scope.doctor.fName = '';
						document.getElementById('firstName').focus();
						return;
					}					
				}, function(response){
					    $scope.message = "";
				});
			};
});

mainApp.controller('BookGrpAppntController',function mySuccess($scope,$http){
				console.log('Entered BookGrpAppntController');
});

mainApp.controller('ViewPatientsController', function mySuccess($scope, $http){
			
				console.log('Entered ViewPatientsController');
				$http.get('/patientView').then(function(response){
					console.log("aaa-->"+response.data.length);
					$scope.patientList = response.data;
				},function(response){
					console.log("Error occurred");
				});

			$scope.deletePatient = function(fName){
				console.log('Entered delete patient');
				$http.delete('/deletePatient/'+fName).then(function(response){
					console.log(response);
				});
			};

			$scope.editPatient = function(patient){
				console.log("patient: "+patient);
				$scope.patient = patient;
			};

			$scope.onSubmit = function(fName){
				$http.put('/updatePatient/'+$scope.patient._id, $scope.patient).then(function(response){
					console.log(response);
				});
				
			};
			
});


mainApp.controller('ViewAdminController',function mySuccess($scope, $http){
		console.log("Entered View Admin Controller");
		$http.get('/adminView').then(function(response){
			console.log("data-->"+response.data.length);
			$scope.adminList = response.data;
		}, function(response){
			console.log("Error occurred fetching admin details");
		});

		$scope.onDelete = function(fName){
			console.log("Entered on Edit function");
			console.log("name: "+fName);
			$http.delete('/deleteAdmin/'+fName).then(function(response){
				console.log("Deleted data: "+response.data);
			});
		};
});

mainApp.controller('ViewDoctorsController', function mySuccess($scope, $http){
		console.log("Entered ViewDoctorsController");
		$http.get('/viewDoctor').then(function(response){
			console.log("data-->"+response.data.length);
			$scope.doctorList = response.data;
		});

		$scope.onDelete = function(fName){
			console.log("entered function onDelete");
			console.log("name: "+fName);
			$http.delete('/deleteDoctor/'+fName).then(function(response){
				console.log("data-->"+response.data);
			});
		};

});


