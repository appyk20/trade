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
 * @tdSocketSvc Service
 * This service binds a scope to the socket events
 *
 * @Usage:
 * tdSocketSvc.on('<EventName>', function(){
 *   // Actions
 * }, $scope);
 *
 * @authors
 * Sravan Kumar Rekandar
 */
'use strict';
angular.module('traderApp.services')
	.factory('tdSocketSvc', ['$rootScope', 'socket', function($rootScope, socket){
		this.on =function(eventName, callback, $scope) {
			socket.on(eventName, function () {  
				var args = arguments;
				var scope = $scope || $rootScope;
				scope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		};

		this.emit = function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		};
		return this;
	}])
;