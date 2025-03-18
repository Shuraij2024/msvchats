// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { fetchMessages, sendMessage, updateMessage, deleteMessage, Message } from "../../api/products";
// import { FaPaperPlane, FaEdit, FaTrash } from "react-icons/fa";

// const Productlist: React.FC = () => {
//   const [input, setInput] = useState<string>("");
//   const [editId, setEditId] = useState<number | null>(null);
//   const [editText, setEditText] = useState<string>("");
//   const queryClient = useQueryClient();

//   // Fetch messages once on load
//   const { data: messages = [], isLoading } = useQuery<Message[]>({
//     queryKey: ["messages"],
//     queryFn: fetchMessages,
//     // No refetchInterval, fetch only once
//   });

//   // Send message
//   const sendMessageMutation = useMutation({
//     mutationFn: sendMessage,
//     onSuccess: (newMessage) => {
//       queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
//         old ? [...old, newMessage] : [newMessage]
//       );
//     },
//   });

//   // Update message
//   const updateMessageMutation = useMutation({
//     mutationFn: ({ id, message }: { id: number; message: { text: string; sender: string } }) =>
//       updateMessage(id, message),
//     onSuccess: (updatedMessage) => {
//       queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
//         old ? old.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)) : [updatedMessage]
//       );
//       setEditId(null);
//       setEditText("");
//     },
//   });

//   // Delete message
//   const deleteMessageMutation = useMutation({
//     mutationFn: deleteMessage,
//     onSuccess: (_, id) => {
//       queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
//         old ? old.filter((msg) => msg.id !== id) : []
//       );
//     },
//   });

//   const handleSend = () => {
//     if (input.trim() === "" || sendMessageMutation.isPending) return;
//     sendMessageMutation.mutate({ text: input, sender: "user" });
//     setInput("");
//   };

//   const handleEdit = (msg: Message) => {
//     setEditId(msg.id);
//     setEditText(msg.text);
//   };

//   const handleUpdate = () => {
//     if (editText.trim() === "" || !editId) return;
//     updateMessageMutation.mutate({ id: editId, message: { text: editText, sender: "user" } });
//   };

//   const handleDelete = (id: number) => {
//     deleteMessageMutation.mutate(id);
//   };

//   return (
//     <>
//       <div className="product-list">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           messages.map((msg) => (
//             <div key={msg.id} className={`message ${msg.sender}`}>
//               {editId === msg.id ? (
//                 <input
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
//                   autoFocus
//                 />
//               ) : (
//                 <>
//                   <span>{msg.text}</span>
//                   <span className="timestamp">
//                     {new Date(msg.timestamp).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>
//                   {msg.sender === "user" && (
//                     <div className="actions">
//                       <button onClick={() => handleEdit(msg)}>
//                         <FaEdit />
//                       </button>
//                       <button onClick={() => handleDelete(msg.id)}>
//                         <FaTrash />
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type a message..."
//           disabled={sendMessageMutation.isPending}
//         />
//         <button onClick={handleSend} disabled={sendMessageMutation.isPending}>
//           <FaPaperPlane />
//         </button>
//       </div>
//     </>
//   );
// };

// export default Productlist;



// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { fetchMessages, sendMessage, updateMessage, deleteMessage, Message } from "../../api/products";
// import { FaPaperPlane, FaEdit, FaTrash } from "react-icons/fa";
// import io from "socket.io-client";

// const socket = io("http://192.168.1.64:3000"); // Replace with your backend IP

// const Productlist: React.FC = () => {
//   const [input, setInput] = useState<string>("");
//   const [editId, setEditId] = useState<number | null>(null);
//   const [editText, setEditText] = useState<string>("");
//   const queryClient = useQueryClient();

//   useQuery<Message[]>({
//     queryKey: ["messages"],
//     queryFn: fetchMessages,
//   });

//   useEffect(() => {
//     socket.on("message", (newMessage: Message) => {
//       queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
//         old ? [...old, newMessage] : [newMessage]
//       );
//     });
//     return () => {
//       socket.off("message");
//     };
//   }, [queryClient]);

//   const sendMessageMutation = useMutation({
//     mutationFn: sendMessage,
//     onSuccess: (newMessage) => {
//       socket.emit("message", newMessage); // Send to server for broadcast
//     },
//   });

//   const updateMessageMutation = useMutation({
//     mutationFn: ({ id, message }: { id: number; message: { text: string; sender: string } }) =>
//       updateMessage(id, message),
//     onSuccess: (updatedMessage) => {
//       queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
//         old ? old.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)) : [updatedMessage]
//       );
//       setEditId(null);
//       setEditText("");
//     },
//   });

//   const deleteMessageMutation = useMutation({
//     mutationFn: deleteMessage,
//     onSuccess: (_, id) => {
//       queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
//         old ? old.filter((msg) => msg.id !== id) : []
//       );
//     },
//   });

//   const handleSend = () => {
//     if (input.trim() === "" || sendMessageMutation.isPending) return;
//     sendMessageMutation.mutate({ text: input, sender: "user" });
//     setInput("");
//   };

//   const handleEdit = (msg: Message) => {
//     setEditId(msg.id);
//     setEditText(msg.text);
//   };

//   const handleUpdate = () => {
//     if (editText.trim() === "" || !editId) return;
//     updateMessageMutation.mutate({ id: editId, message: { text: editText, sender: "user" } });
//   };

//   const handleDelete = (id: number) => {
//     deleteMessageMutation.mutate(id);
//   };

//   const messages = queryClient.getQueryData<Message[]>(["messages"]) || [];

//   return (
//     <>
//       <div className="product-list">
//         {messages.length === 0 ? (
//           <p>No messages yet</p>
//         ) : (
//           messages.map((msg) => (
//             <div key={msg.id} className={`message ${msg.sender}`}>
//               {editId === msg.id ? (
//                 <input
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
//                   autoFocus
//                 />
//               ) : (
//                 <>
//                   <span>{msg.text}</span>
//                   <span className="timestamp">
//                     {new Date(msg.timestamp).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>
//                   {msg.sender === "user" && (
//                     <div className="actions">
//                       <button onClick={() => handleEdit(msg)}>
//                         <FaEdit />
//                       </button>
//                       <button onClick={() => handleDelete(msg.id)}>
//                         <FaTrash />
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//       <div className="input-area">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type a message..."
//           disabled={sendMessageMutation.isPending}
//         />
//         <button onClick={handleSend} disabled={sendMessageMutation.isPending}>
//           <FaPaperPlane />
//         </button>
//       </div>
//     </>
//   );
// };

// export default Productlist;


import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMessages, sendMessage, updateMessage, deleteMessage, Message } from "../../api/products";
import { FaPaperPlane, FaEdit, FaTrash } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("http://192.168.1.64:3000"); // Replace with your backend IP

const Productlist: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);
  const queryClient = useQueryClient();

  // Original useQuery with refetch
  const { data: messages = [], refetch } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Original WebSocket listener
  useEffect(() => {
    socket.on("message", (newMessage: Message) => {
      queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
        old ? [...old, newMessage] : [newMessage]
      );
    });
    return () => {
      socket.off("message");
    };
  }, [queryClient]);

  // Original sendMessageMutation with refetch
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      socket.emit("message", newMessage); // Send to server for broadcast
      refetch(); // Refetch all messages from backend when send is clicked
    },
  });

  // Original updateMessageMutation
  const updateMessageMutation = useMutation({
    mutationFn: ({ id, message }: { id: number; message: { text: string; sender: string } }) =>
      updateMessage(id, message),
    onSuccess: (updatedMessage) => {
      queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
        old ? old.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)) : [updatedMessage]
      );
      setEditId(null);
      setEditText("");
    },
  });

  // Original deleteMessageMutation
  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
        old ? old.filter((msg) => msg.id !== id) : []
      );
    },
  });

  // New mutation for clearing selected messages
  const clearMessagesMutation = useMutation({
    mutationFn: (ids: number[]) => Promise.all(ids.map(id => deleteMessage(id))),
    onSuccess: () => {
      queryClient.setQueryData(["messages"], (old: Message[] | undefined) =>
        old ? old.filter((msg) => !selectedMessageIds.includes(msg.id)) : []
      );
      setSelectedMessageIds([]); // Clear selection after deletion
    },
  });

  // Original handleSend
  const handleSend = () => {
    if (input.trim() === "" || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate({ text: input, sender: "user" });
    setInput("");
  };

  // Original handleEdit
  const handleEdit = (msg: Message) => {
    setEditId(msg.id);
    setEditText(msg.text);
  };

  // Original handleUpdate
  const handleUpdate = () => {
    if (editText.trim() === "" || !editId) return;
    updateMessageMutation.mutate({ id: editId, message: { text: editText, sender: "user" } });
  };

  // Original handleDelete
  const handleDelete = (id: number) => {
    deleteMessageMutation.mutate(id);
  };

  // New handler for toggling message selection
  const handleSelectMessage = (id: number) => {
    setSelectedMessageIds((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  // New handler for clearing selected messages
  const handleClearChats = () => {
    if (selectedMessageIds.length === 0 || clearMessagesMutation.isPending) return;
    clearMessagesMutation.mutate(selectedMessageIds);
  };

  // New handlers for toolbar actions
  const handleSelectAll = () => {
    setSelectedMessageIds(messages.map((msg) => msg.id));
  };

  const handleUnselectAll = () => {
    setSelectedMessageIds([]);
  };

  const handleCancel = () => {
    setSelectedMessageIds([]);
  };

  const handleShare = async () => {
    const selectedMessages = messages.filter((msg) => selectedMessageIds.includes(msg.id));
    const textToShare = selectedMessages.map((msg) => `${msg.sender}: ${msg.text}`).join("\n");
    try {
      await navigator.clipboard.writeText(textToShare);
      alert("Selected messages copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      alert("Failed to copy messages. Check console for details.");
    }
  };

  return (
    <>
      {selectedMessageIds.length > 0 && (
        <div className="selection-toolbar">
          <button onClick={handleSelectAll}>Select All</button>
          <button onClick={handleUnselectAll}>Unselect All</button>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleShare}>Share</button>
        </div>
      )}
      <div className="product-list">
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {editId === msg.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
                  autoFocus
                />
              ) : (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedMessageIds.includes(msg.id)}
                      onChange={() => handleSelectMessage(msg.id)}
                    />
                    <span>{msg.text}</span>
                  </label>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {msg.sender === "user" && (
                    <div className="actions">
                      <button onClick={() => handleEdit(msg)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(msg.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          disabled={sendMessageMutation.isPending}
        />
        <button onClick={handleSend} disabled={sendMessageMutation.isPending}>
          <FaPaperPlane />
        </button>
        <button
          onClick={handleClearChats}
          disabled={selectedMessageIds.length === 0 || clearMessagesMutation.isPending}
        >
          Clear Chats
        </button>
      </div>
    </>
  );
};

export default Productlist;