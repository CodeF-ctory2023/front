import DeTransportePage from '@/pages/GestionFinanciera/Tarifas/DeTransporte/index';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import 'dayjs/locale/es';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/path',
    pathname: '/path',
    query: '',
    asPath: '',
  }),
}));

describe('DeTransportePage', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>
        <QueryClientProvider client={queryClient}>
          <DeTransportePage />
        </QueryClientProvider>
      </LocalizationProvider>
    );
  });

  it('renders the form', () => {
    const valorPorKmInput = screen.getByLabelText(/valor por kilómetro/i);
    const recargoInput = screen.getByLabelText(/recargo/i);
    const vigencyText = screen.getByText(/fechas/i);
    const startDateInput = screen.getByLabelText(/Inicio/i);
    const endDateInput = screen.getByLabelText(/Fin/i);
    const guardarButton = screen.getByText(/GUARDAR/i);
    const regresarButton = screen.getByText(/REGRESAR/i);

    expect(valorPorKmInput).toBeInTheDocument();
    expect(recargoInput).toBeInTheDocument();
    expect(vigencyText).toBeInTheDocument();
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
    expect(guardarButton).toBeInTheDocument();
    expect(regresarButton).toBeInTheDocument();
  });

  it('displays error message when surchage is not between 0% and 30% and all required fields are set', async () => {
    const recargoInput = screen.getByLabelText(/recargo/i);
    const valorPorKmInput = screen.getByLabelText(/valor por kilómetro/i);
    const guardarButton = screen.getByText(/GUARDAR/i);

    await userEvent.type(valorPorKmInput, '2'); // required
    await userEvent.type(recargoInput, '40'); // required
    fireEvent.click(guardarButton);

    const errorMessage = screen.getByText(/.+0%.+30%/); // contains a text that includes 0% and 30%
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message when dates are not valid and all required fields are set', async () => {
    const recargoInput = screen.getByLabelText(/recargo/i);
    const valorPorKmInput = screen.getByLabelText(/valor por kilómetro/i);
    const startDateInput = screen.getByLabelText(/Inicio/i);
    const endDateInput = screen.getByLabelText(/Fin/i);
    const guardarButton = screen.getByText('GUARDAR');

    fireEvent.change(valorPorKmInput, { target: { value: '1' } });
    fireEvent.change(recargoInput, { target: { value: '1' } });

    await userEvent.type(startDateInput, '02-01-2021');
    await userEvent.type(endDateInput, '01-01-2021');
    await userEvent.click(guardarButton);

    const errorMessage = await screen.findByText(
      /Ingrese.+fechas.+v(a|á)lid.+/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
