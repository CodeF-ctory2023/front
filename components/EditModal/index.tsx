import { useRef, useState } from 'react';

type coupon = {
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
  amountAvailable: number;
  status: string;
};

type discounts = {
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
  familyProfile: string;
};

interface EditModalProps {
  children: React.ReactNode;
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  handleEdit: (id: string, formContext: HTMLFormElement | null) => boolean;
  formRef: React.RefObject<HTMLFormElement>;
}

interface EditModalChildProps<T> {
  data: T;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: (id: string, formContext: HTMLFormElement | null) => boolean;
  regionOptions: { id: string; name: string }[];
  userTypeOptions?: { id: string; name: string }[];
}

const EditModal = ({
  id,
  children,
  open,
  setOpen,
  handleEdit,
  type,
  formRef,
}: EditModalProps) => {
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
              const editResult = handleEdit(id, formRef.current);
              if (editResult) {
                setOpen(false);
                formRef.current?.reset();
              }
            }}
          >
            Editar
          </button>
        </footer>
      </dialog>
    </div>
  );
};

const EditCouponModal = ({
  data,
  open,
  setOpen,
  handleEdit,
  regionOptions,
}: EditModalChildProps<coupon>) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isFixedDiscount, setIsFixedDiscount] = useState<boolean>(
    !data.discountPercentage
  );

  return (
    <EditModal
      id={data.id}
      open={open}
      setOpen={setOpen}
      handleEdit={handleEdit}
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
            defaultValue={data.name}
            placeholder={`Nombre del cupón`}
            className='bg-gray-200 p-2 rounded-lg'
          />
          <label htmlFor='description'>Descripción</label>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={3}
            defaultValue={data.description}
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
                  defaultChecked={isFixedDiscount}
                  onChange={() => setIsFixedDiscount(true)}
                  value='fijo'
                />
                <label htmlFor='discountValue'>&nbsp;Descuento fijo</label>
              </div>
              <input
                type='number'
                name='discountValue'
                id='discountValue'
                defaultValue={data.discountValue}
                placeholder='Valor'
                disabled={!isFixedDiscount}
                className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
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
                  defaultChecked={!isFixedDiscount}
                  onChange={() => setIsFixedDiscount(false)}
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
                defaultValue={data.discountPercentage}
                placeholder='Valor'
                disabled={isFixedDiscount}
                className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
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
              defaultValue={data.maxDiscount}
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
              defaultValue={data.minValue}
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
              defaultValue={data.startDate.toISOString().split('T')[0]}
              className='bg-gray-200 p-2 rounded-lg'
            />
          </div>

          <div className='flex-grow flex flex-col'>
            <label htmlFor='endDate'>Válido hasta</label>
            <input
              type='date'
              name='endDate'
              id='endDate'
              defaultValue={data.endDate.toISOString().split('T')[0]}
              className='bg-gray-200 p-2 rounded-lg'
            />
          </div>
        </fieldset>

        <fieldset className='flex gap-4'>
          <label htmlFor='city' className='flex-grow flex flex-col'>
            Ciudad
            <select
              name='city'
              id='city'
              defaultValue={data.city}
              className='bg-gray-200 p-2 rounded-lg'
            >
              {regionOptions.map(({ id, name }) => (
                <option key={`region-${id}`} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='status' className='flex-grow flex flex-col'>
            Estado
            <select
              name='status'
              id='status'
              defaultValue={data.status}
              className='bg-gray-200 p-2 rounded-lg'
            >
              <option value='activo'>Activo</option>
              <option value='inactivo'>Inactivo</option>
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
              defaultValue={data.amount}
              placeholder='Cantidad'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </label>
        </fieldset>
      </form>
    </EditModal>
  );
};

const EditDiscountModal = ({
  data,
  open,
  setOpen,
  handleEdit,
  regionOptions,
  userTypeOptions,
}: EditModalChildProps<discounts>) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isFixedDiscount, setIsFixedDiscount] = useState<boolean>(
    !data.discountPercentage
  );

  return (
    <EditModal
      id={data.id}
      open={open}
      setOpen={setOpen}
      handleEdit={handleEdit}
      formRef={formRef}
      type='Promoción'
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
            defaultValue={data.name}
            placeholder={`Nombre de la promoción`}
            className='bg-gray-200 p-2 rounded-lg'
          />
          <label htmlFor='description'>Descripción</label>
          <textarea
            name='description'
            id='description'
            cols={30}
            rows={3}
            defaultValue={data.description}
            placeholder={`Descripción de la promoción`}
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
                  required
                  defaultChecked
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
              />
            </label>
          </div>
        </fieldset>

        <fieldset className='flex gap-4'>
          <label htmlFor='minValue' className='flex-grow flex flex-col'>
            Valor mínimo
            <input
              type='number'
              name='minValue'
              id='minValue'
              placeholder='Valor'
              className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
              disabled={!isFixedDiscount}
            />
          </label>
          <label htmlFor='maxDiscount' className='flex-grow flex flex-col'>
            Descuento máximo
            <input
              type='number'
              name='maxDiscount'
              id='maxDiscount'
              placeholder='Valor'
              className='bg-gray-200 p-2 rounded-lg disabled:opacity-50'
              disabled={isFixedDiscount}
            />
          </label>
        </fieldset>

        <fieldset className='flex gap-4'>
          <div className='flex-grow flex flex-col'>
            <label htmlFor='startDate'>Válida desde</label>
            <input
              type='date'
              name='startDate'
              id='startDate'
              className='bg-gray-200 p-2 rounded-lg'
            />
          </div>

          <div className='flex-grow flex flex-col'>
            <label htmlFor='endDate'>Válida hasta</label>
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
          <label htmlFor='userType' className='flex-grow flex flex-col'>
            Tipo de usuario
            <select
              name='userType'
              id='userType'
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
    </EditModal>
  );
};

export { EditCouponModal, EditDiscountModal };
