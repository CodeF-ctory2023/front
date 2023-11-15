import { render, screen } from '@testing-library/react';
import GestionFinancieraPage from '@/pages/GestionFinanciera';
import { userEvent } from '@testing-library/user-event';

const routerPushMock = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/GestionFinanciera',
    push: routerPushMock,
  }),
}));

const buttonTexts = [/tarifas/i, /gestión.+cuenta/i];

describe('GestionFinancieraPage', () => {
  beforeEach(() => {
    render(<GestionFinancieraPage />);
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
