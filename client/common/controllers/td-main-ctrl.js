/**
 * Copyright 2014 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @MainCtrl controller
 * This is the parent controller of all other controllers in the application
 * This controller holds the data of loggedIn user and shares across the child controllers.
 *
 * @authors
 * Sravan Kumar Rekandar
 */

/*global
 window, angular
 */
'use strict';
angular.module('traderApp.controllers')
	.controller('MainCtrl', ['$scope', '$location', 'storage', 'tdRepositorySvc', function($scope, $location, localStorage, RepositorySvc){
		$scope.init = function(){
            // Binding the loggedInUser to the local storage | using ['angularLocalStorage']
            localStorage.bind($scope,'loggedInUser',{defaultValue: null ,storeName: 'traderdesktop'});

            if($scope.loggedInUser === 'null' || !$scope.loggedInUser){
                $scope.loggedInUser = undefined;
                $location.path('/home'); // Redirecting to the Home page
            } else {
                RepositorySvc.setLoggedInUser($scope.loggedInUser); // RepositorySvc will use this information when it generates the trades
                $location.path('/orders');
            }
		};
		$scope.login = function(user){
			if(!user){
				alert('Please select a user');
				return;
			}
			$scope.loggedInUser = user;
            RepositorySvc.setLoggedInUser($scope.loggedInUser); // RepositorySvc will use this information when it generates the trades
			$location.path('/orders');
		};
        $scope.logout = function(){
            $scope.loggedInUser = null;
            RepositorySvc.setLoggedInUser(null);
            $location.path('/home'); // Redirecting to the Home page
        };
	}])
;