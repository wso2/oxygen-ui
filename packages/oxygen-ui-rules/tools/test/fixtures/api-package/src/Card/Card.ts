import type {ButtonProps} from '../../vendor/dependency';

export interface CardProps extends ButtonProps {
  title: string;
  elevation?: number;
}

const CardRoot = (props: CardProps): null => null;
const CardHeader = (props: {children: string}): null => null;

export const Card = Object.assign(CardRoot, {Header: CardHeader});
