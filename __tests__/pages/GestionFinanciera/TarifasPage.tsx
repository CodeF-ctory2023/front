import { render, screen } from '@testing-library/react';
import TarifasPage from '@/pages/GestionFinanciera/Tarifas';
import { userEvent } from '@testing-library/user-event';

const routerPushMock = jest.fn();

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/GestionFinanciera/Tarifas',
      pathname: '',
      query: '',
      asPath: '',
      push: routerPushMock,
    };
  },
}));

const buttonTexts = [
  /tarifas.+(de transporte)|(sin parada)/i,
  /tarifas.+(ciudad)/i,
  /regresar|atrás/i,
];

describe('TarifasPage', () => {
  beforeEach(() => {
    render(<TarifasPage />);
  });

  it('renders the buttons with the correct text', () => {
    const buttons = buttonTexts.map((text) => screen.getByText(text));
    buttons.forEach((button) => expect(button).toBeInTheDocument());
  });

  it('redirects to the correct page when a button is clicked', async () => {
    const buttons = buttonTexts.map((text) => screen.getByText(text));
    for (const button of buttons) {
      await userEvent.click(button);
      expect(routerPushMock).toHaveBeenCalled();
      routerPushMock.mockClear();
    }
  });
});
