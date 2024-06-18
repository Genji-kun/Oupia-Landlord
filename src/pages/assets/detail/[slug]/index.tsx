import { useAssetDetail } from '@/hooks/query';

const AssetDetailPage = () => {

    const {asset, assetFetching} = useAssetDetail();
    if (assetFetching) return <></>
    return (
        <div>{asset.name}</div>
    )
}

export default AssetDetailPage