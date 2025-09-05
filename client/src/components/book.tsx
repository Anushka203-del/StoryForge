import React from "react"
import { Card, CardContent, CardFooter } from "./ui/card"

interface BookProps {
    image: string,
    title: string,
    genre: {
        color: string,
        name: string
    }
}

const Book: React.FC<BookProps> = ({ image, title, genre }) => {
    return (
        <>
            <Card className="border-none scale-90 bg-transparent p-0 shadow-none gap-1 pt-1 hover:scale-105 duration-300 hover:cursor-pointer" >
                <span style={{
                    backgroundColor: `${genre.color}`
                }} className={` absolute mt-2 ml-2 inline-block  rounded px-3 py-1 text-sm font-semibold text-white`}> {genre.name} </span>
                <CardContent className="flex aspect-square items-center justify-center p-6 aspect-[2/3] bg-no-repeat bg-cover rounded-md" style={{
                    backgroundImage: `url(${image})`
                }} >

                </CardContent>
                <CardFooter className="text-left pl-2">
                    {title}
                </CardFooter>
            </Card>
        </>
    )
}

export default Book;