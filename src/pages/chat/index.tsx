import { useEffect, useState } from "react";
import ChatLog from "./chat-log";
import ChatSelector from "./chat-selector";
import { Chat } from "@/classes/Chat";
import { getChat, saveNewChat, updateChat } from "@/api/dbapi";
import { getActiveConstructList } from "@/api/constructapi";

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState<string | null>(null);

    useEffect(() => {
        getChat('activePool').then((chat) => {
            if(chat === null) throw new Error("Chat not found");
            getActiveConstructList().then((constructs) => {
                chat.constructs = constructs;
                chat.name = "Active Constructs";
                chat.global = true;
                chat.doVector = true;
                updateChat(chat).then(() => {
                    console.log("Updated active chat");
                }).catch((err) => {
                    console.error(err);
                });
            }).catch((err) => {
                console.error(err);
            });
        }).catch((err) => {
            const newChat = new Chat("activePool");
            newChat.name = "Active Constructs";
            newChat.doVector = true;
            newChat.global = true;
            getActiveConstructList().then((constructs) => {
                newChat.constructs = constructs;
                saveNewChat(newChat).then(() => {
                    console.log("Updated active chat");
                }).catch((err) => {
                    console.error(err);
                });
            }).catch((err) => {
                console.error(err);
            });
        });
    }, []);

    const handleChatSelect = (chat: Chat) => {
        setSelectedChat(chat._id);
    }

    const goBack = () => {
        setSelectedChat(null);
    }

    return (
        <>
            {selectedChat !== null ? (<ChatLog chatLogID={selectedChat} goBack={goBack}/>) : (<ChatSelector onClick={handleChatSelect}/>)}
        </>
    )
}

export default ChatPage;