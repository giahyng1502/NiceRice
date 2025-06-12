import Realm from 'realm';
import {Conversation} from '../../store/reducers/conversationSlice';

export const saveConv = (
  conversations: Conversation[],
  realm: Realm | null,
) => {
  try {
    console.log('saveConv');
    if (realm && conversations.length > 0) {
      realm.write(() => {
        conversations.forEach((conversation: Conversation) => {
          realm.create('Conversation', conversation, Realm.UpdateMode.Modified);
        });
      });
      console.log('Conversation saved successfully.');
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
  }

};
export const addConversation = (
  conversation: Conversation | any,
  realm: Realm | null,
) => {
  try {
    if (realm) {
      realm.write(() => {
        realm.create('Conversation', conversation, Realm.UpdateMode.Modified);
      });


    }
  } catch (e) {
    console.error('Error add conversation:', e);
  }
};
