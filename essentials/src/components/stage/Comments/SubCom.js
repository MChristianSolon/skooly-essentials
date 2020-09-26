import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function SubCom({ user, comment }) {
  return (
    <>
      <Card style={{ width: '100%' }} variant="elevation">
        <CardContent>{`${user}: ${comment}`}</CardContent>
      </Card>
    </>
  );
}

export default SubCom;
