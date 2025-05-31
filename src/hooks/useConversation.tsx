import { useEffect, useCallback } from 'react';
import { Conversation } from '../models/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {fetchConversation} from "../store/action/conversationAction";
import {useAppDispatch} from "./useAppDispatch";

type UseConversationReturn = {
    conversations: Conversation[];
    loading: boolean;
    error: string | null;
    refresh: () => void;
};

export const useConversation = (): {
    conversations: any;
    loading: any;
    error: any;
    refresh: () => void;
} => {
    const dispatch = useAppDispatch();

    const conversations = useSelector((state: RootState) => state.conv.conversations);
    const loading = useSelector((state: RootState) => state.conv.loading);
    const error = useSelector((state: RootState) => state.conv.error);

    // Hàm fetch lại danh sách cuộc hội thoại
    const refresh = useCallback(() => {
        dispatch(fetchConversation());
    }, [dispatch]);

    useEffect(() => {
        // Fetch lần đầu khi mount
        refresh();
    }, [refresh]);

    return { conversations, loading, error, refresh };
};
