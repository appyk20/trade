/*global
 describe,beforeEach,afterEach,it,expect,
 module,inject
 */
'use strict';
describe('tdRepositorySvc', function () {
    var RandomGeneratorSvc,
        RepositorySvc,
        $q;

    beforeEach(module('traderApp'));
    beforeEach(inject(function (_tdRandomGeneratorSvc_, _tdRepositorySvc_) {
        RandomGeneratorSvc = _tdRandomGeneratorSvc_;
        RepositorySvc = _tdRepositorySvc_;
    }));

    describe('Method::sideGenerator()#', function () {

        it('sideGenerator() Method should be defined', function () {
            expect(RandomGeneratorSvc.sideGenerator).toBeDefined();
        });

        it('should return "Buy" or "Sell".', function () {
            var i,
                side;
            for(i = 0; i < 10; i++){ // Testing 10 times
                side = RandomGeneratorSvc.sideGenerator();
                expect(side==='Buy' || side==='Sell').toBe(true);
            }
        });
    });

    describe('Method::quantityGenerator()#', function () {
        it('quantityGenerator() Method should be defined', function () {
            expect(RandomGeneratorSvc.quantityGenerator).toBeDefined();
        });

        it('should return a non zero and positive number', function () {
            var i,
                quantity;
            for(i = 0; i < 10; i++){ // Testing 10 times
                quantity = RandomGeneratorSvc.quantityGenerator();
                expect(typeof quantity === 'number' && quantity >=0).toBe(true);
            }
        });
    });

    describe('Method::limitPriceGenerator()#', function () {
        it('limitPriceGenerator() Method should be defined', function () {
            expect(RandomGeneratorSvc.limitPriceGenerator).toBeDefined();
        });

        it('should return a number', function () {
            var i,
                limit;
            for(i = 0; i < 10; i++){ // Testing 10 times
                limit = RandomGeneratorSvc.limitPriceGenerator();
                expect(typeof limit === 'number').toBe(true);
            }
        });
    });

    describe('Method::symbolGenerator()#', function () {
        it('symbolGenerator() Method should be defined', function () {
            expect(RandomGeneratorSvc.symbolGenerator).toBeDefined();
        });

        it('should return a number', function () {
            var resolvedInstruments = [
                    {
                        'symbol': 'AAPL',
                        'name': 'Apple Inc.',
                        'lastTrade': 98.7
                    },
                    {
                        'symbol': 'ADBE',
                        'name': 'Adobe Systems Inc.',
                        'lastTrade': 13.13
                    }
                ],
                symbol,
                i;
            RandomGeneratorSvc.refreshInstruments(resolvedInstruments);
            symbol = RandomGeneratorSvc.symbolGenerator();
            for(i = 0; i < 10; i++){ // Testing 10 times
                expect(symbol==='AAPL' || symbol==='ADBE').toBeTruthy();
            }
        });
    });

    describe('Method::traderIdGenerator()#', function () {
        it('traderIdGenerator() Method should be defined', function () {
            expect(RandomGeneratorSvc.traderIdGenerator).toBeDefined();
        });

        it('should return the id of loggedIn user', function () {
            var traderId;
            spyOn(RepositorySvc, 'getLoggedInUser').andReturn({id:'SRV', name:'SRAVAN'});
            traderId = RandomGeneratorSvc.traderIdGenerator();
            expect(traderId).toBe('SRV');
        });

        it('should return "-" when no user loggedIn', function () {
            var traderId;
            spyOn(RepositorySvc, 'getLoggedInUser').andReturn(null);
            traderId = RandomGeneratorSvc.traderIdGenerator();
            expect(traderId).toBe('-');
        });
    });
});