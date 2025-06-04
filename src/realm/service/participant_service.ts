import Realm from 'realm';

export const addParticipants = async (participants, realm: Realm) => {
  try {
    realm.write(() => {
      participants.forEach(participant => {
        realm.create(
          'ParticipantConversation',
          participant,
          Realm.UpdateMode.Modified,
        );
      });
    });
  } catch (error) {
    console.error('Error adding participants:', error);
  }
};

export const deleteParticipant = async (_id, realm) => {
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
