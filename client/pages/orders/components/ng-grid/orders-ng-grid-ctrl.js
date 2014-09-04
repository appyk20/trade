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
 * @OrdersNgGridCtrl controller
 * This controller has the configuration for the ngGrid implementation
 *
 * @authors
 * Sravan Kumar Rekandar
 */
'use strict';
angular.module('traderApp.controllers')
    .controller('OrdersNgGridCtrl', ['$scope', function($scope){
        $scope.orders = $scope.$parent.orders;

        // Syncing orders when there is a change in parent controller (OrdersPageCtrl)
        $scope.$watch('$parent.orders', function(){
            $scope.orders = $scope.$parent.orders;
        });

        // Configuration for the grid..
        $scope.gridOptions = {
            data: 'orders',
            columnDefs: [
                {field:'id', displayName:'ID', cellClass:'col-id'},
                {field:'creationTime', displayName:'Creation Time', cellClass:'col-creation-time'},
                {field:'side', displayName:'Side', cellClass:'col-side text-center'},
                {field:'symbol', displayName:'Symbol', cellClass:'col-symbol text-center'},
                {
                    field:'quantity',
                    displayName:'Quantity',
                    cellClass:'col-quantity text-right'
                },
                {
                    field:'quantityPlaced',
                    displayName:'Placed',
                    cellClass:'col-placed text-right',
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">' +
                                    '<span ng-cell-text>' +
                                        '{{row.getProperty(col.field)}}&nbsp;' +
                                        '<td-show-change ng-model="COL_FIELD"></td-show-change>' +
                                    '</span>' +
                                  '</div>'
                },
                {
                    field:'quantityExecuted',
                    displayName:'Executed',
                    cellClass:'col-executed text-right',
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">' +
                                    '<span ng-cell-text>' +
                                        '{{row.getProperty(col.field)}}&nbsp;' +
                                        '<td-show-change ng-model="COL_FIELD"></td-show-change>' +
                                    '</span>' +
                                  '</div>'
                },
                {field:'limitPrice', displayName:'Limit Price', cellClass:'col-limit-price text-right'},
                {field:'priority', displayName:'Priority', cellClass:'col-limit-priority text-right'},
                {
                    field:'status',
                    displayName:'Status',
                    cellClass:'col-limit-status text-center',
                    cellTemplate: '<div class="ngCellText {{row.getProperty(col.field).toLowerCase()}}" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>'
                },
                {field:'traderId', displayName:'Trader',cellClass:'col-limit-trader text-center'}
            ]
        }
    }])
;