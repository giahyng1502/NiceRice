
import Realm from 'realm';

export const addParticipants = async (participants,realm : Realm) => {
  try {
    realm.write(() => {
      participants.forEach(participant => {
        // Tạo _id kết hợp userId và conversationId
        const _id = `${participant.userId}_${participant.conversationId}`;

        // Gán _id cho participant
        const participantWithId = {
          ...participant,
          _id,
        };

        // upsert participant với _id
        realm.create(
          'ParticipantConversation',
          participantWithId,
          Realm.UpdateMode.Modified,
        );
      });
    });
  } catch (error) {
    console.error('Error adding participants:', error);
  }
};


export const deleteParticipant = async (_id,realm) => {
  try {
    realm.write(() => {
      const participant = realm.objectForPrimaryKey(
        'ParticipantConversation',
        _id,
      );
      if (participant) {
        realm.delete(participant);
      } else {
        console.warn('Participant to delete not found:', _id);
      }
    });
  } catch (error) {
    console.error('Error deleting participant:', error);
  }
};
