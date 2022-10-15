import React from 'react';
import { render } from '@testing-library/react-native'

/**
 * This funciton wraps the rendered output in whatever context we
 * want to send, which is useful for testing with context
 * @param {children} children 
 * @returns 
 */
const AllTheProviders = ({children}) => {
  return (
    // Add context providers to wrap the children as we add context to the 
    // application, following the below example.
  // <SomeContextProvider someContextValue={someContext}>
    <div>{children}</div>
  // </SomeContextProvider>
  );
};


/**
 * Custom render function which wraps the UI in our context for testing.
 * @param { UI Commponent } ui 
 * @param { Context Changes } options 
 * @returns nothing, just renders the component headlessly.
 */
const rtlRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

  module.exports = {
    rtlRender,
  };
