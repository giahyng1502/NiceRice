import { io, Socket } from 'socket.io-client';
import {Conversation, TypingState} from "../../store/reducers/conversationSlice";
import {API_BASE_URL} from "../../apis/axios";

// Option type nếu muốn strict TypeScript cho event
interface ServerToClientEvents {
    receiveMessage: (data: any) => void;
    updateMessageStatus: (data: any) => void;
    receiveTyping: (typing: TypingState) => void;
    stop_typing: (typing: TypingState) => void;
    memberOnline: (userIds : number[]) => void;
    newConversation : (conversationId : string) => void;
}

interface ClientToServerEvents {
    sendMessage: (data: any) => void;
    sendTyping: (conversationId : string) => void;
    stop_typing: (conversationId : string) => void;
    joinConversation: (conversationId : string) => void;
    createConversation: (conversation : any) => void;
}

// Tạo instance socket
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_BASE_URL, {
    transports: ['websocket'], // Bắt buộc với React Native
    autoConnect: false, // Để chủ động connect qua middleware hoặc AppWrapper

});

export default socket;
