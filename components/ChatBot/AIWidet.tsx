// // AIWidget.jsx
// import React, { useState, useRef, useEffect } from 'react';

// // /**
// //  * AIWidget - A reusable component for integrating AI capabilities into any application
// //  *
// //  * @param {Object} props
// //  * @param {string} props.apiKey - Your AI service API key
// //  * @param {string} props.endpoint - API endpoint for AI service
// //  * @param {Function} props.onMessage - Callback function when a message is received
// //  * @param {string} props.placeholder - Placeholder text for the input field
// //  * @param {string} props.theme - Theme for the widget ('light' or 'dark')
// //  * @param {boolean} props.expandable - Whether the widget can be expanded/collapsed
// //  * @param {boolean} props.defaultExpanded - Default expanded state
// //  */

// const AIWidget = ({
//     apiKey = '',
//     endpoint = 'https://api.example.com/v1/chat',
//     onMessage = () => { },
//     placeholder = 'Ask me anything...',
//     // theme = 'light',
//     expandable = true,
//     defaultExpanded = false,
// }: any) => {
//     const [expanded, setExpanded] = useState(defaultExpanded);
//     const [inputValue, setInputValue] = useState('');
//     const [messages, setMessages] = useState<any>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const messagesEndRef = useRef<any>(null);

//     // Styles based on theme
//     //     const styles = {
//     //         container: {
//     //             position: 'fixed',
//     //             bottom: expanded ? '20px' : '10px',
//     //             right: '20px',
//     //             width: expanded ? '350px' : '60px',
//     //             backgroundColor: theme === 'light' ? '#ffffff' : '#2d2d2d',
//     //             borderRadius: '12px',
//     //             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//     //             transition: 'all 0.3s ease',
//     //             overflow: 'hidden',
//     //             display: 'flex',
//     //             flexDirection: 'column',
//     //             zIndex: 1000,
//     //             border: 1px solid ${ theme === 'light' ? '#e0e0e0' : '#444'
//     // }
//     // header: {
//     //     padding: '12px 16px',
//     //         display: 'flex',
//     //             justifyContent: 'space-between',
//     //                 alignItems: 'center',
//     //                     borderBottom: 1px solid ${ theme === 'light' ? '#f0f0f0' : '#444' },
//     // },
//     // title: {
//     //     margin: 0,
//     //         fontSize: '16px',
//     //             fontWeight: 600,
//     //                 color: theme === 'light' ? '#333' : '#fff',
//     //     },
//     // toggleButton: {
//     //     background: 'none',
//     //         border: 'none',
//     //             cursor: 'pointer',
//     //                 color: theme === 'light' ? '#666' : '#ccc',
//     //     },
//     // messagesContainer: {
//     //     display: expanded ? 'flex' : 'none',
//     //         flexDirection: 'column',
//     //             height: '250px',
//     //                 overflowY: 'auto',
//     //                     padding: '12px',
//     //     },
//     // message: {
//     //     padding: '8px 12px',
//     //         borderRadius: '8px',
//     //             marginBottom: '8px',
//     //                 maxWidth: '80%',
//     //                     wordBreak: 'break-word',
//     //     },
//     // userMessage: {
//     //     backgroundColor: theme === 'light' ? '#e1f5fe' : '#01579b',
//     //         color: theme === 'light' ? '#01579b' : '#fff',
//     //             alignSelf: 'flex-end',
//     //     },
//     // aiMessage: {
//     //     backgroundColor: theme === 'light' ? '#f5f5f5' : '#424242',
//     //         color: theme === 'light' ? '#333' : '#eee',
//     //             alignSelf: 'flex-start',
//     //     },
//     // inputContainer: {
//     //     display: expanded ? 'flex' : 'none',
//     //         padding: '12px',
//     //             borderTop: 1px solid ${ theme === 'light' ? '#f0f0f0' : '#444' },
//     // },
//     // input: {
//     //     flex: 1,
//     //         padding: '8px 12px',
//     //             borderRadius: '20px',
//     //                 border: 1px solid ${ theme === 'light' ? '#e0e0e0' : '#555' },
//     //     outline: 'none',
//     //         backgroundColor: theme === 'light' ? '#fff' : '#333',
//     //             color: theme === 'light' ? '#333' : '#fff',
//     //     },
//     // sendButton: {
//     //     marginLeft: '8px',
//     //         padding: '8px 12px',
//     //             backgroundColor: '#4caf50',
//     //                 color: '#fff',
//     //                     border: 'none',
//     //                         borderRadius: '20px',
//     //                             cursor: 'pointer',
//     //     },
//     // collapsedButton: {
//     //     width: '60px',
//     //         height: '60px',
//     //             borderRadius: '50%',
//     //                 display: expanded ? 'none' : 'flex',
//     //                     justifyContent: 'center',
//     //                         alignItems: 'center',
//     //                             backgroundColor: '#4caf50',
//     //                                 color: '#fff',
//     //                                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//     //                                         cursor: 'pointer',
//     //     },
//     // loadingIndicator: {
//     //     display: 'flex',
//     //         justifyContent: 'center',
//     //             alignItems: 'center',
//     //                 padding: '10px',
//     //     },
//     // error: {
//     //     color: '#f44336',
//     //         padding: '8px 12px',
//     //             backgroundColor: theme === 'light' ? '#ffebee' : '#4a1e1c',
//     //                 borderRadius: '4px',
//     //                     margin: '8px 0',
//     //     }
//     //   };

//     // Scroll to bottom when messages change
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     // Handle sending a message
//     const handleSendMessage = async () => {
//         if (!inputValue.trim()) return;

//         const userMessage = { type: 'user', content: inputValue };
//         setMessages([...messages, userMessage]);
//         setInputValue('');
//         setIsLoading(true);
//         setError(null);

//         try {
//             const response = await fetch("endpoint", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': Bearer ${ apiKey }
//                 },
//                 // body: JSON.stringify({
//                 //     message: inputValue
//             })

//             if (!response.ok) {
//                 // throw new Error(API responded with status ${ response.status });
//             }

//             const data: any = await response.json();
//             const aiMessage = { type: 'ai', content: data.response };

//             setMessages(prevMessages => [...prevMessages, aiMessage]);
//             onMessage(data.response);
//         } catch (err) {
//             console.error('Error communicating with AI service:', err);
//             // setError('Failed to get a response. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }

//     }


//     // Handle key press (Enter to send)
//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             handleSendMessage();
//         }
//     };

//     // Toggle widget expansion
//     const toggleExpansion = () => {
//         if (expandable) {
//             setExpanded(!expanded);
//         }
//     };

//     // If widget is collapsed, just show the button
//     if (!expanded && !defaultExpanded) {
//         return (
//             <div onClick={toggleExpansion}>
//                 AI
//             </div>
//         );
//     }

//     return (
//         <div style={styles.container}>
//             <div style={styles.header}>
//                 <h3 style={styles.title}>AI Assistant</h3>
//                 {expandable && (
//                     <button style={styles.toggleButton} onClick={toggleExpansion}>
//                         {expanded ? '−' : '+'}
//                     </button>
//                 )}
//             </div>

//             <div style={styles.messagesContainer}>
//                 {messages.map((message, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             ...styles.message,
//                             ...(message.type === 'user' ? styles.userMessage : styles.aiMessage)
//                         }}
//                     >
//                         {message.content}
//                     </div>
//                 ))}

//                 {isLoading && (
//                     <div style={styles.loadingIndicator}>
//                         <div>Processing...</div>
//                     </div>
//                 )}

//                 {error && <div style={styles.error}>{error}</div>}

//                 <div ref={messagesEndRef} />
//             </div>

//             <div style={styles.inputContainer}>
//                 <input
//                     type="text"
//                     style={styles.input}
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     placeholder={placeholder}
//                     disabled={isLoading}
//                 />
//                 <button
//                     style={styles.sendButton}
//                     onClick={handleSendMessage}
//                     disabled={isLoading}
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AIWidget;

"use client";
import React, { useState, useRef, useEffect } from "react";

interface AIWidgetProps {
    apiKey: string;
    endpoint: string;
    onMessage: (message: string) => void;
    placeholder?: string;
    expandable?: boolean;
    defaultExpanded?: boolean;
}

const AIWidget: React.FC<AIWidgetProps> = ({
    apiKey,
    endpoint,
    onMessage,
    placeholder = "Ask me anything...",
    expandable = true,
    defaultExpanded = false,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<{ type: "user" | "ai"; content: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = { type: "user" as const, content: inputValue };
        setMessages([...messages, userMessage]);
        setInputValue("");
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ message: inputValue }),
            });

            if (!response.ok) {
                throw new Error(`API responded with status ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { type: "ai" as const, content: data.response };

            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            onMessage(data.response);
        } catch (err) {
            console.error("Error communicating with AI service:", err);
            setError("Failed to get a response. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const toggleExpansion = () => {
        if (expandable) {
            setExpanded(!expanded);
        }
    };

    if (!expanded) {
        return (
            <button
                onClick={toggleExpansion}
                className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
            >
                Open AI
            </button>
        );
    }

    return (
        <div className="fixed bottom-5 right-5 w-96 bg-white shadow-lg rounded-lg p-4 border" style={{zIndex:100}}>
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold">AI Assistant</h3>
                {expandable && (
                    <button onClick={toggleExpansion} className="text-gray-500">
                        ✖
                    </button>
                )}
            </div>

            <div className="h-60 overflow-y-auto p-2">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg mb-2 max-w-xs ${message.type === "user" ? "ml-auto bg-blue-200 text-blue-800" : "mr-auto bg-gray-200 text-gray-800"
                            }`}
                    >
                        {message.content}
                    </div>
                ))}

                {isLoading && <div className="text-center text-gray-500">Processing...</div>}
                {error && <div className="text-red-500 text-sm">{error}</div>}

                <div ref={messagesEndRef} />
            </div>

            <div className="border-t pt-2 flex">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-md outline-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                    disabled={isLoading}
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 bg-green-600 text-white px-4 py-2 rounded-md"
                    disabled={isLoading}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default AIWidget;
