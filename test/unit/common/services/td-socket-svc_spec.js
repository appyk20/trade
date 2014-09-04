/*global
 describe,beforeEach,afterEach,it,expect,
 module,inject
 */
'use strict';
describe('tdSocketSvc', function () {
    var SocketSvc,
        $rootScope,
        socket,
        scope,
        TestCtrl;

    angular.module('traderApp').controller('TestSocketCtrl', function($scope, tdSocketSvc){
        $scope.data = null;
        $scope.eventHandler = function(data){
            $scope.data = data;
        };

        $scope.init = function(){
            tdSocketSvc.on('customEvent', $scope.eventHandler, $scope);
        };
    });
    beforeEach(module('traderApp'));
    beforeEach(inject(function (_tdSocketSvc_, $controller, _$rootScope_, _socket_) {


        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        socket = _socket_;
        SocketSvc = _tdSocketSvc_;
        TestCtrl = $controller('TestSocketCtrl', {
            $scope: scope,
            tdSocketSvc: SocketSvc
        });
    }));

    describe('Method::on()#', function () {

        it('on() Method should be defined', function () {
            expect(SocketSvc.on).toBeDefined();
        });

        it('should bind socket events to the callback".', function () {
            spyOn(scope, 'eventHandler');
            scope.init();
            socket.$events.allOrdersDeletedEvent()
            expect(scope.eventHandler).toHaveBeenCalled();
        });
    });

    describe('Method::emit()#', function () {

        it('emit() Method should be defined', function () {
            expect(SocketSvc.on).toBeDefined();
        });

        it('should bind socket events to the callback in the passed scope".', function () {
            //TODO:..
        });
    });
});