/*global
	describe,beforeEach,afterEach,it,expect,spyOn,module,inject,window,io
*/
'use strict';
describe('Controller: OrdersPageCtrl::', function () {
	var OrdersPageCtrl,
		scope,
		RepositorySvc,
		SocketSvc,
		$q,
		$rootScope,
        $modal,
        mockSocketService = {};
	beforeEach(function(){
        module('traderApp', function($provide){
            $provide.value('tdSocketSvc', mockSocketService);
        });

        mockSocketService.eventData = {
            'orderCreatedEvent':{id: 'new', name: 'New Order'},
            'allOrdersDeletedEvent': null,
            'placementCreatedEvent':{
                orderId: '301',
                quantityPlaced:90,
                status:'Placed'
            },
            'executionCreatedEvent':{
                orderId: '301',
                quantityExecuted:90,
                status:'Executed'
            }
        };
        mockSocketService.eventHandlers = {
            'orderCreatedEvent': [],
            'allOrdersDeletedEvent': [],
            'placementCreatedEvent':[],
            'executionCreatedEvent':[]
        }
        mockSocketService.on = function(eventName, callback, scope){
            mockSocketService.eventHandlers[eventName].push({callback:callback, scope:scope});
        };
        mockSocketService.receive = function(eventName){
            var callBacks = mockSocketService.eventHandlers[eventName],
                data = mockSocketService.eventData[eventName];
            for(var i = 0; i < callBacks.length; i++){
                callBacks[i].callback.call(callBacks[i].scope, data);
            }
        };
    });
	beforeEach(inject(function ($controller, _$rootScope_, _$q_, _tdRepositorySvc_, _$modal_, _tdSocketSvc_){
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		RepositorySvc = _tdRepositorySvc_;
		$q = _$q_;
        $modal = _$modal_;
        SocketSvc = _tdSocketSvc_;
        OrdersPageCtrl = $controller('OrdersPageCtrl', {
			$scope: scope,
			RepositorySvc: RepositorySvc,
			SocketSvc: _tdSocketSvc_,
			$modal: _$modal_
		});
	}));
	describe('Event Handlers#', function () {
        beforeEach(function(){
            scope.orders = [
                {id: '1', name:'order1', quantity:300,quantityPlaced:0,quantityExecuted:0,status:'New'},
                {id: '2', name:'order2', quantity:470,quantityPlaced:30,quantityExecuted:25,status:'Placed'},
                {id: '3', name:'order3', quantity:900,quantityPlaced:900,quantityExecuted:900,status:'Executed'}
            ];
        });
        describe('orderCreatedEvent():', function(){
           it('Method should be defined: ', function(){
                expect(scope.eventHandlers.orderCreatedEvent).toBeDefined();
           });
            it('Should add the new record to the orders', function(){
                var eventHandler = scope.eventHandlers.orderCreatedEvent,
                    newOrder = {
                        id: 'new',
                        name: 'New Order'
                    };

                eventHandler(newOrder);
                expect(scope.orders[scope.orders.length-1]).toBe(newOrder);// The last record must ne newOrder
            });
            it('Should not add the the record if it is a duplicate entry', function(){
                var eventHandler = scope.eventHandlers.orderCreatedEvent,
                    newOrder = {
                        id: 'new',
                        name: 'New Order'
                    },
                    len = scope.orders.length;

                eventHandler(newOrder);
                eventHandler(newOrder); // Adding the same order second time
                expect(scope.orders.length).toBe(len + 1); // It should increase by one, not two
            });
        });

        describe('allOrdersDeletedEvent():', function() {
            it('Method should be defined:', function(){
                expect(scope.eventHandlers.allOrdersDeletedEvent).toBeDefined();
            });

            it('Should clear the orders list', function(){
                var eventHandler = scope.eventHandlers.allOrdersDeletedEvent;
                eventHandler();
                expect(scope.orders.length).toBe(0);
            });
        });
        describe('placementCreatedEvent():', function(){
            it('Method should be defined:', function(){
                expect(scope.eventHandlers.placementCreatedEvent).toBeDefined();
            });
            it('Should update the relevant order', function(){
                var newOrder = {
                                    id: '301',
                                    name:'order301',
                                    quantity:390,
                                    quantityPlaced:0,
                                    quantityExecuted:0,
                                    status:'New'
                                },
                    newPlacement = {
                                orderId: '301',
                                quantityPlaced:90,
                                status:'Placed'
                                };

                // Adding new order
                scope.eventHandlers.orderCreatedEvent(newOrder);
                // Updating
                scope.eventHandlers.placementCreatedEvent(newPlacement);
                expect(newOrder.quantityPlaced).toBe(newPlacement.quantityPlaced);
                expect(newOrder.status).toBe(newPlacement.status);
            });
        });

        describe('executionCreatedEvent():', function(){
            it('Method should be defined:', function(){
                expect(scope.eventHandlers.executionCreatedEvent).toBeDefined();
            });
            it('Should update the relevant order', function(){
                var newOrder = {
                        id: '301',
                        name:'order301',
                        quantity:390,
                        quantityPlaced:300,
                        quantityExecuted:300,
                        status:'New'
                    },
                    newExecution = {
                        orderId: '301',
                        quantityExecuted:90,
                        status:'Executed'
                    };

                // Adding new order
                scope.eventHandlers.orderCreatedEvent(newOrder);
                // Updating
                scope.eventHandlers.executionCreatedEvent(newExecution);
                expect(newOrder.quantityExecuted).toBe(300 + newExecution.quantityExecuted);
                expect(newOrder.status).toBe(newExecution.status);
            });
        });
	});

    describe('switchToView()#', function(){
       it('Method should be defined: ', function(){
           expect(scope.switchToView).toBeDefined();
       });
       it('Should update $scope.currentView: ', function(){
           scope.switchToView('Table');
           expect(scope.currentView).toBe('Table');
           scope.switchToView('Chart');
           expect(scope.currentView).toBe('Chart');
       });
    });

    describe('refresh()#',function(){
        it('Method should be defined: ', function(){
            expect(scope.refresh).toBeDefined();
        });
        it('Should update the orders using RepositorySvc', function(){
            var deferred = $q.defer(),
                promise = deferred.promise,
                resolvedOrders = [
                    {name: 'order 1', id: '1'},
                    {name: 'order 2', id: '2'}
                ];
            deferred.resolve(resolvedOrders);
            spyOn(RepositorySvc, 'getOrders').andReturn(promise);

            scope.refresh();
            $rootScope.$apply();
            expect(scope.orders).toBe(resolvedOrders);
        });
    });

    describe('createOrder()#', function(){
        it('Method should be defined: ', function(){
            expect(scope.createOrder).toBeDefined();
        });
        it('Should call $modal.open()', function(){
            spyOn($modal, 'open');
            scope.createOrder();
            expect($modal.open).toHaveBeenCalled();
        });
    });
    describe('deleteAllOrders()#', function(){
        it('Method should be defined: ', function(){
            expect(scope.deleteAllOrders).toBeDefined();
        });
        it('Should call RepositorySvc.deleteAllOrders()', function(){
            spyOn(RepositorySvc, 'deleteAllOrders');
            scope.deleteAllOrders();
            expect(RepositorySvc.deleteAllOrders).toHaveBeenCalled();
        });
    });
    describe('init()#', function(){
        it('Method should be defined: ', function(){
            expect(scope.init).toBeDefined();
        });
        it('Should set the defaults()', function(){
            spyOn(scope, 'switchToView');
            spyOn(scope, 'refresh');
            scope.init();

            expect(scope.switchToView).toHaveBeenCalledWith('table');
            expect(scope.refresh).toHaveBeenCalled();
            expect(scope.orders.length).toBe(0);
        });
        it('Should bind the socket events:', function(){
            var eventHandlers = scope.eventHandlers;
            spyOn(SocketSvc, 'on');
            scope.init();
            expect(SocketSvc.on).toHaveBeenCalledWith('orderCreatedEvent', eventHandlers.orderCreatedEvent, scope);
            expect(SocketSvc.on).toHaveBeenCalledWith('allOrdersDeletedEvent', eventHandlers.allOrdersDeletedEvent, scope);
            expect(SocketSvc.on).toHaveBeenCalledWith('placementCreatedEvent', eventHandlers.placementCreatedEvent, scope);
            expect(SocketSvc.on).toHaveBeenCalledWith('executionCreatedEvent', eventHandlers.executionCreatedEvent, scope);
        });
    });

    describe('Event handlers should respond to socket events: ', function(){
        beforeEach(function(){
            spyOn(scope, 'refresh');
        });
        it('eventHandlers.orderCreatedEvent()', function(){
            spyOn(scope.eventHandlers, 'orderCreatedEvent');
            scope.init();
            SocketSvc.receive('orderCreatedEvent');
            expect(scope.eventHandlers.orderCreatedEvent).toHaveBeenCalledWith(SocketSvc.eventData['orderCreatedEvent']);
        });
        it('eventHandlers.allOrdersDeletedEvent()', function(){
            spyOn(scope.eventHandlers, 'allOrdersDeletedEvent');
            scope.init();
            SocketSvc.receive('allOrdersDeletedEvent');
            expect(scope.eventHandlers.allOrdersDeletedEvent).toHaveBeenCalledWith(SocketSvc.eventData['allOrdersDeletedEvent']);
        });
        it('eventHandlers.placementCreatedEvent()', function(){
            spyOn(scope.eventHandlers, 'placementCreatedEvent');
            scope.init();
            SocketSvc.receive('placementCreatedEvent');
            expect(scope.eventHandlers.placementCreatedEvent).toHaveBeenCalledWith(SocketSvc.eventData['placementCreatedEvent']);
        });
        it('eventHandlers.executionCreatedEvent()', function(){
            spyOn(scope.eventHandlers, 'executionCreatedEvent');
            scope.init();
            SocketSvc.receive('executionCreatedEvent');
            expect(scope.eventHandlers.executionCreatedEvent).toHaveBeenCalledWith(SocketSvc.eventData['executionCreatedEvent']);
        });
    });
});