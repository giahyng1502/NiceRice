import { useEffect, useCallback } from 'react';
import { Conversation } from '../models/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {fetchConversation} from "../store/action/conversationAction";
import {useAppDispatch} from "./useAppDispatch";
import {fetchParticipants} from "../store/action/participantAction";

type UseConversationReturn = {
    conversations: Conversation[];
    loading: boolean;
    error: string | null;
    refresh: () => void;
};

export const useConversation = (): UseConversationReturn => {
    const dispatch = useAppDispatch();

    const conversations = useSelector((state: RootState) => state.conv.conversations);
    const loading = useSelector((state: RootState) => state.conv.loading);
    const error = useSelector((state: RootState) => state.conv.error);
    const participants = useSelector((state: RootState) => state.participant.participants);

    // Hàm fetch lại danh sách cuộc hội thoại
    const refresh = useCallback(() => {
        dispatch(fetchConversation());
        dispatch(fetchParticipants());
    }, [dispatch]);

    useEffect(() => {
        // Fetch lần đầu khi mount
        refresh();
    }, [refresh]);

    return { conversations, loading, error, refresh,participants };
};
