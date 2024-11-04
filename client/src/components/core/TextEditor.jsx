// src/TextEditor.js
import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's CSS

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState(''); // Stores the HTML content
  const [showPreview, setShowPreview] = useState(true);  // Toggle for preview and result

  useEffect(() => {
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'video'],
          ['clean'],
        ],
      },
    });

    quill.on('text-change', () => {
      setEditorContent(quill.root.innerHTML); // Get the content of the editor
    });
  }, []);

  // Toggle between preview and raw content display
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h2 className="text-lg font-semibold mb-4 md:text-2xl">Simple Text Editor</h2>

      {/* Toggle button for preview or raw text */}
      <div className="flex flex-col md:flex-row mb-4">
        <button
          onClick={togglePreview}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2 md:mb-0 md:mr-4"
        >
          {showPreview ? 'Show Raw Text' : 'Show Preview'}
        </button>
      </div>

      {/* Text editor */}
      <div
        id="editor"
        className="h-80 border border-gray-300 rounded-md p-4 bg-white mb-4 md:h-96"
      ></div>

      {/* Conditionally render either Preview or Raw Text */}
      <h3 className="text-lg font-medium mb-2">
        {showPreview ? 'Editor Content Preview' : 'Editor Raw Text Result'}
      </h3>

      <div className="bg-gray-100 p-4 rounded-md border border-gray-300">
        {showPreview ? (
          // Show formatted preview content
          <div
            className="bg-white border border-gray-200 p-4 rounded-md"
            style={{ height: '500px', overflowY: 'scroll' }}
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        ) : (
          // Show raw HTML content as plain text
          <pre
            className="bg-white border border-gray-200 p-4 rounded-md"
            style={{ height: '500px', overflowY: 'scroll' }}
          >
            {editorContent}
          </pre>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
