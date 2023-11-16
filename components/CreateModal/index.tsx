import { useRef, useState } from 'react';

interface CreateModalProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  handleCreate: (formContext: HTMLFormElement | null) => boolean;
  regionOptions: { id: string; name: string }[];
  userTypeOptions: { id: string; name: string }[];
}

interface CreateModalChildProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: (formContext: HTMLFormElement | null) => boolean;
  regionOptions: { id: string; name: string }[];
  userTypeOptions: { id: string; name: string }[];
}

const CreateModal = ({
  children,
  open,
  setOpen,
  handleCreate,
  type,
  regionOptions,
  userTypeOptions,
}: CreateModalProps) => {
  const typeText = type === 'Promoción' ? 'de la promoción' : 'del cupón';
  const ACTUAL_DATE = new Date().toISOString().split(':').slice(0, 2).join(':');

  const formRef = useRef<HTMLFormElement>(null);

  const [isDiscountValue, setIsDiscountValue] = useState(true);
  const [discountValue, setDiscountValue] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxDiscount, setMaxDiscount] = useState('');
  return (
    <div
      className={`${
        open ? 'fixed' : 'hidden'
      } top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center
      `}
    >
      <dialog
        open={open}
        className='bg-white p-8 rounded-xl border-4 shadow-lg w-2/3 max-w-[720px] max-h-[90%] backdrop:bg-gray-800 flex flex-col items-center overflow-auto'
      >
        <header className='mb-2'>
          <h1 className='text-3xl text-blue-500 font-bold'>Crear {type}</h1>
        </header>
        <main>
          <form
            action=''
            ref={formRef}
            className='w-[520px] flex  flex-col gap-4 my-4'
            onSubmit={(e) => {
              e.preventDefault();
              if (handleCreate(formRef.current)) {
                setOpen(false);
                formRef.current?.reset();
              }
            }}
          >
            <fieldset className='flex  flex-col gap-2'>
              <label htmlFor='name'>Nombre</label>
              <input
                id='name'
                name='name'
                type='text'
                placeholder={`Nombre ${typeText}`}
                className='bg-gray-200 p-2 rounded-lg'
                required
                maxLength={250}
              />
              <label htmlFor='description'>Descripción</label>
              <textarea
                id='description'
                name='description'
                cols={30}
                rows={3}
                placeholder={`Descripción ${typeText}`}
                className='bg-gray-200 p-2 rounded-lg'
                required
                maxLength={250}
              ></textarea>
            </fieldset>

            <fieldset className='flex gap-4'>
              <div className='flex-1 flex-grow'>
                <label htmlFor='discountValue' className='flex flex-col'>
                  <div>
                    <input
                      type='radio'
                      name='tipo-descuento'
                      id='discountValue'
                      value='fijo'
                      required
                      defaultChecked
                      onChange={() => {
                        setIsDiscountValue(true);
                        setDiscountPercentage('');
                        setMaxDiscount('');
                      }}
                    />
                    <label htmlFor='discountValue'>&nbsp;Descuento fijo</label>
                  </div>
                  <input
                    type='number'
                    name='discountValue'
                    id='discountValue'
                    placeholder='Valor'
                    className='bg-gray-200 p-2 rounded-lg'
                    disabled={!isDiscountValue}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    required={isDiscountValue}
                    min={0}
                    max={1000000}
                  />
                </label>
              </div>
              <div className='flex-1 flex-grow'>
                <label htmlFor='discountPercentage' className='flex flex-col'>
                  <div>
                    <input
                      type='radio'
                      name='tipo-descuento'
                      id='discountPercentage'
                      value='porcentaje'
                      onChange={() => {
                        setIsDiscountValue(false);
                        setDiscountValue('');
                        setMinValue('');
                      }}
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
                    disabled={isDiscountValue}
                    value={discountPercentage}
                    onChange={(e) => {
                      setDiscountPercentage(e.target.value);
                    }}
                    required={!isDiscountValue}
                    min={0}
                    max={100}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className='flex gap-4'>
              <label
                htmlFor='minValue'
                className='flex-1 flex-grow flex flex-col'
              >
                Valor mínimo
                <input
                  type='number'
                  name='minValue'
                  id='minValue'
                  placeholder='Valor'
                  className='bg-gray-200 p-2 rounded-lg'
                  disabled={!isDiscountValue}
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  required={isDiscountValue}
                  min={0}
                  max={1000000}
                />
              </label>
              <label
                htmlFor='maxDiscount'
                className='flex-1 flex-grow flex flex-col'
              >
                Descuento máximo
                <input
                  type='number'
                  name='maxDiscount'
                  id='maxDiscount'
                  placeholder='Valor'
                  className='bg-gray-200 p-2 rounded-lg'
                  disabled={isDiscountValue}
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  required={!isDiscountValue}
                  min={0}
                  max={1000000}
                />
              </label>
            </fieldset>

            <fieldset className='flex gap-4'>
              <div className='flex-grow flex flex-col'>
                <label htmlFor='startDate'>Válida desde</label>
                <input
                  type='datetime-local'
                  name='startDate'
                  id='startDate'
                  className='bg-gray-200 p-2 rounded-lg'
                  required
                  min={ACTUAL_DATE}
                />
              </div>

              <div className='flex-grow flex flex-col'>
                <label htmlFor='endDate'>Válida hasta</label>
                <input
                  type='datetime-local'
                  name='endDate'
                  id='endDate'
                  className='bg-gray-200 p-2 rounded-lg'
                  required
                  min={ACTUAL_DATE}
                />
              </div>
            </fieldset>

            <fieldset className='flex gap-4'>
              <label htmlFor='city' className='flex-1 flex-grow flex flex-col'>
                Región
                <select
                  name='city'
                  id='city'
                  className='bg-gray-200 p-2 rounded-lg'
                  required
                >
                  {regionOptions.map(({ id, name }) => (
                    <option key={`region-${id}`} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label
                htmlFor='userType'
                className='flex-1 flex-grow flex flex-col'
              >
                Tipo de usuario
                <select
                  name='userType'
                  id='userType'
                  className='bg-gray-200 p-2 rounded-lg'
                  required
                >
                  {userTypeOptions?.map(({ id, name }) => (
                    <option key={`user-type-${id}`} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>
            {children}
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
                type='submit'
                className='text-lg font-semibold rounded-lg py-2 px-4 border-4 border-blue-500 text-blue-500'
              >
                Crear
              </button>
            </footer>
          </form>
        </main>
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
  return (
    <CreateModal
      open={open}
      setOpen={setOpen}
      handleCreate={handleCreate}
      type='Promoción'
      regionOptions={regionOptions}
      userTypeOptions={userTypeOptions}
    />
  );
};

const CreateCouponModal = ({
  open,
  setOpen,
  handleCreate,
  regionOptions,
  userTypeOptions,
}: CreateModalChildProps) => {
  return (
    <CreateModal
      open={open}
      setOpen={setOpen}
      handleCreate={handleCreate}
      type='Cupón'
      regionOptions={regionOptions}
      userTypeOptions={userTypeOptions}
    >
      <fieldset className='flex gap-4'>
        <label htmlFor='amount' className='flex-grow flex flex-col'>
          Cantidad de cupones
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='Cantidad'
            className='bg-gray-200 p-2 rounded-lg'
            required
            min={1}
            max={1000000}
          />
        </label>
      </fieldset>
    </CreateModal>
  );
};

export { CreateDiscountModal, CreateCouponModal };
