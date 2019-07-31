export class ChatMessage {
    $key?: string;
    userEmail?: string;
    userName?: string;
    message?: string;
    timeSent?: Date = new Date();
}
