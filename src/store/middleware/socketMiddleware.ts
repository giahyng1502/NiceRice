import {MiddlewareAPI, Dispatch} from '@reduxjs/toolkit';
import socket from '../../config/socket/socketClient';
import {getRealm} from '../../realm/realm';
import {addMessageRedux, onMessageFromSocket} from '../reducers/messageSlice';
import {addMessage} from '../../realm/service/message_service';
import {
    increaseUnreadCount,
    updateConversation,
} from '../reducers/conversationSlice';
import {addConversation} from '../../realm/service/conversation_service';
export const SEND_SOCKET_EVENT = 'socket/SEND_SOCKET_EVENT';

export function setupSocketListeners(store: MiddlewareAPI) {
    socket.off('receiveMessage').on('receiveMessage', data => {
        const state = store.getState();
        const currentConversationId = state.message.currentConversationId;

        console.log(
            `Current: ${currentConversationId} - Received: ${data.conversationId}`
        );

        // Thêm message vào redux
        store.dispatch(onMessageFromSocket(data));

        // Nếu message không phải ở cuộc trò chuyện đang mở
        if (currentConversationId !== data.conversationId) {
            store.dispatch(increaseUnreadCount(data.conversationId));

        }

        // Cập nhật conversation preview + thời gian
        store.dispatch(
            updateConversation({
                conversationId: data.conversationId,
                lastMessagePreview: data.content,
                lastUpdatedAt: data.createdAt,
            })
        );

        // Lưu Realm
        try {
            const realm = getRealm();
            addMessage(data, realm);
            addConversation(
                {
                    conversationId: data.conversationId,
                    lastMessagePreview: data.content,
                    lastUpdatedAt: data.createdAt,
                },
                realm
            );
        } catch (error) {
            console.error('Realm chưa được mở:', error);
        }
    });
}


const socketMiddleware: any = (store: MiddlewareAPI) => {
    // Lắng nghe sự kiện server trả về
    setupSocketListeners(store);

    // Middleware trả về hàm xử lý action
    return (next: Dispatch) => (action: any) => {
        if (action.type === SEND_SOCKET_EVENT) {
            const {event, data} = action.payload;

            // dispatch message vào redux
            store.dispatch(addMessageRedux(data));

            // dispatch update conv vào redux
            store.dispatch(
                updateConversation({
                    conversationId: data.conversationId,
                    lastMessagePreview: data.content,
                    lastUpdatedAt: data.createdAt,
                }),
            );

            // gửi socket lên server
            socket.emit(event, data);

            // lưu vào realm
            try {
                const realm = getRealm();
                addMessage(data, realm);
                addConversation(
                    {
                        conversationId: data.conversationId,
                        lastMessagePreview: data.content,
                        lastUpdatedAt: data.createdAt,
                    },
                    realm,
                );
            } catch (error) {
                console.error('Realm chưa được mở:', error);
            }
        }

        return next(action);
    };
};

export default socketMiddleware;
