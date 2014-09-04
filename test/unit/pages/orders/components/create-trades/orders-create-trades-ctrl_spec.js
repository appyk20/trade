/*global
 describe,beforeEach,afterEach,it,expect,spyOn,module,inject,window,io
 */
'use strict';
describe('Controller: OrdersCreateTradesCtrl::', function () {
    var OrdersCreateTradesCtrl,
        scope,
        RandomGeneratorSvc,
        $rootScope,
        $modalInstance,
        $httpBackend;
    beforeEach(module('traderApp'));
    beforeEach(inject(function ($controller, _$rootScope_, $http, _$httpBackend_, _tdSocketSvc_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        RandomGeneratorSvc = {
            sideGenerator: function(){console.log(9)},
            symbolGenerator: sinon.stub(),
            quantityGenerator: sinon.stub(),
            limitPriceGenerator: sinon.stub(),
            traderIdGenerator: sinon.stub()
        };
        $modalInstance = {};
        $httpBackend = _$httpBackend_;
        $http = $http;
        OrdersCreateTradesCtrl = $controller('OrdersCreateTradesCtrl', {
            $scope: scope,
            tdRandomGeneratorSvc: RandomGeneratorSvc,
            $modalInstance: $modalInstance,
            $http: $http
        });
    }));
    afterEach(function () {
       //$httpBackend.verifyNoOutstandingRequest();
       //$httpBackend.verifyNoOutstandingExpectation();
    });
    describe('generateOrders()#', function () {
        it('Method should be defined: ', function(){
            expect(scope.generateOrders).toBeDefined();
        });
        it('Should generate and send the number of orders', function(){
            var url = '/rest/orders',
                count = 0;
            spyOn(RandomGeneratorSvc, 'sideGenerator');
            spyOn(RandomGeneratorSvc, 'symbolGenerator').andReturn(4);
            spyOn(RandomGeneratorSvc, 'quantityGenerator');
            spyOn(RandomGeneratorSvc, 'limitPriceGenerator');
            spyOn(RandomGeneratorSvc, 'traderIdGenerator');

            $httpBackend.whenPOST(url).respond('');
            scope.generateOrders(30);
            $httpBackend.expectPOST(url);

            expect(RandomGeneratorSvc.sideGenerator).toHaveBeenCalled();
            expect(RandomGeneratorSvc.symbolGenerator).toHaveBeenCalled();
            expect(RandomGeneratorSvc.quantityGenerator).toHaveBeenCalled();
            expect(RandomGeneratorSvc.limitPriceGenerator).toHaveBeenCalled();

            //TODO: Have to check all the above functions are called exactly 30 times
        });
    });
});