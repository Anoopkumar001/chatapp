const MessageBubble = ({ message, isOwnMessage }) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
          isOwnMessage
            ? "bg-primary text-white rounded-br-sm"
            : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-sm"
        }`}
      >
        <p className="break-words">{message.text}</p>
        <p
          className={`text-[10px] mt-1 ${
            isOwnMessage ? "text-indigo-100" : "text-slate-400 dark:text-slate-400"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
