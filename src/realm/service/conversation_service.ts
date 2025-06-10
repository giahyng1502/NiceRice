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
    console.error('Error saving messages:', error);
  }

};
export const addConversation = (
  conversation: Conversation | any,
  realm: Realm | null,
) => {
  try {
    if (realm) {

      const allConvs = realm.objects('Conversation');
      console.log('Tất cả conv trong realm:', Array.from(allConvs));
      console.log(allConvs)
      realm.write(() => {
        realm.create('Conversation', conversation, Realm.UpdateMode.Modified);
      });


    }
  } catch (e) {
    console.error('Error saving conversation:', e);
  }
};
