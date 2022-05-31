import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import Add from './Add';

function AddNewPack() {
  const [edit, setEdit] = useState<boolean>(false);

  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) setEdit(true);
  }, [id]);
  return (
    <>
      <Helmet>
        <title>{edit ? 'Edit Categories' : 'New Categories'}</title>
      </Helmet>

      <Container maxWidth="xl">
        <Add id={id} editMode={edit}></Add>
      </Container>
    </>
  );
}

export default AddNewPack;
