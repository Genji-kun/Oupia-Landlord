import { FC, PropsWithChildren } from 'react';

type IItemProps = PropsWithChildren<{
  title: string;
  value: number;
}>;

const Item: FC<IItemProps> = (props) => {
  return <>
    <div className="flex flex-col gap-5 bg-white shadow-md rounded-md px-5 py-3">
      <h2 className="font-medium text-gray-600 text-base">{props.title}</h2>
      <h1 className="font-semibold text-gray-800 text-lg">{props.value}</h1>
    </div>
  </>;
};

export default Item;
