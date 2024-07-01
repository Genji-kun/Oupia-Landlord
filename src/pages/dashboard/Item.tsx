import { FC, PropsWithChildren } from 'react';

type IItemProps = PropsWithChildren<{
  title: string;
  value: number;
}>;

const Item: FC<IItemProps> = (props) => {
  return <>
    <div className="flex flex-col gap-5 bg-background shadow-md rounded-md px-5 py-3 hover:text-white hover:bg-primary-500">
      <h2 className="font-medium text-base">{props.title}</h2>
      <h1 className="font-semibold text-lg">{props.value}</h1>
    </div>
  </>;
};

export default Item;
