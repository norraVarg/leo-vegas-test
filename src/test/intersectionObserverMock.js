const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }
}

export default intersectionObserverMock