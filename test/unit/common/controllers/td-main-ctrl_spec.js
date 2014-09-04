/*global
 describe,beforeEach,afterEach,it,expect,spyOn,module,inject,window
 */
'use strict';
describe('Controller: MainCtrl::', function () {
    var MainCtrl,
        scope,
        RepositorySvc,
        localStorage,
        $location,
        $rootScope;
    beforeEach(module('traderApp'));
    beforeEach(inject(function ($controller, _$rootScope_, _$location_, _storage_, _tdRepositorySvc_) {
        scope = _$rootScope_.$new();

        RepositorySvc = _tdRepositorySvc_;
        $location = _$location_;
        localStorage = _storage_;
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            RepositorySvc: _tdRepositorySvc_,
            localStorage: _storage_,
            $location: _$location_
        });
    }));
    describe('login()#', function () {
        it('method should be defined', function () {
            expect(scope.login).toBeDefined();
        });
        it('should display alert if no arguments are passed', function () {
            spyOn(window, 'alert');
            scope.login();
            expect(window.alert).toHaveBeenCalled();
        });
        it('should set loggedIn user ', function () {
            var dummyUser = {id:'SRV',name:'SRAVAN'};
            spyOn(RepositorySvc, 'setLoggedInUser');
            spyOn($location, 'path');
            scope.login(dummyUser);
            expect(scope.loggedInUser).toBe(dummyUser);
            expect(RepositorySvc.setLoggedInUser).toHaveBeenCalledWith(dummyUser);
        });
        it('should redirect to orders page if a user been passed as an argument ', function () {
            var dummyUser = {id:'SRV',name:'SRAVAN'};
            spyOn(RepositorySvc, 'setLoggedInUser');
            spyOn($location, 'path');
            scope.login(dummyUser);
            expect($location.path).toHaveBeenCalledWith('/orders');
        });
    });

    describe('logout()#', function () {
        it('method should be defined', function () {
            expect(scope.logout).toBeDefined();
        });

        it('should set loggedInUser to undefined', function () {
            spyOn(RepositorySvc, 'setLoggedInUser');
            scope.logout();
            expect(scope.loggedInuser).toEqual(null);
            expect(RepositorySvc.setLoggedInUser).toHaveBeenCalledWith(null);
        });

        it('should redirect to home', function () {
            spyOn(RepositorySvc, 'setLoggedInUser');
            spyOn($location, 'path');
            scope.logout();
            expect($location.path).toHaveBeenCalledWith('/home');
        });
    });

    describe('init()#', function () {
        it('method should be defined', function () {
            expect(scope.init).toBeDefined();
        });

        it('should bind the loggedInUser with the local storage', function () {
            spyOn(localStorage, 'bind');
            scope.init();
            expect(localStorage.bind).toHaveBeenCalled();
        });

        it('should redirect to home if loggedInuser not found', function () {
            spyOn($location, 'path');
            scope.init();
            scope.$apply(function() {
                scope.loggedInUser = undefined; // resetting after the bind with local storage
            });
            scope.init();
            expect($location.path).toHaveBeenCalledWith('/home');
        });
        it('should set the loggedIn user if loggedInuser found', function () {
            spyOn(RepositorySvc, 'setLoggedInUser');
            scope.init();
            scope.$apply(function(){
                scope.loggedInUser = {id:'SRV', name:'SRAVAN'}; // resetting after the bind with local storage
            });
            scope.init();
            expect(RepositorySvc.setLoggedInUser).toHaveBeenCalledWith(scope.loggedInUser);
        });
        it('should redirect to orders if loggedInuser found', function () {
            spyOn($location, 'path');
            scope.init();
            scope.$apply(function(){
                scope.loggedInUser = {id:'SRV', name:'SRAVAN'}; // resetting after the bind with local storage
            });
            scope.init();
            expect($location.path).toHaveBeenCalledWith('/orders');
        });
    });
});