import {
  actualizarTarifaPorCiudad,
  obtenerTarifasPorCiudad,
} from '@/api/GestionFinanciera/Tarifas';
import { CityFeeRequest } from '@/interfaces/CityFee.interface';
import PorCiudadPage from '@/pages/GestionFinanciera/Tarifas/PorCiudad';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/api/GestionFinanciera/Tarifas', () => ({
  actualizarTarifaPorCiudad: jest.fn(),
  obtenerTarifasPorCiudad: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('PorCiudadPage with resolved queries', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (obtenerTarifasPorCiudad as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Bogotá', percentage: 10 },
      { id: 2, name: 'Medellín', percentage: 20 },
    ]);
    render(
      <QueryClientProvider client={queryClient}>
        <PorCiudadPage />
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page without crashing', async () => {
    await waitFor(
      () => {
        expect(screen.getByText(/TARIFAS POR CIUDAD/i)).toBeInTheDocument();
        expect(screen.getByText(/elegir ciudad/i)).toBeInTheDocument();
        expect(screen.getByText(/porcentaje/i)).toBeInTheDocument();
        expect(screen.getByText(/GUARDAR/i)).toBeInTheDocument();
        expect(screen.getByText(/REGRESAR/i)).toBeInTheDocument();
      },
      { timeout: 3000 } //wait for the query to resolve
    );
  });

  it('displays an error message when the percentage is invalid', async () => {
    const cityInput = screen.getByLabelText(/ciudad/i);
    const percentageInput = screen.getByLabelText(/porcentaje/i);
    const saveButton = screen.getByText(/GUARDAR/i);

    fireEvent.change(cityInput, { target: { value: 'Bogotá' } });
    fireEvent.keyDown(cityInput, { key: 'ArrowDown' });
    fireEvent.keyDown(cityInput, { key: 'Enter' });

    ['30.1', '-30.1', '123'].forEach((invalidPercentage) => {
      fireEvent.change(percentageInput, {
        target: { value: invalidPercentage },
      });
      fireEvent.click(saveButton);
      expect(screen.getByText(/Ingrese.+-30%.+30%/i)).toBeInTheDocument();
      expect(actualizarTarifaPorCiudad).not.toHaveBeenCalled();
    });
  });

  it('calls the API to update the city fee when the form is submitted with valid data', async () => {
    const cityInput = screen.getByLabelText(/ciudad/i);
    const percentageInput = screen.getByLabelText(/porcentaje/i);
    const saveButton = screen.getByText(/GUARDAR/i);

    fireEvent.change(cityInput, { target: { value: 'Medellín' } });
    fireEvent.keyDown(cityInput, { key: 'ArrowDown' });
    fireEvent.keyDown(cityInput, { key: 'Enter' });

    fireEvent.change(percentageInput, { target: { value: '15' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(actualizarTarifaPorCiudad).toHaveBeenCalledWith({
        cityId: 2, // Medellín
        percentage: 15,
      } as CityFeeRequest);
    });
  });
});

describe('PorCiudadPage with unresolved queries', () => {
  it('renders the page with error message', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (obtenerTarifasPorCiudad as jest.Mock).mockRejectedValue(
      new Error('Error fetching city fees')
    );
    render(
      <QueryClientProvider client={queryClient}>
        <PorCiudadPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No se puede conectar/i)).toBeInTheDocument();
    });
  });
});
