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


export const deleteAllConversations = (): void => {
    try {
        if (!realmInstance || realmInstance.isClosed) {
            throw new Error('❌ Realm is not open. Call openRealm() first.');
        }

        realmInstance.write(() => {
            const allConversations = realmInstance!.objects('Conversation');
            realmInstance!.delete(allConversations);
        });

        console.log('🗑️ Tất cả Conversation đã được xoá.');
    } catch (error) {
        console.error('❌ Lỗi khi xoá Conversation:', error);
    }
};
