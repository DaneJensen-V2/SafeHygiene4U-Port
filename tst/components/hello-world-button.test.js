import { rtlRender } from '../utils/test-utils';
import { fireEvent, screen } from '@testing-library/react-native';
import HelloWorldButton from '../../src/components/hello-world-button';
import { act } from 'react-test-renderer';

describe('Hello World button', () => {
    // silly logic to "mock" the expected button behavior
    const getMessage = (numClicks) => 
    `I have been pressed ${numClicks} time${numClicks == 1 ? '' : 's'}!`;

    // arrange
    // render a "fresh" version of the component before each test
    beforeEach(async () => {
        await rtlRender(<HelloWorldButton />);
    });

    it('should be rendered on the screen', async () => {
        // arrange
        const buttonComponent = await screen.findByTestId('hello-world-button');

        // assert
        expect(buttonComponent).not.toBeNull();
        expect(buttonComponent).not.toBe(undefined);
    });

    it('should have the correct message before being clicked', async () => {
        // arrange
        const buttonComponent = await screen.findByTestId('hello-world-button');

        // assert
        expect(buttonComponent).toHaveTextContent(getMessage(0));
    });

    it('should have the correct message after being clicked once', async () => {
        // arrange
        const buttonComponent = await screen.findByTestId('hello-world-button');

        //act
        await act(async () => {
            await fireEvent.press(buttonComponent);
        });

        // assert
        expect(buttonComponent).toHaveTextContent(getMessage(1));
    });

    it('should have the correct message after being clicked twice', async () => {
        // arrange
        const buttonComponent = await screen.findByTestId('hello-world-button');

        //act
        await act(async () => {
            await fireEvent.press(buttonComponent);
            await fireEvent.press(buttonComponent);
        });

        // assert
        expect(buttonComponent).toHaveTextContent(getMessage(2));
    });
});
