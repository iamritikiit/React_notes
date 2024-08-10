import React from 'react';

export function RightLayout({ noteContent, handleContentChange, isWriting }) {
    const handleClick = (e) => {
        // Check if the clicked element is an anchor tag
        if (e.target.tagName.toLowerCase() === 'a') {
            const href = e.target.getAttribute('href');
            if (href) {
                // Check if the URL is absolute
                if (href.startsWith('http://') || href.startsWith('https://')) {
                    window.open(href, '_blank'); // Open the link in a new tab
                } else {
                    console.warn(`Invalid link: ${href}`); // Log a warning for invalid links
                }
                e.preventDefault(); // Prevent default action of anchor tag
            }
        }
    };

    return (
        <div className='main-content'>
            {isWriting ? (
                <textarea
                    className='styled-textarea'
                    value={noteContent}
                    onChange={handleContentChange}
                    placeholder="Hey, what's up? How are you?"
                    spellCheck="false"
                ></textarea>
            ) : (
                <div className='styled-textarea preview' onClick={handleClick}>
                {noteContent ? (
                    <div dangerouslySetInnerHTML={{ __html: noteContent }}></div>
                ) : (
                    "Hey, what's up? How are you?"
                )}
            </div>
            )}
        </div>
    );
}

