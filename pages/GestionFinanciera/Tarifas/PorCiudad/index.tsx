import { Layout } from '@/components/GestionFinanciera/Layout';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const PorCiudadPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles['column']}>
        <div className={styles['form-group']}>
          <label className={styles['label']} htmlFor={styles['ciudad']}>
            Elegir ciudad
          </label>
          <select
            className={styles['select']}
            id={styles['ciudad']}
            name={styles['ciudad']}
          >
            <option value={styles['bogota']}>Bogotá</option>
            <option value={styles['medellin']}>Medellín</option>
            <option value={styles['cali']}>Cali</option>
          </select>
        </div>

        <div className={styles['form-group']}>
          <label className={styles['label']} htmlFor={styles['texto']}>
            Porcentaje de tarifa
          </label>
          <input
            className={styles['input']}
            type={styles['text']}
            id={styles['texto']}
            name={styles['texto']}
          />
        </div>

        <div className={styles['buttons']}>
          <button className={styles['button']}>Guardar</button>
          <button className={styles['button']} onClick={() => router.back()}>
            Regresar
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PorCiudadPage;
