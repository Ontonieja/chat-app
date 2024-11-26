import { DownloadIcon } from "./Icons";

interface FileContentProps {
  messageContent: string;
  otherUser: boolean;
}

export default function FileContent({
  messageContent,
  otherUser,
}: FileContentProps) {
  const isFilePdf = messageContent.endsWith(".pdf");
  const fileName = messageContent.split("/").pop();

  const userFileClass = otherUser ? "!text-primary-blue" : "!text-white";
  if (isFilePdf) {
    return (
      <div className="py-3 px-4 max-w-[400px]">
        <a
          href={messageContent}
          className="flex gap-4 items-center "
          download={fileName || "download"}
          target="_blank"
        >
          <DownloadIcon className={`${userFileClass} size-6 `} />
          <p
            className={`truncate font-medium ${
              otherUser ? "text-primary-blue" : "text-white"
            }`}
          >
            {fileName}
          </p>
        </a>
      </div>
    );
  } else {
    return (
      <div className="p-2 max-w-[260px] ">
        <a href={messageContent} target="_blank">
          <img
            src={messageContent}
            className="rounded-xl hover:scale-[102%] ease-out duration-300"
          ></img>
        </a>
      </div>
    );
  }
}
