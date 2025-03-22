// // App.jsx example implementation
// import React from 'react';
// import AIWidget from './AIWidet';

// function App() {
//     // Handle AI response in your application
//     const handleAIMessage = (message) => {
//         console.log('Received message from AI:', message);
//         // You can process the AI response here
//         // e.g., update state, display notifications, etc.
//     };

//     return (
//         <div className="App">
//             <h1>My Application</h1>

//             {/* Your application content here */}

//             {/* AI Widget integration */}
//             <AIWidget
//                 apiKey="your_api_key_here"
//                 endpoint="https://api.youraiservice.com/v1/chat"
//                 onMessage={handleAIMessage}
//                 placeholder="Ask your AI assistant..."
//                 // theme="light" // or 'dark'
//                 expandable={true}
//                 defaultExpanded={false}
//             />
//         </div>
//     );
// }

// export default App;

"use client";
import React from "react";
import AIWidget from "./AIWidet";

export default function ChatBot() {
    const handleAIMessage = (message: string) => {
        console.log("Received message from AI:", message);
    };

    return (

        <AIWidget
            apiKey="your_api_key_here"
            endpoint="https://api.youraiservice.com/v1/chat"
            onMessage={handleAIMessage}
            placeholder="Ask your AI assistant..."
            expandable={true}
            defaultExpanded={false}
        />
    );
}
