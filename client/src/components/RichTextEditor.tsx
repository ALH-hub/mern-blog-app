import { useEditor, EditorContent, EditorContext } from '@tiptap/react';
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import Starterkit from '@tiptap/starter-kit';
import { useMemo } from 'react';

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [Starterkit],
    content: '<p>Hello World!</p>',
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <>
      <EditorContext.Provider value={providerValue}>
        <EditorContent editor={editor} className='' />
        <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
      </EditorContext.Provider>
    </>
  );
};

export default RichTextEditor;
