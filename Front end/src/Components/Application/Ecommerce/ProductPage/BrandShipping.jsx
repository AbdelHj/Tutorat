import React, { Fragment, useState, useEffect } from 'react';
import { H4, H5, LI, P, UL } from '../../../../AbstractElements';
import { Clock, CreditCard, Gift, Truck } from 'react-feather';
import { Card, CardBody } from 'reactstrap';

const BrandShipping = ({ productItem }) => {
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    productItem.map((item) => {
      setCourseName(item.name);
      return null;
    });
  });

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='filter-block'>
            <H4>{ courseName }</H4>
            <UL>
              <LI attrLI={{ className: 'border-0' }}>{'Beginner Friendly'}</LI>
              <LI attrLI={{ className: 'border-0' }}>{'Java'}</LI>
              <LI attrLI={{ className: 'border-0' }}>{'Programming'}</LI>
              <LI attrLI={{ className: 'border-0' }}>{'Programming Languages'}</LI>
            </UL>
          </div>
        </CardBody>
      </Card>

    </Fragment>
  );
};
export default BrandShipping;
