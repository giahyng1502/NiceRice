import { useEffect, useState } from 'react';
import Realm from "realm";
import axiosClient from "../apis/axios";
import { addParticipants } from "../realm/service/participant_service";
import {useRealm} from "../provider/RealmProvider";

export type Participant = {
    _id: string;
    userId: string;
    fullName: string;
    avatarUrl: string;
    seenDateTime?: Date;
    conversationId: string;
    isAdmin : boolean;
};

export const useParticipantsListener = (conversationId: string | null) => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const realmInstance = useRealm();


    // Lắng nghe thay đổi participants theo conversationId, load data local trước
    useEffect(() => {
        if (!realmInstance || !conversationId) return;

        const filteredParticipants = realmInstance
            .objects<Participant>('ParticipantConversation')
            .filtered('conversationId == $0',conversationId);

        // Load dữ liệu local đầu tiên
        setParticipants([...filteredParticipants]);

        // Add listener để tự động cập nhật khi dữ liệu Realm thay đổi
        const listenerCallback = (collection: Realm.Results<Participant>, changes: Realm.CollectionChangeSet) => {
            setParticipants([...collection]);
        };

        filteredParticipants.addListener(listenerCallback);

        return () => {
            if (!realmInstance.isClosed && filteredParticipants && filteredParticipants.removeListener) {
                filteredParticipants.removeListener(listenerCallback);
            }
        };
    }, [realmInstance, conversationId]);

    // Sau khi đã load local, gọi API để cập nhật dữ liệu mới từ server
    useEffect(() => {
        if (!conversationId) return;

        const fetchParticipantFromApi = async () => {
            try {
                const res = await axiosClient.get('/conversation/participant', {
                    params: { conversationId },
                });

                if (res && res.users) {
                    // Lưu dữ liệu mới vào Realm, sẽ tự động cập nhật state nhờ listener ở effect trên
                    await addParticipants(res.users,realmInstance);
                }
            } catch (error) {
                console.log('Fetch API participant lỗi:', error);
            }
        };

        fetchParticipantFromApi();
    }, [conversationId]);

    return participants;
};
