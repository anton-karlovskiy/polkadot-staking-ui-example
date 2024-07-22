
import { useSelector } from 'react-redux';
import {
  useMutation,
  useQueryClient
} from 'react-query';
import clsx from 'clsx';

import ErrorModal from 'components/ErrorModal';
import PhoenixDenimOrPhoenixSupernovaContainedButton, {
  Props as PhoenixDenimOrPhoenixMidnightContainedButtonProps
} from 'components/buttons/PhoenixDenimOrPhoenixSupernovaContainedButton';
import { GENERIC_FETCHER } from 'services/fetchers/generic-fetcher';
import { StoreType } from 'common/types/util.types';
import { GOVERNANCE_TOKEN_SYMBOL } from 'config/relay-chains';

interface CustomProps {
  claimableRewardAmount: string;
}

const ClaimRewardsButton = ({
  className,
  claimableRewardAmount,
  ...rest
}: CustomProps & PhoenixDenimOrPhoenixMidnightContainedButtonProps): JSX.Element => {
  const { address } = useSelector((state: StoreType) => state.general);

  const queryClient = useQueryClient();

  const claimRewardsMutation = useMutation<void, Error, void>(
    () => {
      return window.bridge.escrow.withdrawRewards();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          GENERIC_FETCHER,
          'escrow',
          'getRewardEstimate',
          address
        ]);
        queryClient.invalidateQueries([
          GENERIC_FETCHER,
          'escrow',
          'getRewards',
          address
        ]);
      }
    }
  );

  const handleClaimRewards = () => {
    claimRewardsMutation.mutate();
  };

  return (
    <>
      <PhoenixDenimOrPhoenixSupernovaContainedButton
        className={clsx(
          'w-full',
          'px-6',
          'py-3',
          'text-base',
          'rounded-md',
          className
        )}
        onClick={handleClaimRewards}
        pending={claimRewardsMutation.isLoading}
        {...rest}>
        Claim {claimableRewardAmount} {GOVERNANCE_TOKEN_SYMBOL} Rewards
      </PhoenixDenimOrPhoenixSupernovaContainedButton>
      {claimRewardsMutation.isError && (
        <ErrorModal
          open={claimRewardsMutation.isError}
          onClose={() => {
            claimRewardsMutation.reset();
          }}
          title='Error'
          description={
            claimRewardsMutation.error?.message ||
            ''
          } />
      )}
    </>
  );
};

export default ClaimRewardsButton;
