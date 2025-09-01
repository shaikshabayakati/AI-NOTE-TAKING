import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Italic,
  LoaderIcon,
  Sparkle,
} from "lucide-react";
import React, { useState } from "react";
import Heading from "@tiptap/extension-heading";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { main } from "../../../../configs/AIModel";
import { useUser } from "@clerk/nextjs";

const Editorextensions = ({ editor }) => {
  const SearchAI = useAction(api.myAtions.search);
  const AddnotestoDB = useMutation(api.notes.ADDNOTESTODB);
  const { fileId } = useParams();
  const [loading, setloading] = useState(false);
  const { user } = useUser();
  const onAiClick = async () => {
    setloading(true);
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ""
    );
    console.log(selectedText);

    const result = await SearchAI({
      query: selectedText,
      fileId: fileId,
    });
    console.log("unformatted query text with selection", result);

    const unformattedanswer = JSON.parse(result);
    let AllUnformatedanswer = "";
    unformattedanswer &&
      unformattedanswer.forEach(
        (x) => (AllUnformatedanswer = AllUnformatedanswer + x.pageContent)
      );
    const warning = "```html or ```";
    const PROMPT = `you are an ai notes helper that works on rag you will be provided with information that is extracted from the data user given here it is ${AllUnformatedanswer},and this is the question user asked ${selectedText} your job is to take the question and the extracted data and enhance the answer, make sure you use more of the extracted data than your own thought of answers,important note give your response in html format like this <html><p> your answer </p></html> just give answer in this format dont add anything else to the format this is strictly instructed dont start answers like this ${warning}  or else you will be dismantled  `;
    const finalres = await main(PROMPT);
    const resrefined = finalres.replace("```html", "").replace("```", "");
    console.log(finalres);

    const alltextonpage = editor.getHTML();
    const totalanswer = editor.commands.setContent(
      alltextonpage + "<p><strong>ANSWER</strong>" + resrefined + "</p>" + "<u>"
    );
    setloading(false);
    AddnotestoDB({
      fileId: fileId,
      notes: editor.getHTML(),
    });
  };

  if (!editor) return null;

  return (
    <div className="">
      <div></div>
      <div className="control-group">
        <div className="button-group">
          <div className="flex gap-15 px-3">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <BoldIcon className=" cursor-pointer" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <Italic className=" cursor-pointer" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              <Heading1Icon className=" cursor-pointer" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              <Heading2Icon className=" cursor-pointer" />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              <Heading3Icon className=" cursor-pointer" />
            </button>

            <button
              onClick={() => onAiClick()}
              className="hover:text-blue-500 text-2xl text-white bg-black p-2 cursor-pointer rounded-2xl"
            >
              {loading ? <LoaderIcon className="animate-spin" /> : <Sparkle />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editorextensions;
