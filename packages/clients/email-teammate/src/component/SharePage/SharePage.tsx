import { useReactiveVar, appContextVar } from '@harmonie/services';
import { Spinner } from '@harmonie/ui';
import React, { useState, useCallback, lazy, Suspense, FunctionComponent } from 'react';
const EditPage = lazy(() => import('../EditPage'));
const MainPage = lazy(() => import('../MainPage'));

interface SharedPageProps {}

const SharePage: FunctionComponent<SharedPageProps> = () => {
  const [selectedMail, setSelectedMail] = useState<{ [key: string]: any } | null>(null);
  const { user } = useReactiveVar(appContextVar);
  const onBack = useCallback(() => setSelectedMail(null), []);

  return (
    <div className="App">
      <>
        <Suspense fallback={<Spinner label={'Loading...'} />}>
          {user && <MainPage onSelectMail={setSelectedMail} selectedMail={selectedMail} />}
        </Suspense>
        <Suspense fallback={<></>}>
          <EditPage selectedMail={selectedMail} onBack={onBack} />
        </Suspense>
      </>
    </div>
  );
};

export default SharePage;
