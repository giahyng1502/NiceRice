import Realm from 'realm';
export const addMessage = (message: any, realm: Realm | null) => {
  if (realm) {
    realm.write(() => {
      realm.create('Message', message, Realm.UpdateMode.Modified);
    });

  }
};

export const saveMessages = async (messages: any[], realm: Realm) => {
    try {
        if (realm && messages.length > 0) {
            realm.write(() => {
                messages.forEach((message: any) => {
                    // Upsert message theo messageId
                    console.log(message.link)

                    realm.create("Message", message, Realm.UpdateMode.Modified);
                });
            });
        }
    } catch (error) {
        console.error("Error saving messages:", error);
    }
};

