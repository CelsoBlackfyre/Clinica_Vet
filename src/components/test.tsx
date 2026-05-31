import { render } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('should render the App without crashing', () => {
    const { container } = render(<App />)

    // Basic smoke test - sidebar and main content area should exist
    expect(container.firstChild).toBeInTheDocument()
    // The app uses React Router + custom layout, so we just verify it mounts
  })
})
