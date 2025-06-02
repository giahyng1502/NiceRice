import Realm from 'realm';
import { MessageSchema } from './schema/MessageSchema';
import { ParticipantConversationSchema } from './schema/participentSchema';

let realmInstance: Realm | null = null;

export const openRealm = async () => {
    if (realmInstance) {
        return realmInstance;
    }
    console.log('🔌 Opening Realm...');
    realmInstance = await Realm.open({
        schema: [MessageSchema, ParticipantConversationSchema],
        schemaVersion: 1,
    });
    return realmInstance;
};

export const getRealm = (): Realm => {
    if (!realmInstance) {
        throw new Error('Realm has not been initialized. Call openRealm() first.');
    }
    return realmInstance;
};

export const closeRealm = () => {
    if (realmInstance && !realmInstance.isClosed) {
        realmInstance.close();
        console.log('🛑 Realm closed');
    }
    realmInstance = null;
};
