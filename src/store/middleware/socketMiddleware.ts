import { MiddlewareAPI, Dispatch } from '@reduxjs/toolkit';
import socket from "../../config/socket/socketClient";
import { getRealm } from "../../realm/realm";
import { addMessage } from "../../realm/service/message_service";

export const SEND_SOCKET_EVENT = 'socket/SEND_SOCKET_EVENT';

const socketMiddleware: any = (store: MiddlewareAPI) => {
    // Lắng nghe sự kiện server trả về
    socket.on('receiveMessage', (data) => {
        store.dispatch({ type: 'message/receiveMessage', payload: data });

        try {
            const realm = getRealm();
            addMessage(data, realm);
        } catch (error) {
            console.error('Realm chưa được mở:', error);
        }
    });

    // Middleware trả về hàm xử lý action
    return (next: Dispatch) => (action: any) => {
        if (action.type === SEND_SOCKET_EVENT) {
            const { event, data } = action.payload;
            socket.emit(event, data);

            // Nếu bạn muốn lưu luôn local message khi gửi
            try {
                const realm = getRealm();
                addMessage(data, realm);
            } catch (error) {
                console.error('Realm chưa được mở:', error);
            }
        }

        return next(action);
    };
};


export default socketMiddleware;
