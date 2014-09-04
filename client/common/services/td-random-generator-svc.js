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
 * @tdRandomGeneratorSvc Service
 * This service generate the random values for a trade
 *
 * @Methods Available:
 * - sideGenerator
 * - quantityGenerator
 * - limitPriceGenerator
 * - symbolGenerator
 * - traderIdGenerator
 *
 * @authors
 * Sravan Kumar Rekandar
 */

'use strict';
angular.module('traderApp.services')
	.factory('tdRandomGeneratorSvc', ['_', 'tdRepositorySvc', function(_, RepositorySvc){
		var ins = null;
        this.refreshInstruments = function(instruments){
            if(instruments){
                ins = instruments;
            } else {
                RepositorySvc.getInstruments().then(function(instruments){
                    ins = instruments;
                });
            }
        };
        this.refreshInstruments(); // By default, we don't have any existing instruments, so not passing anything
		this.sideGenerator = function(){
			var random = Math.random(),
                side;
			if(random >= 0 && random <= 0.5){
				side= 'Buy';
			}
			else{
				side = 'Sell';
			}
			return side;
		};

		this.quantityGenerator = function(){
			var random = Math.random(),
                quantity = Math.floor(random*100);;

			if (quantity === 0) {
				quantity = 1;
			}
			return quantity;
		};

		this.limitPriceGenerator = function(){
			var random = Math.random(),
                limitPrice = Math.floor(random*1000);
			return limitPrice;
		};

		this.symbolGenerator = function (){
			var symbolArray = ins,
				len,
				random,
				index;

			len = symbolArray.length;
			random = Math.random();
			index = Math.round(random*(len-1));
			return symbolArray[index]['symbol'];
		};

		this.traderIdGenerator = function () {
            var traderId,
                currentUser = RepositorySvc.getLoggedInUser();

			if(currentUser=== null){
                traderId = '-'
            } else{
                traderId = currentUser['id'];
            }
			return traderId;
		};
		return this;
	}])
;