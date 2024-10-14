import { Card } from "antd";
import { FC } from "react";
interface Props {
    currency: any
}

const CryptoCard: FC<Props> = ({ currency }) => {
    console.log(currency)
    const priceProgress = Math.round(currency.quote.USD.percent_change_24h)
    return (
        <Card
            title={<div className='flex  items-center gap-3'>
                <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} alt="" />
                <span>{currency.name}</span>
            </div>}
            style={{ width: 300 }}>
            <p>Текущая цена: {Math.round(currency.quote.USD.price)} USD</p>
            <p>Изменение в цене за день: <span className={priceProgress > 0 ? "text-green-400" : 'text-red-500'}> {priceProgress} %</span> </p>
        </Card>

    );
};

export default CryptoCard;