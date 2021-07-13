import { useEffect, useState } from 'react';
import { calendarApi } from 'api/calendarApi';
import Menu from 'Containers/Menu/Menu';
import Main from 'Containers/Main/Main';
import getDate from 'module/getDate';
import { useRecoilValue } from 'recoil';
import { userState } from 'state/state';

const Index = () => {
  return (
    <>
      <Menu />
      <Main />
    </>
  );
};

export default Index;
