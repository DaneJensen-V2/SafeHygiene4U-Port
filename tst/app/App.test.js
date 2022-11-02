import  { App } from '../../src/app/App';
import { createWithContext } from '../utils/test-utils';
import { act } from 'react-test-renderer';

describe('Main app component', () => {
    let baseRender, testInstance;
    
    // arrange
    beforeEach(async () => {
        // wrap render calls in "act" to ensure that component hooks are executed before test assertions
        // are made
        await act(async () => {
            baseRender = await createWithContext(<App />);
            testInstance = baseRender.root;
        });
    });

    it('View should not be null or undefined', async () => {
        // arrange
        const view = testInstance.findByType("View");

        // assert
        expect(view).not.toBeNull();
        expect(view).not.toBeUndefined();
    });

    it('View should have four children', async () => {
        // arrange
        const view = testInstance.findByType("View");

        // assert
        expect(view.children).toHaveLength(4);
    });
});
