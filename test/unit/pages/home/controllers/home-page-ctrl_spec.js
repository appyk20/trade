/*global
	describe,beforeEach,afterEach,it,expect,spyOn,module,inject,window
*/
'use strict';
describe('Controller: HomePageCtrl::', function () {
	var HomePageCtrl,
		scope,
		RepositorySvc,
		$q,
		$rootScope;
	beforeEach(module('traderApp'));
	beforeEach(inject(function ($controller, _$rootScope_, _$q_, _tdRepositorySvc_){
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		RepositorySvc = _tdRepositorySvc_;
		$q = _$q_;
		HomePageCtrl = $controller('HomePageCtrl', {
			$scope: scope,
			RepositorySvc: RepositorySvc
		});
	}));
	describe('getUsers()#', function () {
		it('method should be defined', function () {
			expect(scope.getUsers).toBeDefined();
		});

        it('should update the users', function(){
            var deferred = $q.defer(),
                promise = deferred.promise,
                resolvedUsers = [
                    {name: 'user 1', id: '1'},
                    {name: 'user 2', id: '2'}
                ];
            deferred.resolve(resolvedUsers);
            spyOn(RepositorySvc, 'getUsers').andReturn(promise);
            scope.getUsers();
            $rootScope.$apply();
            expect(scope.users).toBe(resolvedUsers);
        });
	});
});