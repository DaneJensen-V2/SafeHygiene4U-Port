import  { App } from '../../src/app/App';
import { createWithContext } from '../utils/test-utils';

describe('Main app component', () => {
    let baseRender, testInstance;
    
    // arrange
    beforeEach(async () => {
        baseRender = createWithContext(<App />);
        testInstance = baseRender.root;
    });

    it('View should not be null or undefined', async () => {
        // arrange
        const view = testInstance.findByType("View");

        // assert
        expect(view).not.toBeNull();
        expect(view).not.toBeUndefined();
    });

    it('View should have two children', async () => {
        // arrange
        const view = testInstance.findByType("View");

        // assert
        expect(view.children).toHaveLength(4);
    });
});
