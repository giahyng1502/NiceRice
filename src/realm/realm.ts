import Realm from 'realm';
import { MessageSchema } from './schema/MessageSchema';
import { ParticipantConversationSchema } from './schema/participentSchema';

export const getRealm = async () => {
    console.log('Opening Realm...');
    return Realm.open({
        schema: [MessageSchema, ParticipantConversationSchema],
        schemaVersion: 1,
    });
};
