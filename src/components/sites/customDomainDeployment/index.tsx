import { useState } from 'react';

import PitchCards from "./pitchCards";
import AddCustomDomain from './addCustomDomain';
import ConnectDomain from './connectDomain';
import AddSiteDetails from './addSiteDetails';

function CustomDomainDeployment() {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && <PitchCards nextPage={() => setPage(1)} />}
      {page === 1 && <AddCustomDomain nextPage={() => setPage(2)} />}
      {page === 2 && <ConnectDomain nextPage={() => setPage(3)} />}
      {page === 3 && <AddSiteDetails/>}
    </>
  );
};

export default CustomDomainDeployment;
