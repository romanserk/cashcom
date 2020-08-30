import React from 'react';
import useRTL, { RTLContext } from '../../common/hooks/useRTL';
import ModalManager from '../modal/ModalManager';

export default function App({ children }) {
  const [isRTL, setIsRTL] = useRTL();

  return (
    <RTLContext.Provider value={{ value: isRTL, setValue: setIsRTL }}>
      <div className="home-app">
        <div className="page-container">{children}</div>
      </div>
      <ModalManager />
    </RTLContext.Provider>
  );
}
