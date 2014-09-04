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
 * @OrdersKendoGridCtrl controller
 *
 * @authors
 * Sravan Kumar Rekandar
 */
'use strict';

angular.module('traderApp.controllers')
    .controller('OrdersKendoGridCtrl', ['$scope', '_', 'tdRepositorySvc', 'socket', function($scope, _, RepositorySvc, socket) {
        // Handling socket events
        socket.on('orderCreatedEvent', function(newOrder){
            var order = _.filter($scope.gridData, {id: newOrder.id});
            if(order.length === 0){ // Validating for not to add a duplicate order
                $scope.gridData.push(newOrder);
            }
        });

        socket.on('allOrdersDeletedEvent', function(){
            $scope.gridData.empty();
        });

        socket.on('placementCreatedEvent', function(placement){
            var order = _.filter($scope.gridData, {id: placement.orderId});

            if(order.length === 0) { return; }

            order = order[0];
            order.quantityPlaced += placement.quantityPlaced;
            order.status = placement.status;
        });

        socket.on('executionCreatedEvent', function(execution){
            var order = _.filter($scope.gridData, {id: execution.orderId});

            if(order.length === 0) { return; }

            order = order[0];
            order.quantityExecuted += execution.quantityExecuted;
            order.status = execution.status;
            order.executionPrice = execution.executionPrice;
        });


        // We use the $scope.$parent.orders to initialize $scope.gridData
        // Here, every socket event works on gridData, not on $scope.$parent.orders
        $scope.gridData = new kendo.data.ObservableArray($scope.$parent.orders);

        $scope.gridColumns = [
            { field: 'id', title: 'ID' },
            { field: 'creationTime', title:'Creation Time'},
            { field: 'side', title:'Side'},
            { field: 'symbol', title:'Symbol'},
            { field: 'quantity', title:'Quantity'},
            { field: 'quantityPlaced', title:'Placed'},
            { field: 'quantityExecuted', title:'Executed'},
            { field: 'limitPrice', title:':Limit Price'},
            { field: 'priority', title:'Priority'},
            { field: 'traderId', title:'Trader'}
        ];

        $scope.gridOptions = {
            columns: $scope.gridColumns,
            dataSource: $scope.gridData,
            height: '100%',
            scrollable: {
                virtual: true,
                pageSize: 5
            }
        };
    }])
;