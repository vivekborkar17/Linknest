import Link from 'next/link'
import React from 'react'
import clientPromise from '@/lib/mongodb'
import ShareButton from '@/components/ShareButton';

export default async function Page({ params }) {
    const { handle } = await params
    const client = await clientPromise;
    const db = client.db("linknest")
    const collection = db.collection("links")

    //if handle is already claimed
    const item = await collection.findOne({ handle:handle })
    if (!item) return <div className="text-center">Handle not found!</div>

    return <div className="flex min-h-screen item-center justify-center py-10 bg-purple-400">


         {item && <div className="photo flex gap-5  flex-col  items-center "><img className='w-40 rounded-full' src={item.pic}/>
        <span className="text-xl font-bold">@{item.handle}</span>
        <span className="des w-[80vh] text-center">{item.desc}</span>
        <div className="links flex flex-col gap-4">
          {item.links.map((item,index)=>{
            return <Link target='_blank' href={item.link}><div className="py-4 flex px-5 items-center justify-center min-w-[40vh] bg-purple-100 rounded-md" key={index}>
               {item.linktext}
            </div>
            </Link>
          })}
        </div>
        <ShareButton />
        </div>}
        
        
        
    </div>
    
  }