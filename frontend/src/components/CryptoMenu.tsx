import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu, Spin } from 'antd';
import axios from 'axios';
import CryptoCard from './CryptoCard';


type Response = {
  name: string,
  id: number
}

const CryptoMenu: React.FC = () => {
  const [currency, setCurrency] = useState<Response[]>([])
  const [current, setCurrent] = useState<any>(1);
  const [currentData, setCurrentData] = useState<any>()



  const fetchCurrs = () => {
    axios.get('http://127.0.0.1:8000/cryptocurrencies').then((resp: any) => {
      setCurrency(resp.data.map((el: Response) => ({ name: el.name, id: el.id })
      ))
    })
  }

  const fetchCurr = () => {
    axios.get(`http://127.0.0.1:8000/cryptocurrencies/${current}`).then((resp: any) => {
      setCurrentData(resp.data)
    })
  }

  useEffect(() => {
    fetchCurrs()
    console.log('otrabotal')
  }, [])

  useEffect(() => {
    setCurrentData(null)
    fetchCurr()
  }, [current])


  const items = [
    {
      label: 'Меню',
      key: 'SubMenu',
      children: [
        {
          type: 'group',
          label: 'Криптовалюты',
          children: [
            ...currency.map((el: Response) => ({ label: el.name, key: el.id }))
          ],
        },
      ],
    },

  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (
    <div className='flex h-screen'>
      <Menu onClick={onClick}
        selectedKeys={[current]}
        mode="vertical"
        items={items} />
      <div className='my-auto mx-auto'>
        {currentData ? <CryptoCard currency={currentData} /> : <Spin/>}
      </div>
    </div>
  )
};

export default CryptoMenu;