import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";

const ChatList = ({ setModalIsOpen }) => {
  const [scrolling, setScrolling] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const chatListRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(chatListRef.current);
      chatListRef.current = setTimeout(() => setScrolling(false), 2500);
    };

    const chatListElem = chatListRef.current;
    if (chatListElem) {
      chatListElem.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatListElem) {
        chatListElem.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const data = res.data();

        if (!data || !data.chats) {
          console.error("No chats data found");
          setChats([]);
          return;
        }

        const items = data.chats;

        try {
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();

            return { ...item, user };
          });

          const chatData = await Promise.all(promises);
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  return (
    <div
      ref={chatListRef}
      className={`flex flex-col items-center gap-2 overflow-y-scroll ${
        scrolling ? "scrollbar-showing" : "scrollbar-hidden"
      } scrollbar-custom w-full max-w-full`}
    >
      <div className="search flex gap-4 items-center w-full max-w-full px-2">
        <div className="search-bar flex-1 bg-[rgb(36,54,88)] opacity-50 flex items-center rounded-[10px] py-[5px] px-[7px] w-full max-w-full">
          <img
            src="./search.png"
            alt="search.png"
            className="w-[20px] h-[20px]"
          />
          <input
            type="text"
            name="search"
            className="bg-transparent outline-none border-none text-white h-[25px] placeholder:text-slate-200 placeholder:font-light placeholder:text-xs w-full"
            placeholder="Search"
          />
        </div>
        <img
          src="./plus.png"
          alt="Plus.png"
          className="w-[36px] h-[36px] bg-[rgb(36,54,88)] opacity-50 p-[10px] rounded-md cursor-pointer"
          onClick={() => {
            setModalIsOpen((prev) => !prev);
          }}
        />
      </div>
      {chats.map((chat, index) => (
        <div
          key={index}
          className="item w-full flex items-center gap-5 p-2 cursor-pointer border-b-[1px] border-[#dddddd35] bg-transparent"
        >
          <img
            src={chat.user.imgUrl || "./avatar.png"}
            alt="Avatar.png"
            className="w-[40px] h-[40px] ring-1 ring-gray-400 rounded-full"
          />
          <div className="texts flex flex-col gap-1">
            <span className="font-normal text-white text-[14px]">
              {chat?.user?.username || "Unknown User"}
            </span>
            <p className="font-normal text-white text-[11px]">
              {chat?.lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
