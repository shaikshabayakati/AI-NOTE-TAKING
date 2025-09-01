import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

//loading the document and then sliptting it and then storing it into a variable 
export async function GET(req){
    const reqUrl = req.url
    const {searchParams}=new URL(reqUrl)
    const pdfUrl = searchParams.get('pdfLink')
    
    const res = await fetch(pdfUrl)
    const data = await res.blob()
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()
    let pdftextonly = ''

    docs.map((x)=>{
        pdftextonly = pdftextonly+x.pageContent
    })

   const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const texts = await textSplitter.splitText(pdftextonly);



    return NextResponse.json({results:texts})
}