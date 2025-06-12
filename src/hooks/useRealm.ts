import {useContext} from "react";
import {RealmContext} from "../provider/RealmProvider";

export const useRealmReady = () => useContext(RealmContext);
