import { useRef } from 'react';

interface CreateModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  handleCreate: (formContext: HTMLFormElement | null) => boolean;
  formRef: React.RefObject<HTMLFormElement>;
}

interface CreateModalChildProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: (formContext: HTMLFormElement | null) => boolean;
  regionOptions: { id: string; name: string }[];
  userTypeOptions?: { id: string; name: string }[];
}

const CreateModal = ({
  children,
  open,
  setOpen,
  handleCreate,
  type,
  formRef,
}: CreateModalProps) => {
  return (
    <div
      className={`${
        open ? 'fixed' : 'hidden'
      } top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center
      `}
    >
      <dialog
        open={open}
        className='bg-white p-8 rounded-xl border-4 shadow-lg w-2/3 max-w-[720px] backdrop:bg-gray-800 flex flex-col items-center'
      >
        <header className='mb-2'>
          <h1 className='text-3xl text-blue-500 font-bold'>Crear {type}</h1>
        </header>
        <main>{children}</main>
        <footer className='self-end flex gap-4'>
          <button
            className='text-lg font-semibold rounded-lg py-2 px-4 border-4 border-red-500 text-red-500'
            onClick={() => {
              setOpen(false);
              formRef.current?.reset();
            }}
          >
            Cancelar
          </button>
          <button
            className='text-lg font-semibold rounded-lg py-2 px-4 border-4 border-blue-500 text-blue-500'
            onClick={() => {
              const createResult = handleCreate(formRef.current);
              if (createResult) {
                setOpen(false);
                formRef.current?.reset();
              }
            }}
          >
            Crear
          </button>
        </footer>
      </dialog>
    </div>
  );
};

const CreateDiscountModal = ({
  open,
  setOpen,
  handleCreate,
  regionOptions,
  userTypeOptions,
}: CreateModalChildProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <CreateModal
      open={open}
      setOpen={setOpen}
      handleCreate={handleCreate}
      formRef={formRef}
      type='Promoción'
    >
      <form
        action=''
        ref={formRef}
        className='w-[520px] flex  flex-col gap-4 my-4'
      >
        <fieldset className='flex  flex-col gap-2'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            name='nombre'
            id='nombre'
            placeholder={`Nombre de la promoción`}
            className='bg-gray-200 p-2 rounded-lg'
          />
          <label htmlFor='descripcion'>Descripción</label>
          <textarea
            name='descripcion'
            id='descripcion'
            cols={30}
            rows={3}
            placeholder={`Descripción de la promoción`}
            className='bg-gray-200 p-2 rounded-lg'
          ></textarea>
        </fieldset>

        <fieldset className='flex gap-4'>
          <div className='flex-grow'>
            <label htmlFor='descuento-fijo' className='flex flex-col'>
              <div>
                <input
                  type='radio'
                  name='tipo-descuento'
                  id='descuento-fijo'
                  value='fijo'
                />
                <label htmlFor='descuento-fijo'>&nbsp;Descuento fijo</label>
              </div>
              <input
                type='number'
                name='descuento-fijo'
                id='descuento-fijo'
                placeholder='Valor'
                className='bg-gray-200 p-2 rounded-lg'
              />
            </label>
          </div>
          <div className='flex-grow'>
            <label htmlFor='descuento-porcentaje' className='flex flex-col'>
              <div>
                <input
                  type='radio'
                  name='tipo-descuento'
                  id='descuento-porcentaje'
                  value='porcentaje'
                />
                <label htmlFor='descuento-porcentaje'>
                  &nbsp;Descuento porcentual
                </label>
              </div>
              <input
                type='number'
                name='descuento-porcentaje'
                id='descuento-porcentaje'
                placeholder='Valor'
                className='bg-gray-200 p-2 rounded-lg'
              />
            </label>
          </div>
        </fieldset>

        <fieldset className='flex gap-4'>
          <div className='flex-grow flex flex-col'>
            <label htmlFor='fecha-inicio'>Válida desde</label>
            <input
              type='date'
              name='fecha-inicio'
              id='fecha-inicio'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </div>

          <div className='flex-grow flex flex-col'>
            <label htmlFor='fecha-fin'>Válida hasta</label>
            <input
              type='date'
              name='fecha-fin'
              id='fecha-fin'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </div>
        </fieldset>

        <fieldset className='flex gap-4'>
          <label htmlFor='region' className='flex-grow flex flex-col'>
            Región
            <select
              name='region'
              id='region'
              className='bg-gray-200 p-2 rounded-lg'
            >
              {regionOptions.map(({ id, name }) => (
                <option key={`region-${id}`} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='tipo-usuario' className='flex-grow flex flex-col'>
            Tipo de usuario
            <select
              name='tipo-usuario'
              id='tipo-usuario'
              className='bg-gray-200 p-2 rounded-lg'
            >
              {userTypeOptions?.map(({ id, name }) => (
                <option key={`user-type-${id}`} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
      </form>
    </CreateModal>
  );
};

const CreateCouponModal = ({
  open,
  setOpen,
  handleCreate,
  regionOptions,
}: CreateModalChildProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <CreateModal
      open={open}
      setOpen={setOpen}
      handleCreate={handleCreate}
      formRef={formRef}
      type='Cupón'
    >
      <form
        action=''
        ref={formRef}
        className='w-[520px] flex  flex-col gap-4 my-4'
      >
        <fieldset className='flex  flex-col gap-2'>
          <label htmlFor='name'>Nombre</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder={`Nombre del cupón`}
            className='bg-gray-200 p-2 rounded-lg'
          />
          <label htmlFor='description'>Descripción</label>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={3}
            placeholder={`Descripción del cupón`}
            className='bg-gray-200 p-2 rounded-lg'
          ></textarea>
        </fieldset>

        <fieldset className='flex gap-4'>
          <div className='flex-grow'>
            <label htmlFor='discountValue' className='flex flex-col'>
              <div>
                <input
                  type='radio'
                  name='tipo-descuento'
                  id='discountValue'
                  value='fijo'
                />
                <label htmlFor='discountValue'>&nbsp;Descuento fijo</label>
              </div>
              <input
                type='number'
                name='discountValue'
                id='discountValue'
                placeholder='Valor'
                className='bg-gray-200 p-2 rounded-lg'
              />
            </label>
          </div>
          <div className='flex-grow'>
            <label htmlFor='discountPercentage' className='flex flex-col'>
              <div>
                <input
                  type='radio'
                  name='tipo-descuento'
                  id='discountPercentage'
                  value='porcentaje'
                />
                <label htmlFor='discountPercentage'>
                  &nbsp;Descuento porcentual
                </label>
              </div>
              <input
                type='number'
                name='discountPercentage'
                id='discountPercentage'
                placeholder='Valor'
                className='bg-gray-200 p-2 rounded-lg'
              />
            </label>
          </div>
        </fieldset>

        <fieldset className='flex gap-4'>
          <label htmlFor='maxDiscount' className='flex-grow flex flex-col'>
            Descuento máximo
            <input
              type='number'
              name='maxDiscount'
              id='maxDiscount'
              placeholder='Valor'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </label>
          <label htmlFor='minValue' className='flex-grow flex flex-col'>
            Valor mínimo
            <input
              type='number'
              name='minValue'
              id='minValue'
              placeholder='Valor'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </label>
        </fieldset>

        <fieldset className='flex gap-4'>
          <div className='flex-grow flex flex-col'>
            <label htmlFor='startDate'>Válido desde</label>
            <input
              type='date'
              name='startDate'
              id='startDate'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </div>

          <div className='flex-grow flex flex-col'>
            <label htmlFor='endDate'>Válido hasta</label>
            <input
              type='date'
              name='endDate'
              id='endDate'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </div>
        </fieldset>

        <fieldset className='flex gap-4'>
          <label htmlFor='city' className='flex-grow flex flex-col'>
            Región
            <select
              name='city'
              id='city'
              className='bg-gray-200 p-2 rounded-lg'
            >
              {regionOptions.map(({ id, name }) => (
                <option key={`region-${id}`} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset className='flex gap-4'>
          <label htmlFor='amount' className='flex-grow flex flex-col'>
            Cantidad de cupones
            <input
              type='number'
              name='amount'
              id='amount'
              placeholder='Cantidad'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </label>
        </fieldset>
      </form>
    </CreateModal>
  );
};

export { CreateDiscountModal, CreateCouponModal };
