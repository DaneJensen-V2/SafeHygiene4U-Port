import { rtlRender } from '../utils/test-utils';
import { screen } from '@testing-library/react-native';
import HelloWorldText from '../../src/components/hello-world-text';
import { HELLO_WORLD_TEXT } from '../utils/test-constants';

describe('Hello World Component (rtl-rendered)', () => {
    // arrange
    // render a "fresh" version of the component before each test
    beforeEach(async () => {
        await rtlRender(<HelloWorldText />);
    })

    it('should be rendered on the screen', async () => {
        // arrange
        const textComponent = await screen.findByTestId('hello-world-text');

        // assert
        expect(textComponent).not.toBeNull();
        expect(textComponent).not.toBe(undefined);
    });

    it('should have the "hello world" text', async () => {
        // arrange
        const textComponent = await screen.findByTestId('hello-world-text');

        // assert
        expect(textComponent).toHaveTextContent(HELLO_WORLD_TEXT);
    });
});
