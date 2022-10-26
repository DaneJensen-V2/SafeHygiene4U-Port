import React from 'react';
import { render } from '@testing-library/react-native';
import { create } from 'react-test-renderer';
import { NativeBaseProvider } from 'native-base';
import RepurpostBrandTheme from '../../src/context/repurpost-brand-theme';

// inset configuration for Native Base (required for testing)
const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

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
  <NativeBaseProvider 
  initialWindowMetrics={inset}
  theme={RepurpostBrandTheme}>
    {children}
  </NativeBaseProvider>
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

/**
 * Custom render function for react-test-renderer. Try to use RTL-rendering when 
 * possible, but this function is provided for convenience.
 * @param {UI Component} ui 
 * @returns 
 */
const createWithContext = (ui) => (
  create(
    <NativeBaseProvider
    initialWindowMetrics={inset} 
    theme={RepurpostBrandTheme}>
      {ui}
    </NativeBaseProvider>
  )
);

  module.exports = {
    rtlRender,
    AllTheProviders,
    createWithContext,
  };
