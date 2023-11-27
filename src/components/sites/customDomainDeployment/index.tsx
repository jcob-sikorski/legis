import { useEffect, useState } from 'react';
import axios from 'axios';

import * as Realm from "realm-web";
import { useApp } from "./../../RealmApp";

import PitchCards from "./pitchCards";
import AddCustomDomain from './addCustomDomain';
import ConnectDomain from './connectDomain';
import AddSiteDetails from './addSiteDetails';

function CustomDomainDeployment() {
  const [page, setPage] = useState(-1);

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const user_collection = mongodb.db("legis").collection("User");

  // React component
  useEffect(() => {
    const checkSubscription = async () => {
      const res = await user_collection.findOne(
        { _id: new Realm.BSON.ObjectId(app.currentUser!.id) }
      );

      const { data } = await axios.get(`${import.meta.env.DEV ? "http://localhost:4242" : "https://legis-cors-anywhere-xmo76.ondigitalocean.app/http://api.legis.live"}/check-subscription`, {
        params: { email: res.email }
      });
      setPage(data.hasActiveSubscription ? 1 : 0);
    };

    checkSubscription();
  }, []);


  return (
    <>
      {page === -1 && null}
      {page === 0 && <PitchCards nextPage={() => setPage(1)} />}
      {page === 1 && <AddCustomDomain nextPage={() => setPage(2)} />}
      {page === 2 && <ConnectDomain nextPage={() => setPage(3)} />}
      {page === 3 && <AddSiteDetails/>}
    </>
  );
};

export default CustomDomainDeployment;
