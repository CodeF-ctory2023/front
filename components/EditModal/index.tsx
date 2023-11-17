import { useEffect, useRef, useState } from 'react';

type TEditCupon = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
  maxDiscount: number;
  discountValue: number;
  minValue: number;
  amount: number;
  city: string;
  status: string;
  userType: string;
};

type TEditDiscount = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
  maxDiscount: number;
  discountValue: number;
  minValue: number;
  city: string;
  status: string;
  userType: string;
};

interface EditModalProps<T> {
  id: string;
  data: T;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIdToEdit: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  handleEdit: (id: string, formContext: HTMLFormElement | null) => boolean;
  userTypeOptions: { id: string; name: string }[];
  regionOptions: { id: string; name: string }[];
  children?: React.ReactNode;
}

interface EditModalChildProps<T> {
  data: T;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: (id: string, formContext: HTMLFormElement | null) => boolean;
  regionOptions: { id: string; name: string }[];
  setIdToEdit: React.Dispatch<React.SetStateAction<string>>;
  userTypeOptions: { id: string; name: string }[];
}

const EditModal = ({
  id,
  children,
  open,
  setOpen,
  setIdToEdit,
  handleEdit,
  type,
  regionOptions,
  userTypeOptions,
  data,
}: EditModalProps<TEditCupon | TEditDiscount>) => {
  const typeText = type === 'Cupón' ? 'del cupón' : 'de la promoción';
  const ACTUAL_DATE = new Date().toISOString().split(':').slice(0, 2).join(':');

  const formRef = useRef<HTMLFormElement>(null);

  const [isFixedDiscount, setIsFixedDiscount] = useState<boolean | undefined>();

  useEffect(() => {
    setIsFixedDiscount(data.discountValue !== 0);
  }, [data.discountValue]);
  return (
    <div
      className={`${
        open ? 'fixed' : 'hidden'
      } top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center
      `}
    >
      <dialog
        open={open}
        className='bg-white p-8 rounded-xl border-4 shadow-lg w-2/3 max-w-[720px]  max-h-[90vh] overflow-y-auto backdrop:bg-gray-800 flex flex-col items-center'
      >
        <header className='mb-2'>
          <h1 className='text-3xl text-blue-500 font-bold'>Editar {type}</h1>
        </header>
        <main>
          <form
            action=''
            ref={formRef}
            className='w-[520px] flex  flex-col gap-4 my-4'
            onSubmit={(e) => {
              e.preventDefault();
              if (handleEdit(id, formRef.current)) {
                setOpen(false);
                formRef.current?.reset();
              }
            }}
          >
            <fieldset className='flex  flex-col gap-2'>
              <label htmlFor='name'>Nombre</label>
              <input
                type='text'
                name='name'
                id='name'
                defaultValue={data.name}
                placeholder={`Nombre ${typeText}`}
                className='bg-gray-200 p-2 rounded-lg'
                required
                maxLength={50}
              />
              <label htmlFor='description'>Descripción</label>
              <textarea
                name='description'
                id='description'
                cols={30}
                rows={3}
                defaultValue={data.description}
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
                      defaultChecked={data.discountValue !== 0}
                      onChange={() => {
                        setIsFixedDiscount(true);
                      }}
                    />
                    <label htmlFor='discountValue'>&nbsp;Descuento fijo</label>
                  </div>
                  <input
                    type='number'
                    name='discountValue'
                    id='discountValue'
                    placeholder='Valor'
                    className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
                    disabled={!isFixedDiscount}
                    defaultValue={data.discountValue}
                    required={isFixedDiscount}
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
                      defaultChecked={data.discountValue === 0}
                      onChange={() => {
                        setIsFixedDiscount(false);
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
                    className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
                    disabled={isFixedDiscount}
                    defaultValue={data.discountPercentage}
                    required={!isFixedDiscount}
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
                  className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
                  disabled={!isFixedDiscount}
                  defaultValue={data.minValue}
                  required={isFixedDiscount}
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
                  className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
                  disabled={isFixedDiscount}
                  defaultValue={data.maxDiscount}
                  required={!isFixedDiscount}
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
                  defaultValue={`${
                    data.startDate.toISOString().split('T')[0]
                  }T${data.startDate.toTimeString().slice(0, 5)}`}
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
                  defaultValue={`${
                    data.endDate.toISOString().split('T')[0]
                  }T${data.endDate.toTimeString().slice(0, 5)}`}
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
                  disabled
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
                  defaultValue={data.userType}
                  required
                  disabled
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
                type='button'
                className='text-lg font-semibold rounded-lg py-2 px-4 border-4 border-red-500 text-red-500'
                onClick={() => {
                  setOpen(false);
                  setIdToEdit('');
                  formRef.current?.reset();
                }}
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='text-lg font-semibold rounded-lg py-2 px-4 border-4 border-blue-500 text-blue-500'
              >
                Editar
              </button>
            </footer>
          </form>
        </main>
      </dialog>
    </div>
  );
};

const EditCouponModal = ({
  data,
  open,
  setOpen,
  setIdToEdit,
  handleEdit,
  regionOptions,
  userTypeOptions,
}: EditModalChildProps<TEditCupon>) => {
  return (
    <EditModal
      id={data.id}
      open={open}
      setOpen={setOpen}
      setIdToEdit={setIdToEdit}
      handleEdit={handleEdit}
      type='Cupón'
      regionOptions={regionOptions}
      userTypeOptions={userTypeOptions}
      data={data}
    >
      <fieldset className='flex gap-4'>
        <label htmlFor='amount' className='flex-grow flex flex-col'>
          Cantidad de cupones
          <input
            type='number'
            name='amount'
            id='amount'
            disabled
            defaultValue={data.amount}
            placeholder='Cantidad'
            className='bg-gray-200 p-2 rounded-lg'
            required
            min={1}
            max={1000000}
          />
        </label>
      </fieldset>
    </EditModal>
  );
};

const EditDiscountModal = ({
  data,
  open,
  setOpen,
  setIdToEdit,
  handleEdit,
  regionOptions,
  userTypeOptions,
}: EditModalChildProps<TEditDiscount>) => {
  return (
    <EditModal
      id={data.id}
      open={open}
      setOpen={setOpen}
      setIdToEdit={setIdToEdit}
      handleEdit={handleEdit}
      type='Promoción'
      regionOptions={regionOptions}
      userTypeOptions={userTypeOptions}
      data={data}
    />
  );
};

export { EditCouponModal, EditDiscountModal };
