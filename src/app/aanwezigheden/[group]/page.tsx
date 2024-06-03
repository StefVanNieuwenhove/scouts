import React from 'react';

const page = ({ params }: { params: { group: string } }) => {
  return <div>page + {params.group}</div>;
};

export default page;
