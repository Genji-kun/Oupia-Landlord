import { useParams } from 'react-router-dom'

const AssetDetailPage = () => {

    const params = useParams();

    return (
        <div>{params.slug}</div>
    )
}

export default AssetDetailPage