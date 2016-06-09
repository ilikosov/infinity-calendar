import calendar from '../../src/calendar';

describe('calendar', () => {
    describe('Greet function', () => {
        beforeEach(() => {
            spy(calendar, 'greet');
            calendar.greet();
        });

        it('should have been run once', () => {
            expect(calendar.greet).to.have.been.calledOnce;
        });

        it('should have always returned hello', () => {
            expect(calendar.greet).to.have.always.returned('hello');
        });
    });
});
