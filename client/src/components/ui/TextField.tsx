type TextFieldProps = {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder?: string;
  label: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
};

const TextField = ({
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  label,
  onBlur,
}: TextFieldProps) => {
  return (
    <div className='relative z-0 mb-5 w-full group flex flex-col'>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={`lock py-2.5 px-0 w-full text-sm  ${
          error
            ? 'text-red-600 border-red-600'
            : 'text-gray-900 border-gray-300'
        } bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none peer placeholder-transparent`}
      />
      <label
        htmlFor={name}
        className={`peer-focus:font-medium absolute text-sm ${
          error
            ? 'text-red-600 peer-focus:text-red-600'
            : 'text-gray-900 peer-focus:text-slate-600'
        } duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
        {label}
      </label>
      <p className='mt-2 text-sm text-red-600'>{error}</p>
    </div>
  );
};

export default TextField;
