type TextFieldProps = {
  name: string;
  value: string;
  values: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error: string;
  helperText?: string;
};

const SelectField = ({
  name,
  value,
  values,
  onChange,
  error,
  helperText,
}: TextFieldProps) => {
  return (
    <div className='relative z-0 mb-5 w-full group flex flex-col'>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className='lock py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 peer placeholder-transparent'>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <span className={`text-xs ${error ? 'text-red-600' : 'text-slate-400'}`}>
        {helperText}
      </span>
      <p className='mt-2 text-sm text-red-600'>{error}</p>
    </div>
  );
};

export default SelectField;
