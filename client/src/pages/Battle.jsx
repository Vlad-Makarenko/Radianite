import React, {useEffect, useState} from 'react';
import { CardList } from '../components/CardList';
import { CardPopup } from '../components/CardPopup';
import { useHttp } from '../hooks/http.hook';


function noop() {}

export const Battle = () => {
  const [popupCard, setPopupCard] = useState(null); // TODO: обнулять взависимости от счетчика карт
  const {request} = useHttp();

  const [cards, setCards] = useState([]);

    useEffect( () => {
        test()
    }, []);

    const test = async () => {
        const data = await request('/api/card', 'POST');
        console.log(data)
    }

    return (
        <>
            <CardList classes={["CardList"]} side='Opponent' setPopupCard={noop}/>
            <div>
                
            </div>
            {popupCard && <CardPopup popupCard={popupCard}/>} 
            <CardList classes={["CardList"]} side='User' setPopupCard={setPopupCard}/>
        </>
    )
}
