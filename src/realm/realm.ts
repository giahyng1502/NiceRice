import Realm from 'realm';
import { MessageSchema } from './schema/MessageSchema';
import { ParticipantConversationSchema } from './schema/participentSchema';
import {conversationSchema} from "./schema/ConversationSchema";

let realmInstance: Realm | null = null;

export const openRealm = async () => {
    if (realmInstance) {
        return realmInstance;
    }
    console.log('🔌 Opening Realm...');
    realmInstance = await Realm.open({
        schema: [MessageSchema, ParticipantConversationSchema,conversationSchema],
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
