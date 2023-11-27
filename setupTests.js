// Import the jest-dom matchers
import '@testing-library/jest-dom';

// Any global setup logic can go here, for example:
// Setting up a mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

// You can also set up global variables
global.myGlobalVariable = 'some value';

// Or set up environment variables
process.env.MY_ENV_VAR = 'testValue';
