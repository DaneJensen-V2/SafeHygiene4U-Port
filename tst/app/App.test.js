import { create } from 'react-test-renderer';
import  App from '../../src/app/App';
import { View } from 'react-native';

describe('Main app component', () => {
    let baseRender, testInstance;

    // arrange
    beforeEach(async () => {
        baseRender = create(<App/>);
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
        expect(view.children).toHaveLength(2);
    });
});
