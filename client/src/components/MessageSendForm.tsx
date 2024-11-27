import { useAxios } from "../hooks/useAxios";
import { UPLOAD_FILE, validFileTypes } from "../utils/constants";
import { AttachmentIcon, FileIcon, SendIcon } from "./ui/Icons";
import { socket } from "../utils/socket";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useChatContext } from "../hooks/useChatContext";
import { toast } from "sonner";

export default function MessageSendForm() {
  const { fetchData } = useAxios();
  const { selectedUserData } = useChatContext();
  const { user } = useAuth();
  const [fileDisplay, setFileDisplay] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setMessage("");

    const file = e.target.files[0];
    setFileDisplay(file);

    if (!validFileTypes.includes(file.type)) {
      setFileDisplay(null);
      return toast.error("Invalid file type", { duration: 5000 });
    }
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", message);

    try {
      //Send file first if it exist
      if (fileDisplay) {
        formData.append("file", fileDisplay);
        formData.append("recipentId", selectedUserData?.id.toString() || "");

        const response = await fetchData({
          method: "POST",
          url: UPLOAD_FILE,
          data: formData,
        });

        socket.emit("sendMessage", {
          message: response.message,
          recipentId: selectedUserData?.id,
          type: "FILE",
          sentAt: new Date().toISOString(),
          isRead: false,
          senderId: user?.id,
        });
      }

      // Send text message if exist
      if (message.trim()) {
        socket.emit("sendMessage", {
          message,
          recipentId: selectedUserData?.id,
          type: "TEXT",
          sentAt: new Date().toISOString(),
          isRead: false,
          senderId: user?.id,
        });
      }

      setFileDisplay(null);
      setMessage("");
    } catch (error) {
      console.error("Error sending message or file:", error);
      toast.error("Failed to send message or upload file");
    }
  };
  return (
    <form className="flex items-center mt-4" onSubmit={sendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder={`${fileDisplay ? "" : "Type here..."}`}
          name="message"
          value={message}
          disabled={!!fileDisplay}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-light-blue p-3 rounded-xl pl-3 hover:outline-none focus:outline-none"
        />
        {fileDisplay && (
          <div className="absolute left-3 top-3 flex gap-2">
            <FileIcon />

            {fileDisplay.name}
          </div>
        )}
        <div className="absolute right-3 top-3 ">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            name="file"
            onChange={handleFileChange}
          />
          <AttachmentIcon
            onClick={() => document.getElementById("fileInput")?.click()}
          />
        </div>
      </div>
      <button
        type="submit"
        className="ml-2 p-3 bg-light-blue rounded-2xl cursor-pointer hover:bg-[#ecf1f5] duration-300 ease-out hover:scale-105"
      >
        <SendIcon />
      </button>
    </form>
  );
}
