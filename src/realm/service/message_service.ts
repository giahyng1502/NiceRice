
import Realm from 'realm';
export const addMessage = async (message : any,realm : Realm | null) => {
  if (realm) {
      realm.write(() => {
          realm.create('Message', {
              message,
          });
      });
  }
};

export const saveMessages = async (messages : any,realm : Realm) => {
    try {
        if (realm) {
            realm.write(() => {
                messages.forEach((message : any) => {
                    // Nếu messageId trùng, Realm sẽ cập nhật (upsert) nếu bạn dùng create với option update: true
                    realm.create('Message', message, Realm.UpdateMode.Modified);
                });
            });        }

    } catch (error) {
        console.error('Error saving messages:', error);
    }
};
