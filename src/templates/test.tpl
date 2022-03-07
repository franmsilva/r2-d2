import { componentRenderer, screen } from 'common/utils/tests';

import {{componentName}} from '.';

describe(<{{componentName}} />, () => {
  const setup = componentRenderer({{componentName}}, {});

  describe('with default props', () => {
    beforeEach(() => {
      setup();
    });

    it('should render without errors', () => {
      // usually one of:
      // expect(screen.getByRole('something', { name: /something/i })).toBeInTheDocument()
      // expect(screen.getByText(/something/i)).toBeVisible()
    });
  });

  describe('when ...', () => {
    it('should do something', () => {
      // ...
    });
  });
});

