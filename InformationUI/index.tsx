
import clsx from 'clsx';

import InformationTooltip from 'components/tooltips/InformationTooltip';
import {
  POLKADOT,
  KUSAMA
} from 'utils/constants/relay-chain-names';

interface CustomProps {
  label: string;
  value: string | number;
  tooltip?: string;
}

const InformationUI = ({
  label,
  value,
  tooltip,
  className,
  ...rest
}: CustomProps & React.ComponentPropsWithRef<'div'>): JSX.Element => {
  return (
    <div
      className={clsx(
        'flex',
        'justify-between',
        className
      )}
      {...rest}>
      <div
        className={clsx(
          'inline-flex',
          'items-center',
          'space-x-1',
          { 'text-phoenixTextSecondaryInLightMode': process.env.REACT_APP_RELAY_CHAIN_NAME === POLKADOT },
          { 'dark:text-phoenixTextSecondaryInDarkMode': process.env.REACT_APP_RELAY_CHAIN_NAME === KUSAMA }
        )}>
        <span>
          {label}
        </span>
        {tooltip && <InformationTooltip label={tooltip} />}
      </div>
      <span
        className={clsx(
          { 'text-phoenixDenim': process.env.REACT_APP_RELAY_CHAIN_NAME === POLKADOT },
          { 'dark:text-phoenixSupernova': process.env.REACT_APP_RELAY_CHAIN_NAME === KUSAMA }
        )}>
        {value}
      </span>
    </div>
  );
};

export default InformationUI;
