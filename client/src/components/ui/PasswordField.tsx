import React, { useState } from 'react';

const PasswordField = ({ value }: { value: string }) => {
  const [visible, setVisible] = useState(false);

  return <input type={visible ? 'text' : 'password'} defaultValue={value} />;
};

export default PasswordField;
