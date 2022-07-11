/* eslint-disable @welldone-software/modules-engagement */
import React, { useState, useCallback, lazy, Suspense } from 'react';
import '../../App.css';
import { Spinner } from '@harmonie/ui';
const EditPage = lazy(() => import('../EditPage'));
const MainPage = lazy(() => import('../MainPage'));

const SharePage = () => {
  const [selectedMail, setSelectedMail] = useState(null);
  const onBack = useCallback(() => setSelectedMail(null), []);
  return (
    <div className="App">
      <Suspense fallback={<Spinner label={'Loading...'} />}>
        {!selectedMail && <MainPage onSelectMail={setSelectedMail} selectedMail={selectedMail} />}
      </Suspense>
      <Suspense fallback={<Spinner label={'Loading...'} />}>
        {!!selectedMail && <EditPage selectedMail={selectedMail} onBack={onBack} />}
      </Suspense>
    </div>
  );
};

export default SharePage;
