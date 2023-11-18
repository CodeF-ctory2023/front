import { Footer } from '@/components/GestionFinanciera/Footer';
import { render } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';

describe("GestionFinanciera's Footer", () => {
  const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
  };

  test('footer renders', () => {
    const el = render(<Footer></Footer>);
    const footer = el.container.querySelector('footer');
    expect(footer).toBeDefined();
    expect(footer).toBeInTheDocument();
    expect(footer).toBeVisible();
  });

  test('footer should show logo and description', () => {
    const el = render(<Footer></Footer>);
    expect(el.container).toHaveTextContent('SSMU');
    expect(el.container).toHaveTextContent(
      'Experimenta viajes seguros y rápidos'
    );
  });

  test('footer should be fixed on bottom in desktop and tablet', () => {
    resizeScreenSize(breakpoints.sm);
    let el = render(<Footer></Footer>);
    expect(el.container.querySelector('footer')).toHaveClass('bottom-0');
    resizeScreenSize(breakpoints.md);
    el = render(<Footer></Footer>);
    expect(el.container.querySelector('footer')).toHaveClass('bottom-0');
  });
});

const createMatchMedia = (width: unknown) => {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: '',
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
};

const resizeScreenSize = (width: unknown) => {
  window.matchMedia = createMatchMedia(width);
};
