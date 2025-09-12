import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Editorextensions from './Editorextensions'
import { StarsIcon } from 'lucide-react'

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3], 
      }),
    ],


    content: `<p>select the text you want to ask your question and click on the ai icon ${  <StarsIcon/>}</p>`,
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-screen p-3'
      
      }
    }
  })

  return (
    <div>
      <div className='flex p-3' >
        <Editorextensions editor={editor}/>
      </div>
      <div className='overflow-scroll h-[86vh]'>
        <EditorContent editor={editor} /> 
      </div>
    </div>
  )
}

export default TextEditor