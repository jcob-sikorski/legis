import { useState } from 'react';

import PitchCards from "./pitchCards";
import AddCustomDomain from './addCustomDomain';

function CustomDomainDeployment() {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && <PitchCards nextPage={() => setPage(1)} />}
      {page === 1 && <AddCustomDomain nextPage={setPage} />}
    </>
  );
};

export default CustomDomainDeployment;
