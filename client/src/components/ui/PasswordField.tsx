import { useState } from 'react';

const PasswordField = ({ value }: { value: string }) => {
  const [visible] = useState(false);

  return <input type={visible ? 'text' : 'password'} defaultValue={value} />;
};

export default PasswordField;
