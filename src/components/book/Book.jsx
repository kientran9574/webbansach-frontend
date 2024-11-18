
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { callFetchBookById } from '../../service/api'
import ViewDetailBook from './ViewDetailBook'

const Book = () => {
    const locate = useLocation()
    let params = new URLSearchParams(locate.search)
    const id = params.get("id")
    const [dataBook, setDataBook] = useState([])
    useEffect(() => {
        fetchBookId(id)
    }, [id])
    const fetchBookId = async (id) => {
        const res = await callFetchBookById(id)
        if (res && res.data) {
            let raw = res.data.data
            raw.items = getImages(raw)
            setDataBook(raw)
        }
    }
    const getImages = (raw) => {
        let images = []
        if (raw.thumbnail) {
            images.push({
                original: `http://localhost:8082/images/book/${raw.thumbnail}`,
                thumbnail: `http://localhost:8082/images/book/${raw.thumbnail}`,
            })
        }
        if (raw.slider.length > 0) {
            raw.slider.map((item) => {
                images.push({
                    original: `http://localhost:8082/images/book/${item}`,
                    thumbnail: `http://localhost:8082/images/book/${item}`,
                })
            })
        }
        return images
    }
    return (
        <><ViewDetailBook dataBook={dataBook}></ViewDetailBook> </>
    )
}

export default Book