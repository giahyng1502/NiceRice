import { io, Socket } from 'socket.io-client';

// Option type nếu muốn strict TypeScript cho event
interface ServerToClientEvents {
    receiveMessage: (data: any) => void;
    updateMessageStatus: (data: any) => void;
    // Thêm event server gửi về tại đây nếu cần
    receiveTyping: (data: { conversationId: string, userId: string }) => void;
}

interface ClientToServerEvents {
    sendMessage: (data: any) => void;
    sendTyping: (data: { conversationId: string, userId: string }) => void;
}

// Tạo instance socket
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://192.168.0.103:3000', {
    transports: ['websocket'], // Bắt buộc với React Native
    autoConnect: false, // Để chủ động connect qua middleware hoặc AppWrapper

});

export default socket;
